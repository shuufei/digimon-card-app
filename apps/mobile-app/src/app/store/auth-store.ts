import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
export type State = {
  isAuthenticated?: boolean;
  signedQueryStrings?: string;
};

const initialState: State = {};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state) => {
      return {
        ...state,
        isAuthenticated: true,
      };
    },
    signOut: (state) => {
      return {
        ...state,
        isAuthenticated: false,
      };
    },
    setSignedQueryString: (
      state,
      action: PayloadAction<Pick<State, 'signedQueryStrings'>>
    ) => {
      return {
        ...state,
        signedQueryStrings: action.payload.signedQueryStrings,
      };
    },
  },
});

export const actions = authSlice.actions;

export const reducers = authSlice.reducer;

export const name = authSlice.name;

const selectSelf = (state: { [name]: State }) => state[name];
const isAuthenticatedSelector = createSelector(
  selectSelf,
  (state) => state.isAuthenticated
);
const signedQueryStringsSelector = createSelector(
  selectSelf,
  (state) => state.signedQueryStrings
);
export const selectors = {
  selectSelf,
  isAuthenticatedSelector,
  signedQueryStringsSelector,
};
