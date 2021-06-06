import { Inject, Injectable } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { Digimon } from '../../domain/digimon';
import { GlobalState, GLOBAL_RX_STATE } from '../../global-state';
import { Area, Card, CardAction } from '../../types';
import { createStateForBattleAreaCardAction } from './create-state-for-battle-area-card-action';
import { createStateForDigitamaStackCardAction } from './create-state-for-digitama-stack-card-action';
import { createStateForHandCardAction } from './create-state-for-hand-card-action';
import { createStateForOptionAreaCardAction } from './create-state-for-option-area-card-action';
import { createStateForSecurityAreaCardAction } from './create-state-for-security-area-card-action';
import { createStateForSecurityCheckAreaCardAction } from './create-state-for-security-check-area-card-action';
import { createStateForSecurityOpenAreaCardAction } from './create-state-for-security-open-area-card-action';
import { createStateForStackCardAction } from './create-state-for-stack-card-action';
import { createStateForStackOpenAreaCardAction } from './create-state-for-stack-open-area-card-action';
import { createStateForStandbyAreaCardAction } from './create-state-for-standby-area-card-action';
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
      case 'digitamaStack':
        return createStateForDigitamaStackCardAction(action, currentState);
      case 'standbyArea':
        return createStateForStandbyAreaCardAction(action, currentState);
      case 'stackOpenArea':
        return createStateForStackOpenAreaCardAction(action, currentState);
      case 'securityArea':
        return createStateForSecurityAreaCardAction(action, currentState);
      case 'securityOpenArea':
        return createStateForSecurityOpenAreaCardAction(action, currentState);
      case 'securityCheckArea':
        return createStateForSecurityCheckAreaCardAction(action, currentState);
      case 'optionArea':
        return createStateForOptionAreaCardAction(action, currentState);
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
  evolutionOriginCardList?: Card[];
};
