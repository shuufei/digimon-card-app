import { produce } from 'immer';
import * as _ from 'lodash';
import { GlobalState } from '../../global-state';
import { StateAction } from './dispatch-card-action.service';

export const createStateForSecurityAreaCardAction = (
  action: StateAction,
  currentState: GlobalState
): GlobalState => {
  switch (action.type) {
    case 'selfCheck':
      return onSelfCheck(currentState);
    case 'shuffle':
      return onShuffle(currentState);
    case 'open':
      return onOpen(currentState);
    default:
      return currentState;
  }
};

const onSelfCheck = (currentState: GlobalState): GlobalState => {
  return produce(currentState, (draft) => {
    draft.playState.securityCheckArea.cardList =
      draft.playState.securityArea.cardList;
    draft.playState.securityArea.cardList = [];
  });
};

const onShuffle = (currentState: GlobalState): GlobalState => {
  return produce(currentState, (draft) => {
    draft.playState.securityArea.cardList = new Array(5)
      .fill(1)
      .reduce(
        (acc) => _.shuffle(acc),
        currentState.playState.securityArea.cardList
      );
  });
};

const onOpen = (currentState: GlobalState): GlobalState => {
  return produce(currentState, (draft) => {
    const card = draft.playState.securityArea.cardList.shift();
    if (card != null) {
      draft.playState.securityOpenArea.cardList.push(card);
    }
  });
};
