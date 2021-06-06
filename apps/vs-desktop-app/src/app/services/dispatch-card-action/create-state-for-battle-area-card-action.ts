import * as _ from 'lodash';
import { GlobalState } from '../../global-state';
import { StateAction } from './dispatch-card-action.service';

export const createStateForBattleAreaCardAction = (
  action: StateAction,
  currentState: GlobalState
): GlobalState => {
  switch (action.type) {
    case 'rest':
      return onRest(action, currentState);
    default:
      return currentState;
  }
};

const onRest = (
  action: StateAction,
  currentState: GlobalState
): GlobalState => {
  const index = currentState.battleArea.digimonList.findIndex(
    (v) => v.card.id === action.card?.id
  );
  const digimon = _.cloneDeep(currentState.battleArea.digimonList[index]);
  digimon.rest();
  const battleAreaDigimonList = [...currentState.battleArea.digimonList];
  battleAreaDigimonList.splice(index, 1, digimon);
  return {
    ...currentState,
    battleArea: {
      ...currentState.battleArea,
      digimonList: battleAreaDigimonList,
    },
  };
};
