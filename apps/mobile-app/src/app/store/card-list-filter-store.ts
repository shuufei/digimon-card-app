import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  CardType,
  CARD_TYPE,
  Category,
  CATEGORY,
  Color,
  colorList,
  Lv,
  LV,
} from '../domains/card';

export type State = {
  colors: Color[];
  cardTypes: CardType[];
  lvList: Lv[];
  categories: Category[];
  includesParallel: boolean;
  executeFilterTimestamp?: number;
};

const initialState: State = {
  colors: colorList,
  cardTypes: Object.entries(CARD_TYPE).map((v) => v[0] as CardType),
  lvList: Object.entries(LV).map((v) => v[0] as Lv),
  categories: Object.entries(CATEGORY).map((v) => v[0] as Category),
  includesParallel: true,
};

const cardListFilterSlice = createSlice({
  name: 'card-list-filter',
  initialState: initialState,
  reducers: {
    set: (_, action: PayloadAction<{ state: State }>) => {
      return action.payload.state;
    },
    updateColors: (state, action: PayloadAction<{ colors: Color[] }>) => {
      return {
        ...state,
        colors: action.payload.colors,
      };
    },
    updateCardTypes: (
      state,
      action: PayloadAction<{ cardTypes: CardType[] }>
    ) => {
      return {
        ...state,
        cardTypes: action.payload.cardTypes,
      };
    },
    updateLv: (state, action: PayloadAction<{ lvList: Lv[] }>) => {
      return {
        ...state,
        lvList: action.payload.lvList,
      };
    },
    updateCategories: (
      state,
      action: PayloadAction<{ categories: Category[] }>
    ) => {
      return {
        ...state,
        categories: action.payload.categories,
      };
    },
    updateIncludesParallel: (
      state,
      action: PayloadAction<{ includesParallel: boolean }>
    ) => {
      return {
        ...state,
        includesParallel: action.payload.includesParallel,
      };
    },
    executeFilter: (state, _: PayloadAction) => {
      return {
        ...state,
        executeFilterTimestamp: new Date().valueOf(),
      };
    },
  },
});

export const actions = cardListFilterSlice.actions;

export const reducers = cardListFilterSlice.reducer;
export const name = cardListFilterSlice.name;

/** Selectors */
const selectSelf = (state: { [name]: State }) => state[name];
const colorsSelector = createSelector(selectSelf, (state) => state.colors);
const cardTypesSelector = createSelector(
  selectSelf,
  (state) => state.cardTypes
);
const lvListSelector = createSelector(selectSelf, (state) => state.lvList);
const categoriesSelector = createSelector(
  selectSelf,
  (state) => state.categories
);
const includesParallelSelector = createSelector(
  selectSelf,
  (state) => state.includesParallel
);
const executeFilterTimestamp = createSelector(
  selectSelf,
  (state) => state.executeFilterTimestamp
);

export const selectors = {
  selectSelf,
  colorsSelector,
  cardTypesSelector,
  lvListSelector,
  categoriesSelector,
  includesParallelSelector,
  executeFilterTimestamp,
};
