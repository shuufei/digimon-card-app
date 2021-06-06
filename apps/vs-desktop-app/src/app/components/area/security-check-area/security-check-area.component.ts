import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { RxState } from '@rx-angular/state';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GlobalState, GLOBAL_RX_STATE } from '../../../global-state';
import { DispatchCardActionService } from '../../../services/dispatch-card-action/dispatch-card-action.service';
import { CardActionEvent, CardActionItem } from '../../card/card.component';

@Component({
  selector: 'digimon-card-app-security-check-area',
  templateUrl: './security-check-area.component.html',
  styleUrls: ['./security-check-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class SecurityCheckAreaComponent implements OnInit {
  /**
   * Constants
   */
  readonly actionList: CardActionItem[] = [
    {
      action: 'draw',
      displayText: '手札に加える',
    },
    {
      action: 'return',
      displayText: 'セキュリティに戻す',
    },
  ];

  /**
   * State
   */
  readonly securityCheckArea$ = this.globalState.select(
    'playState',
    'securityCheckArea'
  );

  /**
   * Event
   */
  readonly onAction$ = new Subject<CardActionEvent>();

  constructor(
    @Inject(GLOBAL_RX_STATE) private globalState: RxState<GlobalState>,
    private state: RxState<Record<string, never>>,
    private dispatchCardActionService: DispatchCardActionService
  ) {}

  ngOnInit(): void {
    this.state.hold(
      this.onAction$.pipe(
        tap((event) => {
          this.dispatchCardActionService.dispatch({
            type: event.action,
            area: 'securityCheckArea',
            card: event.card,
          });
        })
      )
    );
  }
}
