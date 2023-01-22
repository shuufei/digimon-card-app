import { produce } from 'immer';
import * as _ from 'lodash';
import { Digimon } from '../../domain/digimon';
import { GlobalState } from '../../global-state';
import { Card } from '../../types';
import { StateAction } from './dispatch-card-action.service';

export const createStateForTrashAreaCardAction = (
  action: StateAction,
  currentState: GlobalState
): GlobalState => {
  switch (action.type) {
    case 'draw':
      return onDraw(action, currentState);
    case 'entry':
      return onEntry(action, currentState);
    case 'addToEvolutionOrigin':
      return onAddToEvolutionOrigin(action, currentState);
    case 'recovery':
      return onRecovery(action, currentState);
    default:
      return currentState;
  }
};

const onRecovery = (
  action: StateAction,
  currentState: GlobalState
): GlobalState => {
  return produce(currentState, (draft) => {
    const card = action.card;
    if (card != null) {
      _.remove(draft.playState.trashArea.cardList, (v) => v.id === card.id);
      draft.playState.securityArea.cardList = [
        card,
        ...draft.playState.securityArea.cardList,
      ];
    }
  });
};

const onDraw = (
  action: StateAction,
  currentState: GlobalState
): GlobalState => {
  if (action.card == null) return currentState;
  const card = action.card;
  return produce(currentState, (draft) => {
    _.remove(draft.playState.trashArea.cardList, (v) => v.id === card.id);
    draft.playState.hand.cardList.push(card);
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
  const state: GlobalState = produce(currentState, (draft) => {
    _.remove(draft.playState.trashArea.cardList, (v) => v.id === card.id);
  });
  const digimon = new Digimon(card);
  const tamer = new Digimon(card);
  switch (action.card.cardtype) {
    case 'デジモン':
      return produce(state, (draft) => {
        draft.playState.battleArea.digimonList = [
          ...draft.playState.battleArea.digimonList,
          digimon,
        ];
      });
    case 'オプション':
      return produce(state, (draft) => {
        draft.playState.optionArea.cardList = [
          ...currentState.playState.optionArea.cardList,
          card,
        ];
      });
    case 'テイマー':
      return produce(state, (draft) => {
        draft.playState.tamerArea.tamerList = [
          ...currentState.playState.tamerArea.tamerList,
          tamer,
        ];
      });
    default:
      return state;
  }
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
    if (digimon == null) return;
    digimon.addEvolutionOrigin(card, addIndex);
    _.remove(draft.playState.trashArea.cardList, (v) => v.id === card.id);
  });
};
