import { produce } from 'immer';
import * as _ from 'lodash';
import { GlobalState } from '../../global-state';
import { Card } from '../../types';
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
    case 'open':
      return onOpen(currentState);
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

const shuffle = (cardList: Card[]) => {
  const splitedStack = cardList.reduce((acc, curr, index) => {
    const tmpStackIndex = (index / 10).toFixed(1).toString().slice(-1);
    acc[tmpStackIndex] =
      acc[tmpStackIndex] == null ? [curr] : [...acc[tmpStackIndex], curr];
    return acc;
  }, {} as Record<string, Card[]>);
  const stackCardList = Object.keys(splitedStack).reduce((acc, curr) => {
    return [...acc, ...splitedStack[curr]];
  }, [] as Card[]);
  return stackCardList;
};

const onShuffle = (currentState: GlobalState): GlobalState => {
  return produce(currentState, (draft) => {
    draft.playState.stack.cardList = new Array(5)
      .fill(1)
      .reduce(
        (acc) => shuffle(acc),
        _.shuffle(currentState.playState.stack.cardList)
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

const onOpen = (currentState: GlobalState): GlobalState => {
  return produce(currentState, (draft) => {
    const card = draft.playState.stack.cardList.shift();
    if (card != null) {
      draft.playState.stackOpenArea.cardList.push(card);
    }
  });
};
