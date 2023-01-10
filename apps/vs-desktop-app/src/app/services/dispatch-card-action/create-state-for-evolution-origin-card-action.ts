import { produce } from 'immer';
import { GlobalState } from '../../global-state';
import { StateAction } from './dispatch-card-action.service';

export const createStateForEvolutionOriginCardAction = (
  action: StateAction,
  currentState: GlobalState
): GlobalState => {
  switch (action.type) {
    case 'draw':
      return onDraw(action, currentState);
    case 'trash':
      return onTrash(action, currentState);
    case 'save':
      return onSave(action, currentState);
    default:
      return currentState;
  }
};

const onDraw = (
  action: StateAction,
  currentState: GlobalState
): GlobalState => {
  if (action.card == null) {
    return currentState;
  }
  const card = action.card;
  return produce(currentState, (draft) => {
    const digimon = draft.playState.battleArea.digimonList.find(
      (d) => !!d.evolutionOiriginCardList.find((v) => v.id === card.id)
    );
    digimon?.removeEvolutionOrigin(card.id);
    draft.playState.hand.cardList.push(card);
  });
};

const onTrash = (
  action: StateAction,
  currentState: GlobalState
): GlobalState => {
  if (action.card == null) {
    return currentState;
  }
  const card = action.card;
  return produce(currentState, (draft) => {
    const digimon = draft.playState.battleArea.digimonList.find(
      (d) => !!d.evolutionOiriginCardList.find((v) => v.id === card.id)
    );
    digimon?.removeEvolutionOrigin(card.id);
    draft.playState.trashArea.cardList.push(card);
  });
};

const onSave = (
  action: StateAction,
  currentState: GlobalState
): GlobalState => {
  if (action.card == null) {
    return currentState;
  }
  const card = action.card;
  return produce(currentState, (draft) => {
    const digimon = draft.playState.battleArea.digimonList.find(
      (d) => !!d.evolutionOiriginCardList.find((v) => v.id === card.id)
    );
    digimon?.removeEvolutionOrigin(card.id);
    draft.playState.saveArea.cardList.push(card);
  });
};
