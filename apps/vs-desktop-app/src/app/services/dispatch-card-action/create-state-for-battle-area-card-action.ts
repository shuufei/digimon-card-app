import { produce } from 'immer';
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
    case 'active':
      return onActive(action, currentState);
    default:
      return currentState;
  }
};

const onRest = (
  action: StateAction,
  currentState: GlobalState
): GlobalState => {
  const index = currentState.playState.battleArea.digimonList.findIndex(
    (v) => v.card.id === action.card?.id
  );
  const digimon = _.cloneDeep(
    currentState.playState.battleArea.digimonList[index]
  );
  digimon.rest();
  const battleAreaDigimonList = [
    ...currentState.playState.battleArea.digimonList,
  ];
  battleAreaDigimonList.splice(index, 1, digimon);
  return produce(currentState, (draft) => {
    draft.playState.battleArea.digimonList = battleAreaDigimonList;
  });
};

const onActive = (
  action: StateAction,
  currentState: GlobalState
): GlobalState => {
  const index = currentState.playState.battleArea.digimonList.findIndex(
    (v) => v.card.id === action.card?.id
  );
  const digimon = _.cloneDeep(
    currentState.playState.battleArea.digimonList[index]
  );
  digimon.active();
  const battleAreaDigimonList = [
    ...currentState.playState.battleArea.digimonList,
  ];
  battleAreaDigimonList.splice(index, 1, digimon);
  return produce(currentState, (draft) => {
    draft.playState.battleArea.digimonList = battleAreaDigimonList;
  });
};
