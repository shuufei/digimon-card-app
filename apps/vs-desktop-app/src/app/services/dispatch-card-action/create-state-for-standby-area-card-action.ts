import { produce } from 'immer';
import { Digimon } from '../../domain/digimon';
import { GlobalState } from '../../global-state';
import { StateAction } from './dispatch-card-action.service';

export const createStateForStandbyAreaCardAction = (
  action: StateAction,
  currentState: GlobalState
): GlobalState => {
  switch (action.type) {
    case 'entry':
      return onEntry(action, currentState);
    default:
      return currentState;
  }
};

const onEntry = (
  action: StateAction,
  currentState: GlobalState
): GlobalState => {
  if (action.card == null) return currentState;
  const digimon = new Digimon(action.card);
  return produce(currentState, (draft) => {
    draft.playState.standbyArea.digimon = undefined;
    draft.playState.battleArea.digimonList.push(digimon);
  });
};
