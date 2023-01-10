import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { RxState } from '@rx-angular/state';
import { BehaviorSubject, Subject } from 'rxjs';
import { GlobalState, GLOBAL_RX_STATE, PlayState } from '../../../global-state';
import { Side } from '../../../types';
import { CardActionEvent, CardActionItem } from '../../card/card.component';
import { filter, map, withLatestFrom, tap } from 'rxjs/operators';
import { DispatchCardActionService } from '../../../services/dispatch-card-action/dispatch-card-action.service';

@Component({
  selector: 'digimon-card-app-save-area',
  templateUrl: './save-area.component.html',
  styleUrls: ['./save-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class SaveAreaComponent implements OnInit {
  @Input()
  set saveArea(value: PlayState['saveArea']) {
    this.saveArea$.next(value);
  }
  @Input() side!: Side;

  /**
   * Constants
   */
  readonly saveAreaCardActionList: CardActionItem[] = [
    {
      action: 'trash',
      displayText: '消滅',
    },
    {
      action: 'addToEvolutionOrigin',
      displayText: '進化元に追加',
    },
  ];

  /**
   * State
   */
  private readonly gs$ = this.globalState.select();
  readonly saveArea$ = new BehaviorSubject<PlayState['saveArea']>({
    cardList: [],
  });

  /**
   * Events
   */
  readonly onAction$ = new Subject<CardActionEvent>();
  private readonly onTrashAction$ = this.onAction$.pipe(
    filter((event) => event.action === 'trash')
  );
  private readonly onAddToEvolutionOrigin$ = this.onAction$.pipe(
    withLatestFrom(this.gs$),
    filter(
      ([event, gs]) =>
        event.action === 'addToEvolutionOrigin' &&
        gs.playState.battleArea.digimonList.length > 0
    ),
    map(([event]) => event)
  );

  constructor(
    @Inject(GLOBAL_RX_STATE) private globalState: RxState<GlobalState>,
    private state: RxState<Record<string, never>>,
    private dispatchCardActionService: DispatchCardActionService
  ) {}

  ngOnInit(): void {
    this.state.hold(
      this.onTrashAction$.pipe(
        tap((event) => {
          this.dispatchCardActionService.dispatch({
            type: 'trash',
            area: 'saveArea',
            card: event.card,
          });
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
            area: 'saveArea',
            card: event.card,
          },
        },
      })
    );
  }
}
