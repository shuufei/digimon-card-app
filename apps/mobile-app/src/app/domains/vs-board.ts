import 'react-native-get-random-values';
import { v4 } from 'uuid';
import { Deck } from './deck';
import { VsCard } from './vs-card';

export type VsBoard = {
  deck: VsCard[];
};

export const initVsBoard: VsBoard = {
  deck: [],
};

export const convertToVsCardListFromDeck = (deck: Deck): VsCard[] => {
  return Object.values(deck.cards)
    .map((cards) => {
      return Object.values(cards)
        .map(({ card, count }) => {
          return new Array(count).fill(null).map(() => card);
        })
        .flat();
    })
    .flat()
    .map((card) => ({
      id: v4(),
      data: card,
    }));
};
