import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
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
      const drawCard = state.board.myself.deck.pop();
      drawCard && state.board.myself.hand.push(drawCard);
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

export const selectors = {
  selectSelf,
  uiStateSelector,
  myselfDeckSelector,
  myselfHandSelector,
};
