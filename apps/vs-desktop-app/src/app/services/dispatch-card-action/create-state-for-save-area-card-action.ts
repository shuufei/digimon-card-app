import { remove } from '@rx-angular/state';
import { produce } from 'immer';
import * as _ from 'lodash';
import { GlobalState } from '../../global-state';
import { Card } from '../../types';
import { StateAction } from './dispatch-card-action.service';

export const createStateForSaveAreaCardAction = (
  action: StateAction,
  currentState: GlobalState
): GlobalState => {
  switch (action.type) {
    case 'trash':
      return onTrash(action, currentState);
    case 'addToEvolutionOrigin':
      return onAddToEvolutionOrigin(action, currentState);
    default:
      return currentState;
  }
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
    const cardList = draft.playState.saveArea.cardList;
    draft.playState.saveArea.cardList = remove(cardList, card, 'id');
    draft.playState.trashArea.cardList.push(card);
  });
};

const onAddToEvolutionOrigin = (
  action: StateAction,
  currentState: GlobalState
): GlobalState => {
  if (action.card == null || action.target?.addIndex == null) {
    return currentState;
  }
  const card: Card = action.card;
  const addIndex: number = action.target.addIndex;
  return produce(currentState, (draft) => {
    const digimon = draft.playState.battleArea.digimonList.find(
      (v) => v.id === action.target?.digimon.id
    );
    if (digimon == null) {
      return;
    }
    digimon.addEvolutionOrigin(card, addIndex);
    _.remove(draft.playState.saveArea.cardList, (v) => v.id === card.id);
  });
};
