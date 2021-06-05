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
    default:
      return currentState;
  }
};

const onDraw = (currentState: GlobalState): GlobalState => {
  const stackCardList = [...currentState.stack.cardList];
  const handCardList = [...currentState.hand.cardList];
  const drawCard = stackCardList.shift();
  if (drawCard != null) {
    handCardList.push(drawCard);
  }
  return {
    ...currentState,
    stack: {
      ...currentState.stack,
      cardList: stackCardList,
    },
    hand: {
      ...currentState.hand,
      cardList: handCardList,
    },
  };
};

const onShuffle = (currentState: GlobalState): GlobalState => {
  return {
    ...currentState,
    stack: {
      ...currentState.stack,
      cardList: _.shuffle(currentState.stack.cardList),
    },
  };
};
