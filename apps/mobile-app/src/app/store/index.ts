import { configureStore } from '@reduxjs/toolkit';
import * as cardListFilterStore from './card-list-filter-store';
import * as deckStore from './deck-store';
import * as authStore from './auth-store';

export const store = configureStore({
  reducer: {
    [cardListFilterStore.name]: cardListFilterStore.reducers,
    [deckStore.name]: deckStore.reducers,
    [authStore.name]: authStore.reducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
