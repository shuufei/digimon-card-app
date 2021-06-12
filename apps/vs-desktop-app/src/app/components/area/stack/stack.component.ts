import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RxState } from '@rx-angular/state';
import { BehaviorSubject, merge, Subject } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { CustomMenueTriggerDirective } from '../../../custom-menu-trigger.directive';
import { GlobalState, GLOBAL_RX_STATE, PlayState } from '../../../global-state';
import { DispatchCardActionService } from '../../../services/dispatch-card-action/dispatch-card-action.service';
import { Side } from '../../../types';
import { CardActionItem } from '../../card/card.component';

@Component({
  selector: 'digimon-card-app-stack',
  templateUrl: './stack.component.html',
  styleUrls: ['./stack.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class StackComponent implements OnInit {
  @Input()
  set stack(value: PlayState['stack']) {
    this.stack$.next(value);
  }
  @Input() side!: Side;
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
      action: 'open',
      displayText: 'オープン',
    },
    {
      action: 'recovery',
      displayText: 'リカバリー',
    },
    {
      action: 'shuffle',
      displayText: 'シャッフル',
    },
  ];

  /**
   * State
   */
  readonly stack$ = new BehaviorSubject<PlayState['stack']>({ cardList: [] });

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
  private readonly onOpen$ = merge(
    this.onAction$.pipe(filter((v) => v.action === 'open'))
  );

  constructor(
    @Inject(GLOBAL_RX_STATE) private readonly globalState: RxState<GlobalState>,
    private readonly state: RxState<Record<string, never>>,
    private readonly dispatchCardActionService: DispatchCardActionService
  ) {}

  ngOnInit(): void {
    if (this.side == null) {
      throw new Error('side is required!');
    }
    if (this.side === 'other') return;
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
    this.state.hold(
      this.onOpen$.pipe(
        tap(() => {
          this.dispatchCardActionService.dispatch({
            type: 'open',
            area: 'stack',
          });
        })
      )
    );
  }
}
