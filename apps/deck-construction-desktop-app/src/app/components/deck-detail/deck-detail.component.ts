import { Component, Inject, Input, OnInit } from '@angular/core';
import { GLOBAL_RX_STATE, GlobalState } from '../../global-state';
import { Deck, CardInfo } from '../../types';
import { RxState, update } from '@rx-angular/state';
import { FormControl } from '@angular/forms';
import { filter, pluck, tap, map, withLatestFrom } from 'rxjs/operators';
import { merge, combineLatest, Observable, Subject } from 'rxjs';
import * as _ from 'lodash';

type DeckCardList = {
  cardInfo: CardInfo;
  count: number;
}[];

@Component({
  selector: 'digimon-card-app-deck-detail',
  templateUrl: './deck-detail.component.html',
  styleUrls: ['./deck-detail.component.scss'],
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
        const no = curr;
        const cardInfo = cardInfoList.find((v) => v.no === no);
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
      return _.orderBy(deckCardList, ['cardInfo.cardtype', 'cardInfo.lv', 'cardInfo.no'], ['desc']);
    })
  );

  readonly addCard$ = new Subject<CardInfo['no']>();
  readonly removeCard$ = new Subject<CardInfo['no']>();

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
    tap((no) => {
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
                cardList: [...selectedDeck.cardList, no],
              },
              'id'
            );
      });
    })
  );
  private readonly removeCardHandler$ = this.removeCard$.pipe(
    tap(no => {
      this.globalState.set('deckList', (state) => {
        const selectedDeck = state.deckList.find(
          (v) => v.id === state.selectedDeckId
        );
        if (selectedDeck == null) return state.deckList;
        const index = selectedDeck?.cardList.findIndex(v => v === no);
        if (index === -1) return state.deckList;
        selectedDeck.cardList.splice(index, 1);
        return update(
          state.deckList,
          selectedDeck,
          'id'
        )
      })
    })
  )

  constructor(
    @Inject(GLOBAL_RX_STATE) private globalState: RxState<GlobalState>
  ) {}

  ngOnInit(): void {
    this.globalState.hold(this.commitDeckTitleHandler$);
    this.globalState.hold(this.updateTitleFormHandler$);
    this.globalState.hold(this.addCardHandler$);
    this.globalState.hold(this.removeCardHandler$);
  }
}
