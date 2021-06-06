import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RxState } from '@rx-angular/state';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CustomMenueTriggerDirective } from '../../../custom-menu-trigger.directive';
import { GlobalState, GLOBAL_RX_STATE } from '../../../global-state';
import { DispatchCardActionService } from '../../../services/dispatch-card-action/dispatch-card-action.service';
import { CardActionItem } from '../../card/card.component';

@Component({
  selector: 'digimon-card-app-security-area',
  templateUrl: './security-area.component.html',
  styleUrls: ['./security-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class SecurityAreaComponent implements OnInit {
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
  readonly securityArea$ = this.globalState.select('playState', 'securityArea');

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
