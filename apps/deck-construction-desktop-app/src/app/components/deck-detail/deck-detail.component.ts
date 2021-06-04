import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { remove, RxState, update } from '@rx-angular/state';
import * as _ from 'lodash';
import { combineLatest, merge, Observable, Subject } from 'rxjs';
import { filter, map, tap, withLatestFrom } from 'rxjs/operators';
import { GlobalState, GLOBAL_RX_STATE } from '../../global-state';
import { CardInfo, Deck, DeckCardList } from '../../types';

@Component({
  selector: 'digimon-card-app-deck-detail',
  templateUrl: './deck-detail.component.html',
  styleUrls: ['./deck-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeckDetailComponent implements OnInit {
  readonly titleForm = new FormControl('');
  readonly selectedDeck$ = combineLatest([
    this.globalState.select('deckList'),
    this.globalState.select('selectedDeckId'),
  ]).pipe(
    map(([deckList, selectedDeckId]) =>
      deckList.find((v) => v.id === selectedDeckId)
    ),
    filter((v): v is Deck => v != null)
  );
  readonly deckCards$: Observable<DeckCardList> = this.selectedDeck$.pipe(
    withLatestFrom(this.globalState.select('cardInfoList')),
    map(([deck, cardInfoList]) => {
      const groupedCardList = _.groupBy(deck.cardList);
      const deckCardList = Object.keys(groupedCardList).reduce((acc, curr) => {
        const imgFileName = curr;
        const cardInfo = cardInfoList.find(
          (v) => v.imgFileName === imgFileName
        );
        if (cardInfo == null) {
          return acc;
        }
        return [
          ...acc,
          {
            cardInfo,
            count: groupedCardList[curr].length,
          },
        ];
      }, [] as DeckCardList);
      console.log(deckCardList);
      return _.orderBy(
        deckCardList,
        ['cardInfo.cardtype', 'cardInfo.lv', 'cardInfo.imgFileName'],
        ['desc']
      );
    })
  );
  readonly deckTotalCount$: Observable<number> = this.deckCards$.pipe(
    map((deckCards) => {
      return deckCards.reduce((acc, curr) => {
        return acc + curr.count;
      }, 0);
    })
  );
  readonly digitamaCount$: Observable<number> = this.deckCards$.pipe(
    map((deckCards) => {
      return deckCards
        .filter((deckCard) => deckCard.cardInfo.cardtype === 'デジタマ')
        .reduce((acc, curr) => {
          return acc + curr.count;
        }, 0);
    })
  );
  readonly lv3Count$: Observable<number> = this.deckCards$.pipe(
    map((deckCards) => {
      return deckCards
        .filter((deckCard) => deckCard.cardInfo.lv === 'Lv.3')
        .reduce((acc, curr) => {
          return acc + curr.count;
        }, 0);
    })
  );
  readonly lv4Count$: Observable<number> = this.deckCards$.pipe(
    map((deckCards) => {
      return deckCards
        .filter((deckCard) => deckCard.cardInfo.lv === 'Lv.4')
        .reduce((acc, curr) => {
          return acc + curr.count;
        }, 0);
    })
  );
  readonly lv5Count$: Observable<number> = this.deckCards$.pipe(
    map((deckCards) => {
      return deckCards
        .filter((deckCard) => deckCard.cardInfo.lv === 'Lv.5')
        .reduce((acc, curr) => {
          return acc + curr.count;
        }, 0);
    })
  );
  readonly lv6Count$: Observable<number> = this.deckCards$.pipe(
    map((deckCards) => {
      return deckCards
        .filter((deckCard) => deckCard.cardInfo.lv === 'Lv.6')
        .reduce((acc, curr) => {
          return acc + curr.count;
        }, 0);
    })
  );
  readonly lv7Count$: Observable<number> = this.deckCards$.pipe(
    map((deckCards) => {
      return deckCards
        .filter((deckCard) => deckCard.cardInfo.lv === 'Lv.7')
        .reduce((acc, curr) => {
          return acc + curr.count;
        }, 0);
    })
  );
  readonly tamerCount$: Observable<number> = this.deckCards$.pipe(
    map((deckCards) => {
      return deckCards
        .filter((deckCard) => deckCard.cardInfo.cardtype === 'テイマー')
        .reduce((acc, curr) => {
          return acc + curr.count;
        }, 0);
    })
  );
  readonly optionCount$: Observable<number> = this.deckCards$.pipe(
    map((deckCards) => {
      return deckCards
        .filter((deckCard) => deckCard.cardInfo.cardtype === 'オプション')
        .reduce((acc, curr) => {
          return acc + curr.count;
        }, 0);
    })
  );
  readonly digitamaDeckCardList$: Observable<DeckCardList> = this.deckCards$.pipe(
    map((deckCards) => {
      return deckCards.filter(
        (deckCard) => deckCard.cardInfo.cardtype === 'デジタマ'
      );
    })
  );
  readonly tamerDeckCardList$: Observable<DeckCardList> = this.deckCards$.pipe(
    map((deckCards) => {
      return deckCards.filter(
        (deckCard) => deckCard.cardInfo.cardtype === 'テイマー'
      );
    })
  );
  readonly optionDeckCardList$: Observable<DeckCardList> = this.deckCards$.pipe(
    map((deckCards) => {
      return deckCards.filter(
        (deckCard) => deckCard.cardInfo.cardtype === 'オプション'
      );
    })
  );
  readonly lv3DeckCardList$: Observable<DeckCardList> = this.deckCards$.pipe(
    map((deckCards) => {
      return deckCards.filter((deckCard) => deckCard.cardInfo.lv === 'Lv.3');
    })
  );
  readonly lv4DeckCardList$: Observable<DeckCardList> = this.deckCards$.pipe(
    map((deckCards) => {
      return deckCards.filter((deckCard) => deckCard.cardInfo.lv === 'Lv.4');
    })
  );
  readonly lv5DeckCardList$: Observable<DeckCardList> = this.deckCards$.pipe(
    map((deckCards) => {
      return deckCards.filter((deckCard) => deckCard.cardInfo.lv === 'Lv.5');
    })
  );
  readonly lv6DeckCardList$: Observable<DeckCardList> = this.deckCards$.pipe(
    map((deckCards) => {
      return deckCards.filter((deckCard) => deckCard.cardInfo.lv === 'Lv.6');
    })
  );
  readonly lv7DeckCardList$: Observable<DeckCardList> = this.deckCards$.pipe(
    map((deckCards) => {
      return deckCards.filter((deckCard) => deckCard.cardInfo.lv === 'Lv.7');
    })
  );

  readonly addCard$ = new Subject<CardInfo['imgFileName']>();
  readonly removeCard$ = new Subject<CardInfo['imgFileName']>();
  readonly deleteDeck$ = new Subject<void>();

  private readonly commitDeckTitleHandler$ = this.titleForm.valueChanges.pipe(
    tap((value) => {
      this.globalState.set('deckList', (state) => {
        const selectedDeck = state.deckList.find(
          (v) => v.id === state.selectedDeckId
        );
        return selectedDeck == null
          ? state.deckList
          : update(
              state.deckList,
              {
                ...selectedDeck,
                title: value,
              },
              'id'
            );
      });
    })
  );
  private readonly updateTitleFormHandler$ = merge(
    this.globalState.select('selectedDeckId'),
    this.globalState.select('deckList')
  ).pipe(
    tap(() => {
      const selectedDeckId = this.globalState.get('selectedDeckId');
      const deckList = this.globalState.get('deckList');
      const deck = deckList.find((v) => v.id === selectedDeckId);
      this.titleForm.setValue(deck?.title ?? '', { emitEvent: false });
    })
  );
  private readonly addCardHandler$ = this.addCard$.pipe(
    tap((imgFileName) => {
      this.globalState.set('deckList', (state) => {
        const selectedDeck = state.deckList.find(
          (v) => v.id === state.selectedDeckId
        );
        return selectedDeck == null
          ? state.deckList
          : update(
              state.deckList,
              {
                ...selectedDeck,
                cardList: [...selectedDeck.cardList, imgFileName],
              },
              'id'
            );
      });
    })
  );
  private readonly removeCardHandler$ = this.removeCard$.pipe(
    tap((imgFileName) => {
      this.globalState.set('deckList', (state) => {
        const selectedDeck = state.deckList.find(
          (v) => v.id === state.selectedDeckId
        );
        if (selectedDeck == null) return state.deckList;
        const index = selectedDeck?.cardList.findIndex(
          (v) => v === imgFileName
        );
        if (index === -1) return state.deckList;
        selectedDeck.cardList.splice(index, 1);
        return update(state.deckList, selectedDeck, 'id');
      });
    })
  );

  private readonly deleteDeckHandler$ = this.deleteDeck$.pipe(
    withLatestFrom(this.selectedDeck$),
    tap(([, deck]) => {
      this.globalState.set((state) => {
        return {
          ...state,
          deckList: remove(state.deckList, deck, 'id'),
          selectedDeckId: undefined,
        };
      });
    })
  );

  constructor(
    @Inject(GLOBAL_RX_STATE) private globalState: RxState<GlobalState>
  ) {}

  ngOnInit(): void {
    this.globalState.hold(this.commitDeckTitleHandler$);
    this.globalState.hold(this.updateTitleFormHandler$);
    this.globalState.hold(this.addCardHandler$);
    this.globalState.hold(this.removeCardHandler$);
    this.globalState.hold(this.deleteDeckHandler$);
  }
}
