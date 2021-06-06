import { Component, Inject, OnInit } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { merge, Subject } from 'rxjs';
import { tag } from 'rxjs-spy/operators/tag';
import { tap } from 'rxjs/operators';
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

  /**
   * state
   */
  readonly gs$ = this.globalState.select().pipe(tag('gs'));

  /**
   * Events
   */
  readonly onReset$ = new Subject<void>();
  readonly onInitPlay$ = new Subject<void>();
  // TODO
  private readonly onResetMode$ = merge(this.onReset$);

  constructor(
    private readonly state: RxState<State>,
    @Inject(GLOBAL_RX_STATE) private readonly globalState: RxState<GlobalState>,
    private readonly dispatchCardActionService: DispatchCardActionService
  ) {
    this.globalState.set(INITIAL_GLOBAL_STATE);
  }

  ngOnInit() {
    this.state.hold(
      this.onReset$.pipe(
        tap(() =>
          this.dispatchCardActionService.dispatch({
            type: 'reset',
            area: 'whole',
          })
        )
      )
    );
    this.state.hold(
      this.onInitPlay$.pipe(
        tap(() => {
          this.dispatchCardActionService.dispatch({
            type: 'reset',
            area: 'whole',
          });
          this.dispatchCardActionService.dispatch({
            type: 'shuffle',
            area: 'digitamaStack',
          });
          this.dispatchCardActionService.dispatch({
            type: 'shuffle',
            area: 'stack',
          });
          new Array(5).fill(1).forEach(() => {
            this.dispatchCardActionService.dispatch({
              type: 'recovery',
              area: 'stack',
            });
          });
          new Array(5).fill(1).forEach(() => {
            this.dispatchCardActionService.dispatch({
              type: 'draw',
              area: 'stack',
            });
          });
        })
      )
    );

    this.globalState.connect('ui', this.onResetMode$, (state) => ({
      ...state.ui,
      modeState: undefined,
    }));
  }
}
