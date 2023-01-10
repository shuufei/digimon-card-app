import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WritableDraft } from '@reduxjs/toolkit/node_modules/immer/dist/internal';
import { shuffle } from 'lodash';
import { Deck } from '../domains/deck';
import {
  convertToVsCardListFromDeck,
  initVsBoard,
  VsBoard,
} from '../domains/vs-board';

export type State = {
  ui: {
    shouldShowSecurityCheckView: boolean;
    shouldShowTrashCheckView: boolean;
  };
  board: {
    myself: VsBoard;
    opponent: VsBoard;
  };
  selectedDeckId?: Deck['id'];
};

const initialState: State = {
  ui: {
    shouldShowSecurityCheckView: false,
    shouldShowTrashCheckView: false,
  },
  board: {
    myself: initVsBoard,
    opponent: initVsBoard,
  },
};

const popDeckAndPushTo = (state: WritableDraft<State>, to: keyof VsBoard) => {
  const card = state.board.myself.deck.pop();
  card && state.board.myself[to].push(card);
  return state;
};

const vsSlice = createSlice({
  name: 'vs',
  initialState,
  reducers: {
    setShouldShowSecurityCheckView: (
      state,
      action: PayloadAction<Pick<State['ui'], 'shouldShowSecurityCheckView'>>
    ) => {
      state.ui.shouldShowSecurityCheckView =
        action.payload.shouldShowSecurityCheckView;
      return state;
    },
    setShouldShowTrashCheckView: (
      state,
      action: PayloadAction<Pick<State['ui'], 'shouldShowTrashCheckView'>>
    ) => {
      state.ui.shouldShowTrashCheckView =
        action.payload.shouldShowTrashCheckView;
      return state;
    },
    selectDeck: (state, action: PayloadAction<{ deck: Deck | undefined }>) => {
      state.board.myself.deck =
        action.payload.deck != null
          ? convertToVsCardListFromDeck(action.payload.deck)
          : [];
      state.selectedDeckId = action.payload.deck?.id;
      return state;
    },
    draw: (state) => {
      return popDeckAndPushTo(state, 'hand');
    },
    deckOpen: (state) => {
      return popDeckAndPushTo(state, 'deckOpen');
    },
    recovery: (state) => {
      return popDeckAndPushTo(state, 'security');
    },
    trashFromDeck: (state) => {
      return popDeckAndPushTo(state, 'trash');
    },
    shuffleDeck: (state) => {
      const cardList = new Array(5)
        .fill(null)
        .reduce((acc) => shuffle(acc), shuffle([...state.board.myself.deck]));
      state.board.myself.deck = cardList;
      return state;
    },
    trashAllFromDeckOpen: (state) => {
      const cardList = state.board.myself.deckOpen;
      state.board.myself.deckOpen = [];
      state.board.myself.trash = state.board.myself.trash.concat(cardList);
      return state;
    },
  },
});

export const actions = vsSlice.actions;

export const reducers = vsSlice.reducer;

export const name = vsSlice.name;

const selectSelf = (state: { [name]: State }) => state[name];
const uiStateSelector = createSelector(selectSelf, (state) => state.ui);
const myselfDeckSelector = createSelector(
  selectSelf,
  (state) => state.board.myself.deck
);
const myselfHandSelector = createSelector(
  selectSelf,
  (state) => state.board.myself.hand
);
const myselfDeckOpenSelector = createSelector(
  selectSelf,
  (state) => state.board.myself.deckOpen
);
const myselfSecuritySelector = createSelector(
  selectSelf,
  (state) => state.board.myself.security
);
const myselfTrashSelector = createSelector(
  selectSelf,
  (state) => state.board.myself.trash
);

export const selectors = {
  selectSelf,
  uiStateSelector,
  myselfDeckSelector,
  myselfDeckOpenSelector,
  myselfHandSelector,
  myselfSecuritySelector,
  myselfTrashSelector,
};
