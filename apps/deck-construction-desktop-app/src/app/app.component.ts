import { Component, Inject, OnInit } from '@angular/core';
import { RxState } from '@rx-angular/state';
import * as _ from 'lodash';
import { combineLatest } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { GlobalState, GLOBAL_RX_STATE } from './global-state';
import { ApiService } from './service/api.service';
import { CARD_TYPE, CATEGORY, COLOR, Color, Deck, LV } from './types';

type State = Record<string, never>;

@Component({
  selector: 'digimon-card-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [RxState],
})
export class AppComponent implements OnInit {
  title = 'deck-construction-desktop-app';

  private readonly LS_KEY_FILTER_CONDITION = 'filter_condition';
  private readonly LS_KEY_DECK_LIST = 'deck_list';

  readonly cards$ = this.globalState.select('cardInfoList');

  private readonly filter$ = this.globalState.select('filter');
  readonly filteredCards$ = combineLatest([this.cards$, this.filter$]).pipe(
    map(([cards, filterValues]) => {
      const filtered = cards.filter((card) => {
        const color: Color = card.color.includes('multicolor')
          ? '8_multicolor'
          : card.color;
        const isColorMatch = filterValues.colorList.includes(color);
        const isCardTypeMatch = filterValues.cardTypeList.includes(
          card.cardtype
        );
        const isLvMatch =
          card.lv != null ? filterValues.lvList.includes(card.lv) : true;
        const isCategoryMatch = filterValues.categoryList.includes(
          card.category
        );
        const isIncludeParallelMatch =
          card.parallel !== undefined ? filterValues.includeParallel : true;
        return (
          isColorMatch &&
          isCardTypeMatch &&
          isLvMatch &&
          isCategoryMatch &&
          isIncludeParallelMatch
        );
      });
      return _.orderBy(filtered, ['cardtype', 'lv', 'color'], ['desc']);
    })
  );

  private readonly parsistenceFilterConditionHandler$ = this.filter$.pipe(
    tap((filter) => {
      window.localStorage.setItem(
        this.LS_KEY_FILTER_CONDITION,
        JSON.stringify(filter)
      );
    })
  );

  private readonly parsistanceDeckListHandler$ = this.globalState
    .select('deckList')
    .pipe(
      tap((deckList) => {
        window.localStorage.setItem(
          this.LS_KEY_DECK_LIST,
          JSON.stringify(deckList)
        );
      })
    );

  isOpenDeckPanel = true;

  constructor(
    private readonly apiService: ApiService,
    @Inject(GLOBAL_RX_STATE) private globalState: RxState<GlobalState>,
    private readonly state: RxState<State>
  ) {}

  ngOnInit(): void {
    this.fetchCardData();
    this.state.hold(this.parsistenceFilterConditionHandler$);
    this.state.hold(this.parsistanceDeckListHandler$);
    this.globalState.set(() => ({
      filter: this.getDefaultFilterCondition(),
      deckList: this.getCurrentDeckList(),
    }));
  }

  private getDefaultFilterCondition() {
    const condition = window.localStorage.getItem(this.LS_KEY_FILTER_CONDITION);
    if (condition == null) {
      return {
        colorList: Object.values(COLOR),
        cardTypeList: Object.values(CARD_TYPE),
        lvList: Object.values(LV),
        categoryList: Object.values(CATEGORY),
        includeParallel: true,
      };
    }
    return JSON.parse(condition) as GlobalState['filter'];
  }

  private getCurrentDeckList() {
    const deckList = window.localStorage.getItem(this.LS_KEY_DECK_LIST);
    return ((deckList && JSON.parse(deckList)) ?? []) as Deck[];
  }

  private fetchCardData() {
    this.apiService
      .listAllCardInfo()
      .pipe(
        take(1),
        tap((cards) => {
          this.globalState.set('cardInfoList', () => cards);
        })
      )
      .subscribe();
  }
}
