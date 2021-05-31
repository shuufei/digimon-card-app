import { InjectionToken } from '@angular/core';
import { CardType, Color, Lv, Category, Deck, CardInfo } from './types';

export type GlobalState = {
  filter: {
    colorList: Color[];
    cardTypeList: CardType[];
    lvList: Lv[];
    categoryList: Category[];
    includeParallel: boolean;
  };
  selectedDeckId?: Deck['id'];
  deckList: Deck[];
  cardInfoList: CardInfo[];
};

export const GLOBAL_RX_STATE = new InjectionToken<GlobalState>(
  'GLOBAL_RX_STATE'
);
