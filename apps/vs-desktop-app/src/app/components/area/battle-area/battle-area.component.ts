import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { RxState } from '@rx-angular/state';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, map, tap, withLatestFrom } from 'rxjs/operators';
import { Digimon } from '../../../domain/digimon';
import { GlobalState, GLOBAL_RX_STATE, PlayState } from '../../../global-state';
import { DispatchCardActionService } from '../../../services/dispatch-card-action/dispatch-card-action.service';
import { Side } from '../../../types';
import { AddEvolutionOriginDialogComponent } from '../../add-evolution-origin-dialog/add-evolution-origin-dialog.component';
import { CardActionEvent, CardActionItem } from '../../card/card.component';

@Component({
  selector: 'digimon-card-app-battle-area',
  templateUrl: './battle-area.component.html',
  styleUrls: ['./battle-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class BattleAreaComponent implements OnInit {
  @Input()
  set battleArea(value: PlayState['battleArea']) {
    this.battleArea$.next(value);
  }
  @Input() side!: Side;
  /**
   * Constants
   */
  readonly battleAreaCardActionList: CardActionItem[] = [
    {
      action: 'rest',
      displayText: 'レスト',
    },
    {
      action: 'active',
      displayText: 'アクティブ',
    },
    {
      action: 'draw',
      displayText: '手札に戻す',
    },
    {
      action: 'trash',
      displayText: '消滅',
    },
    {
      action: 'degeneration',
      displayText: '退化',
    },
    {
      action: 'addToBottomOfStack',
      displayText: '山札の一番下に加える',
    },
    {
      action: 'addToEvolutionOrigin',
      displayText: '進化元に追加',
    },
  ];

  /**
   * State
   */
  private readonly gs$ = this.globalState.select();
  readonly battleArea$ = new BehaviorSubject<PlayState['battleArea']>({
    digimonList: [],
  });

  /**
   * Events
   */
  readonly onSelectDigimonCard$ = new Subject<Digimon>();
  readonly onAction$ = new Subject<CardActionEvent>();
  private readonly onSubmitEvolutionFromHandToBattleArea$ =
    this.onSelectDigimonCard$.pipe(
      withLatestFrom(this.gs$.pipe(map((v) => v.ui.modeState))),
      filter(
        ([, modeState]) =>
          modeState?.mode === 'evolution' && modeState?.trigger?.area === 'hand'
      )
    );
  private readonly onSelectAddToEvolutionOrigin$ =
    this.onSelectDigimonCard$.pipe(
      withLatestFrom(this.gs$.pipe(map((v) => v.ui.modeState))),
      filter(([, modeState]) => modeState?.mode === 'addToEvolutionOrigin')
    );
  private readonly onAddToEvolutionOrigin$ = this.onAction$.pipe(
    withLatestFrom(this.gs$, this.battleArea$),
    filter(
      ([event, gs]) =>
        event.action === 'addToEvolutionOrigin' &&
        gs.playState.battleArea.digimonList.length > 0
    ),
    map(([event, _, battleArea]) => {
      return battleArea.digimonList.find((v) => v.card.id === event.card.id);
    }),
    filter((digimon): digimon is Digimon => {
      return digimon != null;
    })
  );

  constructor(
    @Inject(GLOBAL_RX_STATE) private globalState: RxState<GlobalState>,
    private readonly state: RxState<Record<string, never>>,
    private readonly dispatchCardActionService: DispatchCardActionService,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (this.side == null) {
      throw new Error('side is required!');
    }
    if (this.side === 'other') return;
    this.state.hold(
      this.onSubmitEvolutionFromHandToBattleArea$.pipe(
        tap(([digimon, modeState]) => {
          this.dispatchCardActionService.dispatch({
            type: 'evolution',
            area: 'hand',
            card: modeState?.trigger?.card,
            target: {
              area: 'battleArea',
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
    this.state.hold(
      this.onAction$.pipe(
        filter((event) => {
          return event.action !== 'addToEvolutionOrigin';
        }),
        tap((event) => {
          this.dispatchCardActionService.dispatch({
            type: event.action,
            area: 'battleArea',
            card: event.card,
          });
        })
      )
    );
    this.state.hold(
      this.onSelectAddToEvolutionOrigin$.pipe(
        tap(([digimon]) => {
          this.dialog.open(AddEvolutionOriginDialogComponent, {
            width: '60%',
            height: '70%',
            data: {
              digimon,
            },
          });
        })
      )
    );
    this.globalState.connect(
      'ui',
      this.onAddToEvolutionOrigin$,
      (state, event) => ({
        ...state.ui,
        modeState: {
          mode: 'addToEvolutionOrigin',
          trigger: {
            area: 'battleArea',
            card: event.card,
            digimon: event,
          },
        },
      })
    );
  }

  trackBy(index: number, item: Digimon) {
    return item.id && !!item.evolutionOiriginCardList.length;
  }
}
