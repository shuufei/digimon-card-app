import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { omit } from 'lodash';
import { DeckScreenTab } from '../configs/deck-screen-tabs';
import { CardInfo, CardsGroupedByLvAndCardTypeAndNo } from '../domains/card';
import { Deck } from '../domains/deck';

export type State = {
  selectedDeckId?: string;
  isCreateMode: boolean;
  decks: Deck[];
  currentTab?: DeckScreenTab;
};

const initialState: State = {
  isCreateMode: false,
  decks: [],
  currentTab: 'deck',
};

const getCardKey = (card: CardInfo): keyof CardsGroupedByLvAndCardTypeAndNo => {
  switch (card.cardtype) {
    case '2_デジモン':
      switch (card.lv) {
        case 'Lv.3':
          return 'Lv.3';
        case 'Lv.4':
          return 'Lv.4';
        case 'Lv.5':
          return 'Lv.5';
        case 'Lv.6':
          return 'Lv.6';
        case 'Lv.7':
          return 'Lv.7';
      }
    case '1_デジタマ':
      return 'Lv.2';
    case '3_テイマー':
      return '3_テイマー';
    case '4_オプション':
      return '4_オプション';
  }
};

const deckSlice = createSlice({
  name: 'deck',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<{ state: State }>) => {
      return {
        ...state,
        ...action.payload.state,
      };
    },
    reset: () => {
      return initialState;
    },
    selectDeck: (
      state,
      action: PayloadAction<{ deckId: State['selectedDeckId'] }>
    ) => {
      return { ...state, selectedDeckId: action.payload.deckId };
    },
    setCreateMode: (
      state,
      action: PayloadAction<{ isCreateMode: State['isCreateMode'] }>
    ) => {
      return {
        ...state,
        isCreateMode: action.payload.isCreateMode,
      };
    },
    addDeck: (state, action: PayloadAction<{ deck: Deck }>) => {
      return {
        ...state,
        decks: [...state.decks, action.payload.deck],
      };
    },
    setTab: (state, action: PayloadAction<{ tab: DeckScreenTab }>) => {
      return {
        ...state,
        currentTab: action.payload.tab,
      };
    },
    addCardToDeck: (state, action: PayloadAction<{ card: CardInfo }>) => {
      const card = action.payload.card;
      return {
        ...state,
        decks: state.decks.map((deck) => {
          if (deck.id !== state.selectedDeckId) {
            return deck;
          }
          const key = getCardKey(card);
          const includes = !!deck?.cards[key][card.imgFileName];
          return {
            ...deck,
            cards: {
              ...deck.cards,
              [key]: {
                ...deck.cards[key],
                [card.imgFileName]: includes
                  ? {
                      ...deck.cards[key][card.imgFileName],
                      count: deck.cards[key][card.imgFileName].count + 1,
                    }
                  : {
                      card: card,
                      count: 1,
                    },
              },
            },
          };
        }),
      };
    },
    removeCardToDeck: (state, action: PayloadAction<{ card: CardInfo }>) => {
      const card = action.payload.card;
      return {
        ...state,
        decks: state.decks.map((deck) => {
          if (deck.id !== state.selectedDeckId) {
            return deck;
          }
          const key = getCardKey(card);
          const currentCount = deck?.cards[key][card.imgFileName]?.count ?? 0;
          return {
            ...deck,
            cards: {
              ...deck.cards,
              [key]:
                currentCount <= 1
                  ? omit(deck.cards[key], card.imgFileName)
                  : {
                      ...deck.cards[key],
                      [card.imgFileName]: {
                        ...deck.cards[key][card.imgFileName],
                        count: deck.cards[key][card.imgFileName].count - 1,
                      },
                    },
            },
          };
        }),
      };
    },
    deleteDeck: (state, action: PayloadAction<{ deckId: Deck['id'] }>) => {
      return {
        ...state,
        decks: state.decks.filter((deck) => deck.id !== action.payload.deckId),
      };
    },
    updateDeckTitle: (
      state,
      action: PayloadAction<Pick<Deck, 'id' | 'title'>>
    ) => {
      return {
        ...state,
        decks: state.decks.map((deck) =>
          deck.id === action.payload.id
            ? { ...deck, title: action.payload.title }
            : deck
        ),
      };
    },
    updateDeckKeyCard: (
      state,
      action: PayloadAction<Required<Pick<Deck, 'id' | 'keyCard'>>>
    ) => {
      return {
        ...state,
        decks: state.decks.map((deck) =>
          deck.id === action.payload.id
            ? { ...deck, keyCard: action.payload.keyCard }
            : deck
        ),
      };
    },
  },
});

export const actions = deckSlice.actions;

export const reducers = deckSlice.reducer;

export const name = deckSlice.name;

const selectSelf = (state: { [name]: State }) => state[name];
const selectedDeckIdSelector = createSelector(
  selectSelf,
  (state) => state.selectedDeckId
);
const isCreateModeSelector = createSelector(
  selectSelf,
  (state) => state.isCreateMode
);
const decksSelector = createSelector(selectSelf, (state) => state.decks);
const selectedDeckSelector = createSelector(selectSelf, (state) => {
  return state.decks.find((deck) => deck.id === state.selectedDeckId);
});
const currentTabSelector = createSelector(
  selectSelf,
  (state) => state.currentTab
);
export const selectors = {
  selectSelf,
  selectedDeckIdSelector,
  isCreateModeSelector,
  decksSelector,
  selectedDeckSelector,
  currentTabSelector,
};
