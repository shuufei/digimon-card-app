import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RxState } from '@rx-angular/state';
import { merge, Subject } from 'rxjs';
import { filter, map, tap, withLatestFrom } from 'rxjs/operators';
import { CustomMenueTriggerDirective } from '../../../custom-menu-trigger.directive';
import { GlobalState, GLOBAL_RX_STATE } from '../../../global-state';
import { DispatchCardActionService } from '../../../services/dispatch-card-action/dispatch-card-action.service';
import { CardActionItem } from '../../card/card.component';

@Component({
  selector: 'digimon-card-app-raising-area',
  templateUrl: './raising-area.component.html',
  styleUrls: ['./raising-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class RaisingAreaComponent implements OnInit {
  @ViewChild(CustomMenueTriggerDirective) trigger?: CustomMenueTriggerDirective;

  /**
   * constants
   */
  readonly actionListForDigitamaStack: CardActionItem[] = [
    {
      action: 'incubation',
      displayText: '孵化',
    },
    {
      action: 'shuffle',
      displayText: 'シャッフル',
    },
  ];
  readonly actionListForStandbyArea: CardActionItem[] = [
    {
      action: 'entry',
      displayText: '登場',
    },
  ];

  /**
   * State
   */
  readonly gs$ = this.globalState.select();

  /**
   * Events
   */
  readonly onContextMenu$ = new Subject<Event>();
  readonly onClick$ = new Subject<void>();
  readonly onActionFromDigitamaStack$ = new Subject<CardActionItem>();
  readonly onActionFromStandbyArea$ = new Subject<CardActionItem>();
  private readonly onShuffle$ = this.onActionFromDigitamaStack$.pipe(
    filter((v) => v.action === 'shuffle')
  );
  private readonly onIncubation$ = merge(
    this.onActionFromDigitamaStack$.pipe(
      filter((v) => v.action === 'incubation')
    ),
    this.onClick$
  );
  private readonly onEntry$ = this.onActionFromStandbyArea$.pipe(
    withLatestFrom(this.gs$.pipe(map((v) => v.playState.standbyArea.digimon))),
    filter(
      ([event, digimon]) => event.action === 'entry' && digimon !== undefined
    )
  );

  constructor(
    @Inject(GLOBAL_RX_STATE) private globalState: RxState<GlobalState>,
    private state: RxState<Record<string, never>>,
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
            area: 'digitamaStack',
          })
        )
      )
    );
    this.state.hold(
      this.onIncubation$.pipe(
        tap(() =>
          this.dispatchCardActionService.dispatch({
            type: 'incubation',
            area: 'digitamaStack',
          })
        )
      )
    );
    this.state.hold(
      this.onEntry$.pipe(
        tap(([, digimon]) => {
          this.dispatchCardActionService.dispatch({
            type: 'entry',
            area: 'standbyArea',
            card: digimon?.card,
          });
        })
      )
    );
  }
}
