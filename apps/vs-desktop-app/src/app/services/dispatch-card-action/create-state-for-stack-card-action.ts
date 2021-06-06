import { produce } from 'immer';
import * as _ from 'lodash';
import { GlobalState } from '../../global-state';
import { StateAction } from './dispatch-card-action.service';

export const createStateForStackCardAction = (
  action: StateAction,
  currentState: GlobalState
): GlobalState => {
  switch (action.type) {
    case 'draw':
      return onDraw(currentState);
    case 'shuffle':
      return onShuffle(currentState);
    case 'recovery':
      return onRecovery(currentState);
    default:
      return currentState;
  }
};

const onDraw = (currentState: GlobalState): GlobalState => {
  const stackCardList = [...currentState.playState.stack.cardList];
  const handCardList = [...currentState.playState.hand.cardList];
  const drawCard = stackCardList.shift();
  if (drawCard != null) {
    handCardList.push(drawCard);
  }
  return produce(currentState, (draft) => {
    draft.playState.stack.cardList = stackCardList;
    draft.playState.hand.cardList = handCardList;
  });
};

const onShuffle = (currentState: GlobalState): GlobalState => {
  return produce(currentState, (draft) => {
    draft.playState.stack.cardList = _.shuffle(
      currentState.playState.stack.cardList
    );
  });
};

const onRecovery = (currentState: GlobalState): GlobalState => {
  return produce(currentState, (draft) => {
    const card = draft.playState.stack.cardList.shift();
    if (card != null) {
      draft.playState.securityArea.cardList.push(card);
    }
  });
};
