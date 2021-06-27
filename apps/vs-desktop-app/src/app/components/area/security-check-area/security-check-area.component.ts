import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { RxState } from '@rx-angular/state';
import { BehaviorSubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GlobalState, GLOBAL_RX_STATE, PlayState } from '../../../global-state';
import { DispatchCardActionService } from '../../../services/dispatch-card-action/dispatch-card-action.service';
import { Side } from '../../../types';
import { CardActionEvent, CardActionItem } from '../../card/card.component';

@Component({
  selector: 'digimon-card-app-security-check-area',
  templateUrl: './security-check-area.component.html',
  styleUrls: ['./security-check-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class SecurityCheckAreaComponent implements OnInit {
  @Input()
  set securityCheckArea(value: PlayState['securityCheckArea']) {
    this.securityCheckArea$.next(value);
  }
  @Input() side!: Side;
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
  readonly securityCheckArea$ = new BehaviorSubject<
    PlayState['securityCheckArea']
  >({
    cardList: [],
  });

  /**
   * Event
   */
  readonly onAction$ = new Subject<CardActionEvent>();
  readonly onBulkReturn$ = new Subject<void>();

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
    this.state.hold(
      this.onBulkReturn$.pipe(
        tap(() => {
          this.globalState
            .get('playState', 'securityCheckArea')
            .cardList.forEach((card) => {
              this.dispatchCardActionService.dispatch({
                type: 'return',
                area: 'securityCheckArea',
                card,
              });
            });
        })
      )
    );
  }
}
