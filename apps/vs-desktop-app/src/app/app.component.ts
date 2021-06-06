import { Component, Inject, OnInit } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { merge, Subject } from 'rxjs';
import { tag } from 'rxjs-spy/operators/tag';
import { filter, map, tap, withLatestFrom } from 'rxjs/operators';
import {
  CardActionEvent,
  CardActionItem,
} from './components/card/card.component';
import { Digimon } from './domain/digimon';
import {
  GlobalState,
  GLOBAL_RX_STATE,
  INITIAL_GLOBAL_STATE,
} from './global-state';
import { DispatchCardActionService } from './services/dispatch-card-action/dispatch-card-action.service';

type State = Record<string, never>;

@Component({
  selector: 'digimon-card-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [RxState],
})
export class AppComponent implements OnInit {
  /**
   * constants
   */
  readonly title = 'vs-desktop-app';
  readonly handCardActionList: CardActionItem[] = [
    {
      action: 'entry',
      displayText: '登場',
    },
    {
      action: 'evolution',
      displayText: '進化',
    },
  ];
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
  ];

  /**
   * state
   */
  readonly gs$ = this.globalState.select().pipe(tag('gs'));

  /**
   * Events
   */
  readonly onReset$ = new Subject();
  readonly onActionFromHand$ = new Subject<CardActionEvent>();
  readonly onActionFromBattleArea$ = new Subject<CardActionEvent>();
  readonly onEvolutionFromHand$ = this.onActionFromHand$.pipe(
    withLatestFrom(this.gs$.pipe(map((v) => v.battleArea.digimonList))),
    filter(
      ([event, digimonList]) =>
        event.action === 'evolution' && digimonList.length > 0
    ),
    map(([event]) => event)
  );
  readonly onSelectDigimonCard$ = new Subject<Digimon>();
  private readonly onEntryActionFromHand$ = this.onActionFromHand$.pipe(
    filter((event) => event.action === 'entry')
  );
  private readonly onResetMode$ = merge(this.onEntryActionFromHand$);
  private readonly onSubmitEvolutionFromHandToBattleArea$ = this.onSelectDigimonCard$.pipe(
    withLatestFrom(this.gs$.pipe(map((v) => v.modeState))),
    filter(
      ([, modeState]) =>
        modeState?.mode === 'evolution' && modeState?.trigger?.area === 'hand'
    )
  );
  private readonly onRestActionFromBattleArea$ = this.onActionFromBattleArea$.pipe(
    filter((v) => v.action === 'rest')
  );
  private readonly onActiveActionFromBattleArea$ = this.onActionFromBattleArea$.pipe(
    filter((v) => v.action === 'active')
  );

  constructor(
    private readonly state: RxState<State>,
    @Inject(GLOBAL_RX_STATE) private readonly globalState: RxState<GlobalState>,
    private readonly dispatchCardActionService: DispatchCardActionService
  ) {
    this.globalState.set(INITIAL_GLOBAL_STATE);
  }

  ngOnInit() {
    this.globalState.hold(
      this.onReset$.pipe(
        tap(() =>
          this.dispatchCardActionService.dispatch({
            type: 'reset',
            area: 'whole',
          })
        )
      )
    );
    this.globalState.hold(
      this.onEntryActionFromHand$.pipe(
        tap((event) => {
          this.dispatchCardActionService.dispatch({
            type: 'entry',
            area: 'hand',
            card: event.card,
          });
        })
      )
    );
    this.globalState.hold(
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
          this.globalState.set('modeState', () => undefined);
        })
      )
    );
    this.globalState.hold(
      this.onRestActionFromBattleArea$.pipe(
        tap((event) => {
          this.dispatchCardActionService.dispatch({
            type: 'rest',
            area: 'battleArea',
            card: event.card,
          });
        })
      )
    );
    this.globalState.hold(
      this.onActiveActionFromBattleArea$.pipe(
        tap((event) => {
          this.dispatchCardActionService.dispatch({
            type: 'active',
            area: 'battleArea',
            card: event.card,
          });
        })
      )
    );

    // connect
    this.globalState.connect(
      'modeState',
      this.onEvolutionFromHand$,
      (_, event) => ({
        mode: 'evolution',
        trigger: {
          area: 'hand',
          card: event.card,
        },
      })
    );
    this.globalState.connect('modeState', this.onResetMode$, () => undefined);
  }
}
