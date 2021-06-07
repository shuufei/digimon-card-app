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
  selector: 'digimon-card-app-tamer-area',
  templateUrl: './tamer-area.component.html',
  styleUrls: ['./tamer-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class TamerAreaComponent implements OnInit {
  /**
   * Constants
   */
  readonly actionList: CardActionItem[] = [
    {
      action: 'rest',
      displayText: 'レスト',
    },
    {
      action: 'active',
      displayText: 'アクティブ',
    },
    {
      action: 'trash',
      displayText: '消滅',
    },
    {
      action: 'entry',
      displayText: '登場',
    },
  ];

  /**
   * State
   */
  readonly tamerArea$ = this.globalState.select('playState', 'tamerArea');

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
    this.state.hold(
      this.onAction$.pipe(
        tap((event) => {
          this.dispatchCardActionService.dispatch({
            type: event.action,
            area: 'tamerArea',
            card: event.card,
          });
        })
      )
    );
  }
}
