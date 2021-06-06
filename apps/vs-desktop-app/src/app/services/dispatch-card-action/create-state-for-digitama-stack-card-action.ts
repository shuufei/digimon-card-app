import { produce } from 'immer';
import * as _ from 'lodash';
import { Digimon } from '../../domain/digimon';
import { GlobalState } from '../../global-state';
import { StateAction } from './dispatch-card-action.service';

export const createStateForDigitamaStackCardAction = (
  action: StateAction,
  currentState: GlobalState
): GlobalState => {
  switch (action.type) {
    case 'shuffle':
      return onShuffle(currentState);
    case 'incubation':
      return onIncubation(currentState);
    default:
      return currentState;
  }
};

const onShuffle = (currentState: GlobalState): GlobalState => {
  return produce(currentState, (draft) => {
    draft.playState.digitamaStack.cardList = new Array(5)
      .fill(1)
      .reduce(
        (acc) => _.shuffle(acc),
        currentState.playState.digitamaStack.cardList
      );
  });
};

const onIncubation = (currentState: GlobalState): GlobalState => {
  if (currentState.playState.standbyArea.digimon != null) {
    return currentState;
  }
  const card = currentState.playState.digitamaStack.cardList[0];
  if (card == null) {
    return currentState;
  }
  const digimon = new Digimon(card);
  return produce(currentState, (draft) => {
    draft.playState.digitamaStack.cardList.shift();
    draft.playState.standbyArea.digimon = digimon;
  });
};
