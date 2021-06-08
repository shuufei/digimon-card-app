import { v4 } from 'uuid';
import { GlobalState, INITIAL_GLOBAL_STATE } from '../../global-state';
import { StateAction } from './dispatch-card-action.service';

export const createStateForWhole = (
  action: StateAction,
  currentState: GlobalState
): GlobalState => {
  switch (action.type) {
    case 'reset':
      return onReset(currentState);
    default:
      return currentState;
  }
};

const onReset = (currentState: GlobalState): GlobalState => {
  const stackCardList = currentState.deck.cardList
    .filter((v) => v.cardtype !== 'デジタマ')
    .map((v) => ({ ...v, id: v4() }));
  const digitamaStackCardList = currentState.deck.cardList
    .filter((v) => v.cardtype === 'デジタマ')
    .map((v) => ({ ...v, id: v4() }));
  return {
    ...currentState,
    playState: {
      ...INITIAL_GLOBAL_STATE.playState,
      stack: {
        ...INITIAL_GLOBAL_STATE.playState.stack,
        cardList: stackCardList,
      },
      digitamaStack: {
        ...INITIAL_GLOBAL_STATE.playState.digitamaStack,
        cardList: digitamaStackCardList,
      },
    },
  };
};
