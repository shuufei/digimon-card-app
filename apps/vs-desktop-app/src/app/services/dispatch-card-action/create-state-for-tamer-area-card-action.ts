import { produce } from 'immer';
import * as _ from 'lodash';
import { Digimon } from '../../domain/digimon';
import { GlobalState } from '../../global-state';
import { Card } from '../../types';
import { StateAction } from './dispatch-card-action.service';

export const createStateForTamerAreaCardAction = (
  action: StateAction,
  currentState: GlobalState
): GlobalState => {
  switch (action.type) {
    case 'rest':
      return onRest(action, currentState);
    case 'active':
      return onActive(action, currentState);
    case 'trash':
      return onTrash(action, currentState);
    case 'entry':
      return onEntry(action, currentState);
    default:
      return currentState;
  }
};

const onRest = (
  action: StateAction,
  currentState: GlobalState
): GlobalState => {
  if (action.card == null) return currentState;
  const card: Card = action.card;
  return produce(currentState, (draft) => {
    const tamer = draft.playState.tamerArea.tamerList.find(
      (v) => v.card.id === card.id
    );
    tamer?.rest();
  });
};

const onActive = (
  action: StateAction,
  currentState: GlobalState
): GlobalState => {
  if (action.card == null) return currentState;
  const card: Card = action.card;
  return produce(currentState, (draft) => {
    const tamer = draft.playState.tamerArea.tamerList.find(
      (v) => v.card.id === card.id
    );
    tamer?.active();
  });
};

const onTrash = (
  action: StateAction,
  currentState: GlobalState
): GlobalState => {
  if (action.card == null) {
    return currentState;
  }
  const card: Card = action.card;
  return produce(currentState, (draft) => {
    _.remove(draft.playState.tamerArea.tamerList, (v) => v.card.id === card.id);
    draft.playState.trashArea.cardList.push(card);
  });
};

const onEntry = (
  action: StateAction,
  currentState: GlobalState
): GlobalState => {
  if (action.card == null) {
    return currentState;
  }
  const card: Card = action.card;
  return produce(currentState, (draft) => {
    _.remove(draft.playState.tamerArea.tamerList, (v) => v.card.id === card.id);
    draft.playState.battleArea.digimonList.push(new Digimon(card));
  });
};
