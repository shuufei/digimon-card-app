import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RxState } from '@rx-angular/state';
import { Subject } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { CustomMenueTriggerDirective } from '../../../custom-menu-trigger.directive';
import { GlobalState, GLOBAL_RX_STATE } from '../../../global-state';
import { DispatchCardActionService } from '../../../services/dispatch-card-action/dispatch-card-action.service';
import { CardActionItem } from '../../card/card.component';

@Component({
  selector: 'digimon-card-app-stack',
  templateUrl: './stack.component.html',
  styleUrls: ['./stack.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class StackComponent implements OnInit {
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
      action: 'shuffle',
      displayText: 'シャッフル',
    },
  ];

  /**
   * State
   */
  readonly stack$ = this.globalState.select('stack');

  /**
   * Events
   */
  readonly onContextMenu$ = new Subject<Event>();
  readonly onAction$ = new Subject<CardActionItem>();
  readonly onShuffle$ = this.onAction$.pipe(
    filter((v) => v.action === 'shuffle')
  );
  readonly onDraw$ = this.onAction$.pipe(filter((v) => v.action === 'draw'));

  constructor(
    @Inject(GLOBAL_RX_STATE) private readonly globalState: RxState<GlobalState>,
    private readonly state: RxState<Record<string, never>>,
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
    this.globalState.hold(
      this.onShuffle$.pipe(
        tap(() =>
          this.dispatchCardActionService.dispatch({
            type: 'shuffle',
            area: 'stack',
          })
        )
      )
    );
    this.globalState.hold(
      this.onDraw$.pipe(
        tap(() =>
          this.dispatchCardActionService.dispatch({
            type: 'draw',
            area: 'stack',
          })
        )
      )
    );
  }
}
