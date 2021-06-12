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
  selector: 'digimon-card-app-option-area',
  templateUrl: './option-area.component.html',
  styleUrls: ['./option-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class OptionAreaComponent implements OnInit {
  @Input()
  set optionArea(value: PlayState['optionArea']) {
    this.optionArea$.next(value);
  }
  @Input() side!: Side;
  /**
   * Constants
   */
  readonly actionList: CardActionItem[] = [
    {
      action: 'draw',
      displayText: '手札に戻す',
    },
    {
      action: 'trash',
      displayText: '破棄',
    },
  ];

  /**
   * State
   */
  readonly optionArea$ = new BehaviorSubject<PlayState['optionArea']>({
    cardList: [],
  });

  /**
   * Events
   */
  readonly onAction$ = new Subject<CardActionEvent>();

  constructor(
    @Inject(GLOBAL_RX_STATE) private globalState: RxState<GlobalState>,
    private readonly state: RxState<Record<string, never>>,
    private readonly dispatchCardActionService: DispatchCardActionService
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
            area: 'optionArea',
            card: event.card,
          });
        })
      )
    );
  }
}
