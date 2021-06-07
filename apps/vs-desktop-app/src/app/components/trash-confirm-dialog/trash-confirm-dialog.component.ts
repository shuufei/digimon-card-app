import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { RxState } from '@rx-angular/state';
import { Subject } from 'rxjs';
import { filter, map, tap, withLatestFrom } from 'rxjs/operators';
import { GlobalState, GLOBAL_RX_STATE } from '../../global-state';
import { DispatchCardActionService } from '../../services/dispatch-card-action/dispatch-card-action.service';
import { CardActionEvent, CardActionItem } from '../card/card.component';

@Component({
  selector: 'digimon-card-app-trash-confirm-dialog',
  templateUrl: './trash-confirm-dialog.component.html',
  styleUrls: ['./trash-confirm-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class TrashConfirmDialogComponent implements OnInit {
  /**
   * constants
   */
  readonly actionList: CardActionItem[] = [
    {
      action: 'draw',
      displayText: '手札に戻す',
    },
    {
      action: 'entry',
      displayText: '登場',
    },
    {
      action: 'addToEvolutionOrigin',
      displayText: '進化元に追加',
    },
  ];

  /**
   * State
   */
  readonly trashArea$ = this.globalState.select('playState', 'trashArea');

  /**
   * Events
   */
  readonly onAction$ = new Subject<CardActionEvent>();
  private readonly onAddToEvolutionOrigin$ = this.onAction$.pipe(
    withLatestFrom(this.globalState.select()),
    filter(
      ([event, gs]) =>
        event.action === 'addToEvolutionOrigin' &&
        gs.playState.battleArea.digimonList.length > 0
    ),
    map(([event]) => event)
  );

  constructor(
    private dialogRef: MatDialogRef<TrashConfirmDialogComponent>,
    @Inject(GLOBAL_RX_STATE) private globalState: RxState<GlobalState>,
    private state: RxState<Record<string, never>>,
    private dispatchCardActionService: DispatchCardActionService
  ) {}

  ngOnInit(): void {
    this.state.hold(
      this.onAction$.pipe(
        tap((event) => {
          this.dispatchCardActionService.dispatch({
            type: event.action,
            area: 'trashArea',
            card: event.card,
          });
          // this.dialogRef.close();
        })
      )
    );
    this.globalState.connect(
      'ui',
      this.onAddToEvolutionOrigin$,
      (state, event) => ({
        ...state.ui,
        modeState: {
          mode: 'addToEvolutionOrigin',
          trigger: {
            area: 'trashArea',
            card: event.card,
          },
        },
      })
    );
    this.state.hold(
      this.onAddToEvolutionOrigin$.pipe(tap(() => this.dialogRef.close()))
    );
  }
}
