import { Inject, Injectable } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { Digimon } from '../../domain/digimon';
import { GlobalState, GLOBAL_RX_STATE } from '../../global-state';
import { Area, Card, CardAction } from '../../types';
import { createStateForBattleAreaCardAction } from './create-state-for-battle-area-card-action';
import { createStateForHandCardAction } from './create-state-for-hand-card-action';
import { createStateForStackCardAction } from './create-state-for-stack-card-action';
import { createStateForWhole } from './create-state-for-whole-action';

@Injectable({
  providedIn: 'root',
})
export class DispatchCardActionService {
  constructor(
    @Inject(GLOBAL_RX_STATE) private readonly globalState: RxState<GlobalState>
  ) {}

  dispatch(action: StateAction): void {
    const state = this.createState(action);
    this.globalState.set(state);
  }

  private createState(action: StateAction): GlobalState {
    const currentState = this.globalState.get();
    switch (action.area) {
      case 'hand':
        return createStateForHandCardAction(action, currentState);
      case 'stack':
        return createStateForStackCardAction(action, currentState);
      case 'whole':
        return createStateForWhole(action, currentState);
      case 'battleArea':
        return createStateForBattleAreaCardAction(action, currentState);
      default:
        return this.globalState.get();
    }
  }
}

export type StateAction = {
  type: CardAction;
  area: Area;
  card?: Card;
  target?: {
    area: Area;
    digimon: Digimon;
  };
};
