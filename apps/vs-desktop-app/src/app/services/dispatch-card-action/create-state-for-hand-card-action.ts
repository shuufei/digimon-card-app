import { remove } from '@rx-angular/state';
import { produce } from 'immer';
import * as _ from 'lodash';
import { Digimon } from '../../domain/digimon';
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
  const handCardList = [...currentState.playState.hand.cardList];
  _.remove(handCardList, (v) => v.id === action.card?.id);
  const mergedHand: GlobalState = {
    ...currentState,
    playState: {
      ...currentState.playState,
      hand: {
        ...currentState.playState.hand,
        cardList: handCardList,
      },
    },
  };
  switch (action.card.cardtype) {
    case 'デジモン':
      return {
        ...mergedHand,
        playState: {
          ...mergedHand.playState,
          battleArea: {
            ...currentState.playState.battleArea,
            digimonList: [
              ...currentState.playState.battleArea.digimonList,
              new Digimon(action.card),
            ],
          },
        },
      };
    case 'オプション':
      return {
        ...mergedHand,
        playState: {
          ...mergedHand.playState,
          optionArea: {
            ...currentState.playState.optionArea,
            cardList: [
              ...currentState.playState.optionArea.cardList,
              action.card,
            ],
          },
        },
      };
    case 'テイマー':
      return {
        ...mergedHand,
        playState: {
          ...mergedHand.playState,
          tamerArea: {
            ...currentState.playState.tamerArea,
            cardList: [
              ...currentState.playState.tamerArea.cardList,
              action.card,
            ],
          },
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
  const handCardList = [...currentState.playState.hand.cardList];
  _.remove(handCardList, (v) => v.id === action.card?.id);
  const mergedHand: GlobalState = {
    ...currentState,
    playState: {
      ...currentState.playState,
      hand: {
        ...currentState.playState.hand,
        cardList: handCardList,
      },
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
  const digimonList = [...currentState.playState.battleArea.digimonList];
  const index = digimonList.findIndex(
    (v) => v.id === action.target?.digimon.id
  );
  digimonList.splice(index, 1, evolutionDigimon);
  return {
    ...currentState,
    playState: {
      ...currentState.playState,
      battleArea: {
        digimonList,
      },
    },
  };
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
