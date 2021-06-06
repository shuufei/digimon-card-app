import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { RxState } from '@rx-angular/state';
import { Subject } from 'rxjs';
import { filter, map, tap, withLatestFrom } from 'rxjs/operators';
import { Digimon } from '../../../domain/digimon';
import { GlobalState, GLOBAL_RX_STATE } from '../../../global-state';
import { DispatchCardActionService } from '../../../services/dispatch-card-action/dispatch-card-action.service';
import { CardActionEvent, CardActionItem } from '../../card/card.component';

@Component({
  selector: 'digimon-card-app-battle-area',
  templateUrl: './battle-area.component.html',
  styleUrls: ['./battle-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class BattleAreaComponent implements OnInit {
  /**
   * Constants
   */
  readonly battleAreaCardActionList: CardActionItem[] = [
    {
      action: 'rest',
      displayText: 'レスト',
    },
    {
      action: 'active',
      displayText: 'アクティブ',
    },
    {
      action: 'draw',
      displayText: '手札に戻す',
    },
    {
      action: 'trash',
      displayText: '消滅',
    },
    {
      action: 'degeneration',
      displayText: '退化',
    },
    {
      action: 'addToBottomOfStack',
      displayText: '山札の一番下に加える',
    },
  ];

  /**
   * State
   */
  private readonly gs$ = this.globalState.select();
  readonly battleArea$ = this.globalState.select('playState', 'battleArea');

  /**
   * Events
   */
  readonly onSelectDigimonCard$ = new Subject<Digimon>();
  readonly onAction$ = new Subject<CardActionEvent>();
  private readonly onSubmitEvolutionFromHandToBattleArea$ = this.onSelectDigimonCard$.pipe(
    withLatestFrom(this.gs$.pipe(map((v) => v.ui.modeState))),
    filter(
      ([, modeState]) =>
        modeState?.mode === 'evolution' && modeState?.trigger?.area === 'hand'
    )
  );

  constructor(
    @Inject(GLOBAL_RX_STATE) private globalState: RxState<GlobalState>,
    private readonly state: RxState<Record<string, never>>,
    private readonly dispatchCardActionService: DispatchCardActionService
  ) {}

  ngOnInit(): void {
    this.state.hold(
      this.onSubmitEvolutionFromHandToBattleArea$.pipe(
        tap(([digimon, modeState]) => {
          this.dispatchCardActionService.dispatch({
            type: 'evolution',
            area: 'hand',
            card: modeState?.trigger?.card,
            target: {
              area: 'battleArea',
              digimon,
            },
          });
          this.globalState.set('ui', (state) => ({
            ...state.ui,
            modeState: undefined,
          }));
        })
      )
    );
    this.state.hold(
      this.onAction$.pipe(
        tap((event) => {
          this.dispatchCardActionService.dispatch({
            type: event.action,
            area: 'battleArea',
            card: event.card,
          });
        })
      )
    );
  }
}
