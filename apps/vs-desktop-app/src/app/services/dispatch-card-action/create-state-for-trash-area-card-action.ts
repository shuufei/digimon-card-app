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
    default:
      return currentState;
  }
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
        draft.playState.tamerArea.cardList = [
          ...currentState.playState.tamerArea.cardList,
          card,
        ];
      });
    default:
      return state;
  }
};
