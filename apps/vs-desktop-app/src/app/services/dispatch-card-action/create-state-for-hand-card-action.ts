import * as _ from 'lodash';
import { Digimon } from '../../domain/digimon';
import { GlobalState } from '../../global-state';
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
  const handCardList = [...currentState.hand.cardList];
  _.remove(handCardList, (v) => v.id === action.card?.id);
  const mergedHand: GlobalState = {
    ...currentState,
    hand: {
      ...currentState.hand,
      cardList: handCardList,
    },
  };
  switch (action.card.cardtype) {
    case 'デジモン':
      return {
        ...mergedHand,
        battleArea: {
          ...currentState.battleArea,
          digimonList: [
            ...currentState.battleArea.digimonList,
            new Digimon(action.card),
          ],
        },
      };
    case 'オプション':
      return {
        ...mergedHand,
        optionArea: {
          ...currentState.optionArea,
          cardList: [...currentState.optionArea.cardList, action.card],
        },
      };
    case 'テイマー':
      return {
        ...mergedHand,
        tamerArea: {
          ...currentState.tamerArea,
          cardList: [...currentState.tamerArea.cardList, action.card],
        },
      };
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
  const handCardList = [...currentState.hand.cardList];
  _.remove(handCardList, (v) => v.id === action.card?.id);
  const mergedHand: GlobalState = {
    ...currentState,
    hand: {
      ...currentState.hand,
      cardList: handCardList,
    },
  };
  switch (action.target?.area) {
    case 'battleArea':
      return evolutionBattleAreaDigimon(action, mergedHand);
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
  const digimonList = [...currentState.battleArea.digimonList];
  const index = digimonList.findIndex(
    (v) => v.id === action.target?.digimon.id
  );
  digimonList.splice(index, 1, evolutionDigimon);
  return {
    ...currentState,
    battleArea: {
      digimonList,
    },
  };
};
