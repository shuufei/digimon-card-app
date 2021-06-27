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
  selector: 'digimon-card-app-security-open-area',
  templateUrl: './security-open-area.component.html',
  styleUrls: ['./security-open-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SecurityOpenAreaComponent implements OnInit {
  @Input()
  set securityOpenArea(value: PlayState['securityOpenArea']) {
    this.securityOpenArea$.next(value);
  }
  @Input() side!: Side;
  /**
   * Constants
   */
  readonly actionList: CardActionItem[] = [
    {
      action: 'trash',
      displayText: '破棄',
    },
    {
      action: 'entry',
      displayText: '登場',
    },
    {
      action: 'draw',
      displayText: '手札に加える',
    },
  ];

  /**
   * State
   */
  readonly securityOpenArea$ = new BehaviorSubject<
    PlayState['securityOpenArea']
  >({
    cardList: [],
  });

  /**
   * Event
   */
  readonly onAction$ = new Subject<CardActionEvent>();
  readonly onBulkTrash$ = new Subject<void>();

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
            area: 'securityOpenArea',
            card: event.card,
          });
        })
      )
    );
    this.state.hold(
      this.onBulkTrash$.pipe(
        tap(() => {
          this.globalState
            .get('playState', 'securityOpenArea')
            .cardList.forEach((card) => {
              this.dispatchCardActionService.dispatch({
                type: 'trash',
                area: 'securityOpenArea',
                card,
              });
            });
        })
      )
    );
  }
}
