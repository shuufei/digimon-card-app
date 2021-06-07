import { remove } from '@rx-angular/state';
import { produce } from 'immer';
import * as _ from 'lodash';
import { Digimon } from '../../domain/digimon';
import { Tamer } from '../../domain/tamer';
import { GlobalState } from '../../global-state';
import { Card } from '../../types';
import { StateAction } from './dispatch-card-action.service';

export const createStateForHandCardAction = (
  action: StateAction,
  currentState: GlobalState
): GlobalState => {
  switch (action.type) {
    case 'entry':
      return onEntry(action, currentState);
    case 'evolution':
      return onEvolution(action, currentState);
    case 'trash':
      return onTrash(action, currentState);
    case 'addToEvolutionOrigin':
      return onAddToEvolutionOrigin(action, currentState);
    default:
      return currentState;
  }
};

const onEntry = (
  action: StateAction,
  currentState: GlobalState
): GlobalState => {
  if (action.card == null) {
    return currentState;
  }
  const card: Card = action.card;
  const handCardList = [...currentState.playState.hand.cardList];
  _.remove(handCardList, (v) => v.id === card.id);
  const mergedHand: GlobalState = produce(currentState, (draft) => {
    draft.playState.hand.cardList = handCardList;
  });
  switch (action.card.cardtype) {
    case 'デジモン':
      return produce(mergedHand, (draft) => {
        draft.playState.battleArea.digimonList = [
          ...draft.playState.battleArea.digimonList,
          new Digimon(card),
        ];
      });
    case 'オプション':
      return produce(mergedHand, (draft) => {
        draft.playState.optionArea.cardList = [
          ...currentState.playState.optionArea.cardList,
          card,
        ];
      });
    case 'テイマー':
      return produce(mergedHand, (draft) => {
        draft.playState.tamerArea.tamerList = [
          ...currentState.playState.tamerArea.tamerList,
          new Tamer(card),
        ];
      });
    default:
      return mergedHand;
  }
};

const onEvolution = (
  action: StateAction,
  currentState: GlobalState
): GlobalState => {
  if (action.card == null) {
    return currentState;
  }
  const handCardList = [...currentState.playState.hand.cardList];
  _.remove(handCardList, (v) => v.id === action.card?.id);
  const mergedHand: GlobalState = produce(currentState, (draft) => {
    draft.playState.hand.cardList = handCardList;
  });
  switch (action.target?.area) {
    case 'battleArea':
      return evolutionBattleAreaDigimon(action, mergedHand);
    case 'standbyArea':
      return evolutionStandbyAreaDigimon(action, mergedHand);
    default:
      return currentState;
  }
};

const evolutionBattleAreaDigimon = (
  action: StateAction,
  currentState: GlobalState
): GlobalState => {
  if (action.card == null || action.target?.digimon == null) {
    return currentState;
  }
  const evolutionDigimon = new Digimon(action.card, [
    ...action.target.digimon.evolutionOiriginCardList,
    action.target.digimon.card,
  ]);
  const digimonList = [...currentState.playState.battleArea.digimonList];
  const index = digimonList.findIndex(
    (v) => v.id === action.target?.digimon.id
  );
  digimonList.splice(index, 1, evolutionDigimon);
  return produce(currentState, (draft) => {
    draft.playState.battleArea.digimonList = digimonList;
  });
};

const evolutionStandbyAreaDigimon = (
  action: StateAction,
  currentState: GlobalState
): GlobalState => {
  if (action.card == null || action.target?.digimon == null) {
    return currentState;
  }
  const evolutionDigimon = new Digimon(action.card, [
    ...action.target.digimon.evolutionOiriginCardList,
    action.target.digimon.card,
  ]);
  return produce(currentState, (draft) => {
    draft.playState.standbyArea.digimon = evolutionDigimon;
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
    const handCardList = draft.playState.hand.cardList;
    draft.playState.hand.cardList = remove(handCardList, card, 'id');
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
    if (digimon == null) return;
    digimon.addEvolutionOrigin(card, addIndex);
    _.remove(draft.playState.hand.cardList, (v) => v.id === card.id);
  });
};
