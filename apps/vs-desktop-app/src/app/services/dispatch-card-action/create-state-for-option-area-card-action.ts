import { produce } from 'immer';
import * as _ from 'lodash';
import { GlobalState } from '../../global-state';
import { Card } from '../../types';
import { StateAction } from './dispatch-card-action.service';

export const createStateForOptionAreaCardAction = (
  action: StateAction,
  currentState: GlobalState
): GlobalState => {
  switch (action.type) {
    case 'draw':
      return onDraw(action, currentState);
    case 'trash':
      return onTrash(action, currentState);
    case 'addToTopOfStack':
      return onAddToTopOfStack(action, currentState);
    default:
      return currentState;
  }
};

const onDraw = (
  action: StateAction,
  currentState: GlobalState
): GlobalState => {
  if (action.card == null) return currentState;
  const card: Card = action.card;
  return produce(currentState, (draft) => {
    _.remove(draft.playState.optionArea.cardList, (v) => v.id === card.id);
    draft.playState.hand.cardList.push(card);
  });
};

const onTrash = (
  action: StateAction,
  currentState: GlobalState
): GlobalState => {
  if (action.card == null) return currentState;
  const card: Card = action.card;
  return produce(currentState, (draft) => {
    _.remove(draft.playState.optionArea.cardList, (v) => v.id === card.id);
    draft.playState.trashArea.cardList.push(card);
  });
};

const onAddToTopOfStack = (
  action: StateAction,
  currentState: GlobalState
): GlobalState => {
  if (action.card == null) {
    return currentState;
  }
  const card: Card = action.card;
  return produce(currentState, (draft) => {
    _.remove(draft.playState.optionArea.cardList, (v) => v.id === card.id);
    draft.playState.stack.cardList = [card, ...draft.playState.stack.cardList];
  });
};
