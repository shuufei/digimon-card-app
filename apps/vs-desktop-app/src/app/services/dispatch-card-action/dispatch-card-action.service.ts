import { Inject, Injectable } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { Digimon } from '../../domain/digimon';
import {
  GlobalState,
  GLOBAL_RX_STATE,
  serializePlayState,
} from '../../global-state';
import { Area, Card, CardAction } from '../../types';
import { PeerService } from '../peer.service';
import { createStateForBattleAreaCardAction } from './create-state-for-battle-area-card-action';
import { createStateForDigitamaStackCardAction } from './create-state-for-digitama-stack-card-action';
import { createStateForEvolutionOriginCardAction } from './create-state-for-evolution-origin-card-action';
import { createStateForHandCardAction } from './create-state-for-hand-card-action';
import { createStateForOptionAreaCardAction } from './create-state-for-option-area-card-action';
import { createStateForSecurityAreaCardAction } from './create-state-for-security-area-card-action';
import { createStateForSecurityCheckAreaCardAction } from './create-state-for-security-check-area-card-action';
import { createStateForSecurityOpenAreaCardAction } from './create-state-for-security-open-area-card-action';
import { createStateForStackCardAction } from './create-state-for-stack-card-action';
import { createStateForStackOpenAreaCardAction } from './create-state-for-stack-open-area-card-action';
import { createStateForStandbyAreaCardAction } from './create-state-for-standby-area-card-action';
import { createStateForTamerAreaCardAction } from './create-state-for-tamer-area-card-action';
import { createStateForTrashAreaCardAction } from './create-state-for-trash-area-card-action';
import { createStateForWhole } from './create-state-for-whole-action';

@Injectable({
  providedIn: 'root',
})
export class DispatchCardActionService {
  constructor(
    @Inject(GLOBAL_RX_STATE) private readonly globalState: RxState<GlobalState>,
    private peerService: PeerService
  ) {}

  dispatch(action: StateAction): void {
    const state = this.createState(action);
    this.globalState.set({
      ...state,
      ui: {
        ...state.ui,
        modeState: undefined,
      },
    });
    this.peerService.send({
      type: 'playState',
      data: serializePlayState(state.playState),
    });
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
      case 'trashArea':
        return createStateForTrashAreaCardAction(action, currentState);
      case 'tamerArea':
        return createStateForTamerAreaCardAction(action, currentState);
      case 'evolutionOrigin':
        return createStateForEvolutionOriginCardAction(action, currentState);
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
    addIndex?: number; // for AddToEvolutionOrigin
  };
  evolutionOriginCardList?: Card[];
};
