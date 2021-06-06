import { produce } from 'immer';
import * as _ from 'lodash';
import { GlobalState } from '../../global-state';
import { Card } from '../../types';
import { StateAction } from './dispatch-card-action.service';

export const createStateForSecurityCheckAreaCardAction = (
  action: StateAction,
  currentState: GlobalState
): GlobalState => {
  switch (action.type) {
    case 'draw':
      return onDraw(action, currentState);
    case 'return':
      return onReturn(action, currentState);
    default:
      return currentState;
  }
};

const onDraw = (
  action: StateAction,
  currentState: GlobalState
): GlobalState => {
  if (action.card == null) return currentState;
  const card = action.card;
  return produce(currentState, (draft) => {
    _.remove(
      draft.playState.securityCheckArea.cardList,
      (v) => v.id === card.id
    );
    draft.playState.hand.cardList.push(card);
  });
};

const onReturn = (
  action: StateAction,
  currentState: GlobalState
): GlobalState => {
  if (action.card == null) {
    return currentState;
  }
  const card: Card = action.card;
  return produce(currentState, (draft) => {
    _.remove(
      draft.playState.securityCheckArea.cardList,
      (v) => v.id === card.id
    );
    draft.playState.securityArea.cardList.push(card);
  });
};
