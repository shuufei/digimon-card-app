import { Component, Inject, OnInit } from '@angular/core';
import { RxState } from '@rx-angular/state';
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
      action: 'entry',
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
  private readonly onentryActionFromHandCardEvent$ = this.onActionHandCardEvent$.pipe(
    filter((event) => event.action === 'entry')
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
      this.onStackShuffle$.pipe(
        tap(() =>
          this.dispatchCardActionService.dispatch({
            type: 'shuffle',
            area: 'stack',
          })
        )
      )
    );
    this.globalState.hold(
      this.onDraw$.pipe(
        tap(() =>
          this.dispatchCardActionService.dispatch({
            type: 'draw',
            area: 'stack',
          })
        )
      )
    );
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
      this.onentryActionFromHandCardEvent$.pipe(
        tap((event) => {
          this.dispatchCardActionService.dispatch({
            type: 'entry',
            area: 'hand',
            card: event.card,
          });
        })
      )
    );
  }
}
