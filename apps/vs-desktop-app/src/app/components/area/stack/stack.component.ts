import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RxState } from '@rx-angular/state';
import { merge, Subject } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { CustomMenueTriggerDirective } from '../../../custom-menu-trigger.directive';
import { GlobalState, GLOBAL_RX_STATE } from '../../../global-state';
import { DispatchCardActionService } from '../../../services/dispatch-card-action/dispatch-card-action.service';
import { CardActionItem } from '../../card/card.component';

@Component({
  selector: 'digimon-card-app-stack',
  templateUrl: './stack.component.html',
  styleUrls: ['./stack.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class StackComponent implements OnInit {
  @ViewChild(CustomMenueTriggerDirective) trigger?: CustomMenueTriggerDirective;

  /**
   * constants
   */
  readonly actionList: CardActionItem[] = [
    {
      action: 'draw',
      displayText: 'ドロー',
    },
    {
      action: 'shuffle',
      displayText: 'シャッフル',
    },
    {
      action: 'recovery',
      displayText: 'リカバリー',
    },
  ];

  /**
   * State
   */
  readonly stack$ = this.globalState.select('playState', 'stack');

  /**
   * Events
   */
  readonly onContextMenu$ = new Subject<Event>();
  readonly onClick$ = new Subject();
  readonly onAction$ = new Subject<CardActionItem>();
  private readonly onShuffle$ = this.onAction$.pipe(
    filter((v) => v.action === 'shuffle')
  );
  private readonly onDraw$ = merge(
    this.onAction$.pipe(filter((v) => v.action === 'draw')),
    this.onClick$
  );
  private readonly onRecovery$ = merge(
    this.onAction$.pipe(filter((v) => v.action === 'recovery'))
  );

  constructor(
    @Inject(GLOBAL_RX_STATE) private readonly globalState: RxState<GlobalState>,
    private readonly state: RxState<Record<string, never>>,
    private readonly dispatchCardActionService: DispatchCardActionService
  ) {}

  ngOnInit(): void {
    this.state.hold(
      this.onContextMenu$.pipe(
        tap((v) => {
          v.preventDefault();
          this.trigger?.openMenu();
        })
      )
    );
    this.state.hold(
      this.onShuffle$.pipe(
        tap(() =>
          this.dispatchCardActionService.dispatch({
            type: 'shuffle',
            area: 'stack',
          })
        )
      )
    );
    this.state.hold(
      this.onDraw$.pipe(
        tap(() =>
          this.dispatchCardActionService.dispatch({
            type: 'draw',
            area: 'stack',
          })
        )
      )
    );
    this.state.hold(
      this.onRecovery$.pipe(
        tap(() => {
          this.dispatchCardActionService.dispatch({
            type: 'recovery',
            area: 'stack',
          });
        })
      )
    );
  }
}
