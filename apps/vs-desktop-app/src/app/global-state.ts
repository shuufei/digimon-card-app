import { InjectionToken } from '@angular/core';
import { deck } from './deck';
import { CardInfo } from './types';

type Area = {
  cardList: CardInfo[];
};

export type GlobalState = {
  stack: Area;
  digitamaStack: Area;
  hand: Area;
  battleArea: Area;
  optionArea: Area;
  tamerArea: Area;
};

export const GLOBAL_RX_STATE = new InjectionToken<GlobalState>(
  'GLOBAL_RX_STATE'
);

export const INITIAL_GLOBAL_STATE: GlobalState = {
  stack: { cardList: deck.filter((v) => v.cardtype !== 'デジタマ') },
  digitamaStack: { cardList: deck.filter((v) => v.cardtype === 'デジタマ') },
  hand: { cardList: [] },
  battleArea: {
    cardList: [],
  },
  optionArea: {
    cardList: [],
  },
  tamerArea: {
    cardList: [],
  },
};
