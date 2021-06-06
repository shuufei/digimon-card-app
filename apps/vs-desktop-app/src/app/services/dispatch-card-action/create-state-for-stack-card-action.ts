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
  const stackCardList = [...currentState.playState.stack.cardList];
  const handCardList = [...currentState.playState.hand.cardList];
  const drawCard = stackCardList.shift();
  if (drawCard != null) {
    handCardList.push(drawCard);
  }
  return {
    ...currentState,
    playState: {
      ...currentState.playState,
      stack: {
        ...currentState.playState.stack,
        cardList: stackCardList,
      },
      hand: {
        ...currentState.playState.hand,
        cardList: handCardList,
      },
    },
  };
};

const onShuffle = (currentState: GlobalState): GlobalState => {
  return {
    ...currentState,
    playState: {
      ...currentState.playState,
      stack: {
        ...currentState.playState.stack,
        cardList: _.shuffle(currentState.playState.stack.cardList),
      },
    },
  };
};
