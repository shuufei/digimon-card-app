import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { GLOBAL_RX_STATE, GlobalState } from './global-state';
import { ApiService } from './service/api.service';
import { RxState } from '@rx-angular/state';
import { COLOR, CARD_TYPE, LV, CATEGORY, Deck } from './types';
import * as _ from 'lodash';

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

  readonly cards$ = this.apiService.listAllCardInfo();

  private readonly filter$ = this.globalState.select('filter');
  readonly filteredCards$ = combineLatest([this.cards$, this.filter$]).pipe(
    map(([cards, filterValues]) => {
      const filtered = cards.filter((card) => {
        const isColorMatch = filterValues.colorList.includes(card.color);
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
    this.state.hold(this.parsistenceFilterConditionHandler$);
    this.state.hold(this.parsistanceDeckListHandler$);
    this.globalState.set(() => ({
      filter: this.getDefaultFilterCondition(),
      deckList: this.getCurrentDeckList(),
    }));
    this.globalState
      .select()
      .pipe(tap((v) => console.log('change global state: ', v)))
      .subscribe();
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
}
