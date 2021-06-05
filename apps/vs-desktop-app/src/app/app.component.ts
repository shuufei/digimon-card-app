import { Component, Inject, OnInit } from '@angular/core';
import { RxState } from '@rx-angular/state';
import * as _ from 'lodash';
import { Subject } from 'rxjs';
import { tag } from 'rxjs-spy/operators/tag';
import { filter, tap } from 'rxjs/operators';
import {
  CardActionEvent,
  CardActionItem,
} from './components/card/card.component';
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
      action: 'entryOnBattleArea',
      displayText: '登場',
    },
    {
      action: 'evolution',
      displayText: '進化',
    },
  ];

  /**
   * state
   */
  readonly gs$ = this.globalState.select().pipe(tag('gs'));

  /**
   * Events
   */
  readonly onStackShuffle$ = new Subject();
  readonly onDraw$ = new Subject();
  readonly onReset$ = new Subject();
  readonly onActionHandCardEvent$ = new Subject<CardActionEvent>();
  private readonly onEntryOnBattleAreaActionFromHandCardEvent$ = this.onActionHandCardEvent$.pipe(
    filter((event) => event.action === 'entryOnBattleArea')
  );

  constructor(
    private readonly state: RxState<State>,
    @Inject(GLOBAL_RX_STATE) private readonly globalState: RxState<GlobalState>,
    private readonly dispatchCardActionService: DispatchCardActionService
  ) {
    this.globalState.set(INITIAL_GLOBAL_STATE);
  }

  ngOnInit() {
    this.globalState.connect('stack', this.onStackShuffle$, (state) => {
      return {
        ...state.stack,
        cardList: _.shuffle(state.stack.cardList),
      };
    });
    this.globalState.connect(this.onDraw$, (state) => {
      const stackCardList = [...state.stack.cardList];
      const handCardList = [...state.hand.cardList];
      const drawCard = stackCardList.shift();
      if (drawCard != null) {
        handCardList.push(drawCard);
      }
      return {
        ...state,
        stack: {
          ...state.stack,
          cardList: stackCardList,
        },
        hand: {
          ...state.hand,
          cardList: handCardList,
        },
      };
    });
    this.globalState.connect(this.onReset$, () => INITIAL_GLOBAL_STATE);
    this.globalState.hold(
      this.onEntryOnBattleAreaActionFromHandCardEvent$.pipe(
        tap((event) => {
          this.dispatchCardActionService.dispatch({
            type: 'entryOnBattleArea',
            area: 'hand',
            card: event.card,
          });
        })
      )
    );
  }
}
