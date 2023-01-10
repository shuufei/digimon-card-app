import { produce } from 'immer';
import * as _ from 'lodash';
import { Digimon } from '../../domain/digimon';
import { GlobalState } from '../../global-state';
import { Card } from '../../types';
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
    case 'draw':
      return onDraw(action, currentState);
    case 'addToBottomOfStack':
      return onAddToBottomOfStack(action, currentState);
    case 'trash':
      return onTrash(action, currentState);
    case 'degeneration':
      return onDegeneration(action, currentState);
    case 'addToEvolutionOrigin':
      return onAddToEvolutionOrigin(action, currentState);
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

const onDraw = (
  action: StateAction,
  currentState: GlobalState
): GlobalState => {
  if (action.card == null) return currentState;
  const card = action.card;
  return produce(currentState, (draft) => {
    const digimon = draft.playState.battleArea.digimonList.find(
      (v) => v.card.id === card.id
    );
    _.remove(
      draft.playState.battleArea.digimonList,
      (v) => v.card.id === card.id
    );
    draft.playState.hand.cardList.push(card);
    digimon?.evolutionOiriginCardList.forEach((v) => {
      draft.playState.trashArea.cardList.push(v);
    });
  });
};

const onAddToBottomOfStack = (
  action: StateAction,
  currentState: GlobalState
): GlobalState => {
  if (action.card == null) {
    return currentState;
  }
  const card: Card = action.card;
  return produce(currentState, (draft) => {
    const digimon = draft.playState.battleArea.digimonList.find(
      (v) => v.card.id === card.id
    );
    _.remove(
      draft.playState.battleArea.digimonList,
      (v) => v.card.id === card.id
    );
    draft.playState.stack.cardList.push(card);
    digimon?.evolutionOiriginCardList.forEach((v) => {
      draft.playState.trashArea.cardList.push(v);
    });
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
    const digimon = draft.playState.battleArea.digimonList.find(
      (v) => v.card.id === card.id
    );
    _.remove(
      draft.playState.battleArea.digimonList,
      (v) => v.card.id === card.id
    );
    digimon?.evolutionOiriginCardList.forEach((v) => {
      draft.playState.trashArea.cardList.push(v);
    });
    draft.playState.trashArea.cardList.push(card);
  });
};

const onDegeneration = (
  action: StateAction,
  currentState: GlobalState
): GlobalState => {
  if (action.card == null) {
    return currentState;
  }
  const card: Card = action.card;
  const digimon = currentState.playState.battleArea.digimonList.find(
    (v) => v.card.id === card.id
  );
  if (digimon == null || digimon.evolutionOiriginCardList.length === 0)
    return currentState;
  const evolutionOirignCardList = digimon.evolutionOiriginCardList;
  const degenerationCard = evolutionOirignCardList.pop();
  if (degenerationCard == null) return currentState;
  const degenerationDigimon = new Digimon(
    degenerationCard,
    evolutionOirignCardList
  );
  return produce(currentState, (draft) => {
    const index = draft.playState.battleArea.digimonList.findIndex(
      (v) => v.card.id === card.id
    );
    draft.playState.battleArea.digimonList.splice(
      index,
      1,
      degenerationDigimon
    );
    draft.playState.trashArea.cardList.push(card);
  });
};

const onAddToEvolutionOrigin = (
  action: StateAction,
  currentState: GlobalState
): GlobalState => {
  if (action.digimon == null || action.target?.addIndex == null) {
    return currentState;
  }
  const srcDigimon: Digimon = action.digimon;
  const addIndex: number = action.target.addIndex;
  return produce(currentState, (draft) => {
    const digimon = draft.playState.battleArea.digimonList.find(
      (v) => v.id === action.target?.digimon.id
    );
    if (digimon == null) {
      return;
    }
    digimon.addEvolutionOrigin(srcDigimon.card, addIndex);
    _.reverse(srcDigimon.evolutionOiriginCardList).forEach((card) => {
      digimon.addEvolutionOrigin(card, addIndex);
    });
    _.remove(
      draft.playState.battleArea.digimonList,
      (v) => v.id === srcDigimon.id
    );
  });
};
