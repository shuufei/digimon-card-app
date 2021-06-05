import { GlobalState, INITIAL_GLOBAL_STATE } from '../../global-state';
import { StateAction } from './dispatch-card-action.service';

export const createStateForWhole = (
  action: StateAction,
  currentState: GlobalState
): GlobalState => {
  switch (action.type) {
    case 'reset':
      return onReset();
    default:
      return currentState;
  }
};

const onReset = (): GlobalState => {
  return INITIAL_GLOBAL_STATE;
};
