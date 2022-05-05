import { CardInfo, convertToDisplayCardTypeFromCardType } from './card';
import { Deck } from './deck';

export type DeckForVsApp = (Omit<CardInfo, 'cardtype'> & {
  imgSrc: string;
  cardtype: string;
})[];

export const convertToDeckForVsAppFromDeck = (deck: Deck): DeckForVsApp => {
  return Object.values(deck.cards)
    .reduce((acc, cardsGroupedByNo) => {
      const cards = Object.values(cardsGroupedByNo).reduce(
        (_acc, { card, count }) => {
          return [..._acc, ...new Array(count).fill(card)];
        },
        [] as CardInfo[]
      );
      return [...acc, ...cards];
    }, [] as CardInfo[])
    .map((card) => ({
      ...card,
      imgSrc: `./assets/images/${card.category}/${card.imgFileName}`,
      cardtype: convertToDisplayCardTypeFromCardType(card.cardtype),
    }));
};
