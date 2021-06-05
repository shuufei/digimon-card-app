import * as _ from 'lodash';
import { GlobalState } from '../../global-state';
import { CardInfo } from '../../types';
import { Action } from './dispatch-card-action.service';

export const createStateForHandCardAction = (
  action: Action,
  currentState: GlobalState
): GlobalState => {
  switch (action.type) {
    case 'entryOnBattleArea':
      return onEntry(action.card, currentState);
    default:
      return currentState;
  }
};

const onEntry = (card: CardInfo, currentState: GlobalState): GlobalState => {
  const handCardList = [...currentState.hand.cardList];
  _.remove(handCardList, (v) => v.imgFileName === card.imgFileName);
  const mergedHand: GlobalState = {
    ...currentState,
    hand: {
      ...currentState.hand,
      cardList: handCardList,
    },
  };
  switch (card.cardtype) {
    case 'デジモン':
      return {
        ...mergedHand,
        battleArea: {
          ...currentState.battleArea,
          cardList: [...currentState.battleArea.cardList, card],
        },
      };
    case 'オプション':
      return {
        ...mergedHand,
        optionArea: {
          ...currentState.optionArea,
          cardList: [...currentState.optionArea.cardList, card],
        },
      };
    case 'テイマー':
      return {
        ...mergedHand,
        tamerArea: {
          ...currentState.tamerArea,
          cardList: [...currentState.tamerArea.cardList, card],
        },
      };
    default:
      return mergedHand;
  }
};
