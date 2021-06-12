import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RxState } from '@rx-angular/state';
import { BehaviorSubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CustomMenueTriggerDirective } from '../../../custom-menu-trigger.directive';
import { GlobalState, GLOBAL_RX_STATE, PlayState } from '../../../global-state';
import { DispatchCardActionService } from '../../../services/dispatch-card-action/dispatch-card-action.service';
import { Side } from '../../../types';
import { CardActionItem } from '../../card/card.component';

@Component({
  selector: 'digimon-card-app-security-area',
  templateUrl: './security-area.component.html',
  styleUrls: ['./security-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class SecurityAreaComponent implements OnInit {
  @Input()
  set securityArea(value: PlayState['securityArea']) {
    this.securityArea$.next(value);
  }
  @Input() side!: Side;
  @ViewChild(CustomMenueTriggerDirective) trigger?: CustomMenueTriggerDirective;

  /**
   * constants
   */
  readonly actionList: CardActionItem[] = [
    {
      action: 'open',
      displayText: 'オープン',
    },
    {
      action: 'selfCheck',
      displayText: '確認',
    },
    {
      action: 'shuffle',
      displayText: 'シャッフル',
    },
  ];

  /**
   * State
   */
  readonly securityArea$ = new BehaviorSubject<PlayState['securityArea']>({
    cardList: [],
  });

  /**
   * Events
   */
  readonly onContextMenu$ = new Subject<Event>();
  readonly onAction$ = new Subject<CardActionItem>();
  readonly onSetSecurity$ = new Subject<void>();

  constructor(
    @Inject(GLOBAL_RX_STATE) private globalState: RxState<GlobalState>,
    private state: RxState<Record<string, never>>,
    private dispatchCardActionService: DispatchCardActionService
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
      this.onAction$.pipe(
        tap((event) => {
          this.dispatchCardActionService.dispatch({
            type: event.action,
            area: 'securityArea',
          });
        })
      )
    );
    this.state.hold(
      this.onSetSecurity$.pipe(
        tap(() => {
          new Array(5).fill(1).forEach(() => {
            this.dispatchCardActionService.dispatch({
              type: 'recovery',
              area: 'stack',
            });
          });
        })
      )
    );
  }
}
