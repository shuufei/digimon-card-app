export const DECK_SCREEN_TAB = {
  deck: 0,
  cardList: 1,
} as const;

export type DeckScreenTab = keyof typeof DECK_SCREEN_TAB;
