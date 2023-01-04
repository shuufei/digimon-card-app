import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { RxState } from '@rx-angular/state';
import { Subject } from 'rxjs';
import { filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { GlobalState, GLOBAL_RX_STATE } from '../../global-state';
import { DispatchCardActionService } from '../../services/dispatch-card-action/dispatch-card-action.service';
import { Side } from '../../types';
import { CardActionEvent, CardActionItem } from '../card/card.component';

type State = {
  side: Side;
};

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
    {
      action: 'recovery',
      displayText: 'リカバリー',
    },
  ];

  /**
   * State
   */
  readonly trashArea$ = this.state.select('side').pipe(
    switchMap((side) => {
      switch (side) {
        case 'other':
          return this.otherSideTrashArea$;
        case 'self':
        default:
          return this.selfSideTrashArea$;
      }
    })
  );
  readonly selfSideTrashArea$ = this.globalState.select(
    'playState',
    'trashArea'
  );
  readonly otherSideTrashArea$ = this.globalState.select(
    'otherSidePlayState',
    'trashArea'
  );

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
    private state: RxState<State>,
    private dispatchCardActionService: DispatchCardActionService,
    @Inject(MAT_DIALOG_DATA) public dialogData: { side: Side }
  ) {
    this.state.set({ side: dialogData.side });
  }

  ngOnInit(): void {
    this.state.hold(
      this.onAddToEvolutionOrigin$.pipe(tap(() => this.dialogRef.close()))
    );
    if (this.state.get('side') === 'other') return;
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
  }
}
