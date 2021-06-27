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
  selector: 'digimon-card-app-stack-open-area',
  templateUrl: './stack-open-area.component.html',
  styleUrls: ['./stack-open-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class StackOpenAreaComponent implements OnInit {
  @Input()
  set stackOpenArea(value: PlayState['stackOpenArea']) {
    this.stackOpenArea$.next(value);
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
      action: 'addToBottomOfStack',
      displayText: '山札の一番したに加える',
    },
    {
      action: 'trash',
      displayText: '破棄',
    },
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
   * State
   */
  readonly stackOpenArea$ = new BehaviorSubject<PlayState['stackOpenArea']>({
    cardList: [],
  });

  /**
   * Event
   */
  readonly onAction$ = new Subject<CardActionEvent>();
  readonly onBulkTrash$ = new Subject<void>();
  readonly onBulkAddToBottomStack$ = new Subject<void>();

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
            area: 'stackOpenArea',
            card: event.card,
          });
        })
      )
    );
    this.state.hold(
      this.onBulkTrash$.pipe(
        tap(() => {
          this.globalState
            .get('playState', 'stackOpenArea')
            .cardList.forEach((card) => {
              this.dispatchCardActionService.dispatch({
                type: 'trash',
                area: 'stackOpenArea',
                card,
              });
            });
        })
      )
    );
    this.state.hold(
      this.onBulkAddToBottomStack$.pipe(
        tap(() => {
          this.globalState
            .get('playState', 'stackOpenArea')
            .cardList.forEach((card) => {
              this.dispatchCardActionService.dispatch({
                type: 'addToBottomOfStack',
                area: 'stackOpenArea',
                card,
              });
            });
        })
      )
    );
  }
}
