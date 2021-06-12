import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RxState } from '@rx-angular/state';
import { BehaviorSubject, merge, Subject } from 'rxjs';
import { filter, map, tap, withLatestFrom } from 'rxjs/operators';
import { CustomMenueTriggerDirective } from '../../../custom-menu-trigger.directive';
import { Digimon } from '../../../domain/digimon';
import { GlobalState, GLOBAL_RX_STATE, PlayState } from '../../../global-state';
import { DispatchCardActionService } from '../../../services/dispatch-card-action/dispatch-card-action.service';
import { Side } from '../../../types';
import { CardActionItem } from '../../card/card.component';

@Component({
  selector: 'digimon-card-app-raising-area',
  templateUrl: './raising-area.component.html',
  styleUrls: ['./raising-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class RaisingAreaComponent implements OnInit {
  @Input()
  set digitamaStack(value: PlayState['digitamaStack']) {
    this.digitamaStack$.next(value);
  }
  @Input()
  set standbyArea(value: PlayState['standbyArea']) {
    this.standbyArea$.next(value);
  }
  @Input() side!: Side;
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
  readonly digitamaStack$ = new BehaviorSubject<PlayState['digitamaStack']>({
    cardList: [],
  });
  readonly standbyArea$ = new BehaviorSubject<PlayState['standbyArea']>({});

  /**
   * Events
   */
  readonly onContextMenu$ = new Subject<Event>();
  readonly onActionFromDigitamaStack$ = new Subject<CardActionItem>();
  readonly onActionFromStandbyArea$ = new Subject<CardActionItem>();
  readonly onSelectedDigimonCard$ = new Subject<Digimon>();
  private readonly onShuffle$ = this.onActionFromDigitamaStack$.pipe(
    filter((v) => v.action === 'shuffle')
  );
  private readonly onIncubation$ = merge(
    this.onActionFromDigitamaStack$.pipe(
      filter((v) => v.action === 'incubation')
    )
  );
  private readonly onEntry$ = this.onActionFromStandbyArea$.pipe(
    withLatestFrom(this.gs$.pipe(map((v) => v.playState.standbyArea.digimon))),
    filter(
      ([event, digimon]) => event.action === 'entry' && digimon !== undefined
    )
  );
  private readonly onSubmitEvolutionFromHandToStandbyArea$ = this.onSelectedDigimonCard$.pipe(
    withLatestFrom(this.gs$.pipe(map((v) => v.ui.modeState))),
    filter(
      ([, modeState]) =>
        modeState?.mode === 'evolution' && modeState?.trigger?.area === 'hand'
    )
  );

  constructor(
    @Inject(GLOBAL_RX_STATE) private globalState: RxState<GlobalState>,
    private state: RxState<Record<string, never>>,
    private readonly dispatchCardActionService: DispatchCardActionService
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
            evolutionOriginCardList: digimon?.evolutionOiriginCardList,
          });
        })
      )
    );
    this.state.hold(
      this.onSubmitEvolutionFromHandToStandbyArea$.pipe(
        tap(([digimon, modeState]) => {
          this.dispatchCardActionService.dispatch({
            type: 'evolution',
            area: 'hand',
            card: modeState?.trigger?.card,
            target: {
              area: 'standbyArea',
              digimon,
            },
          });
          this.globalState.set('ui', (state) => ({
            ...state.ui,
            modeState: undefined,
          }));
        })
      )
    );
  }
}
