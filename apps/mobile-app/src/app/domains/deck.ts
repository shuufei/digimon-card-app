import { CardsGroupedByLvAndCardTypeAndNo, CardInfo } from './card';
import { first } from 'lodash';

export type Deck = {
  id: string;
  title: string;
  cards: CardsGroupedByLvAndCardTypeAndNo;
  createdAt: number;
  keyCard?: CardInfo;
};

export const createDeck = (deck: Partial<Deck>): Deck => {
  return {
    id: `${new Date().valueOf()}-${Math.random()}`,
    title: '',
    cards: {
      'Lv.2': {},
      'Lv.3': {},
      'Lv.4': {},
      'Lv.5': {},
      'Lv.6': {},
      'Lv.7': {},
      '-': {},
      '3_テイマー': {},
      '4_オプション': {},
    },
    createdAt: new Date().valueOf(),
    ...deck,
  };
};

export const getKeyCard = (deck: Deck) => {
  if (Object.keys(deck.cards['Lv.7']).length >= 1) {
    return first(Object.values(deck.cards['Lv.7']))?.card;
  }
  if (Object.keys(deck.cards['Lv.6']).length >= 1) {
    return first(Object.values(deck.cards['Lv.6']))?.card;
  }
  if (Object.keys(deck.cards['Lv.5']).length >= 1) {
    return first(Object.values(deck.cards['Lv.5']))?.card;
  }
  if (Object.keys(deck.cards['Lv.4']).length >= 1) {
    return first(Object.values(deck.cards['Lv.4']))?.card;
  }
  if (Object.keys(deck.cards['Lv.3']).length >= 1) {
    return first(Object.values(deck.cards['Lv.3']))?.card;
  }
  return;
};
