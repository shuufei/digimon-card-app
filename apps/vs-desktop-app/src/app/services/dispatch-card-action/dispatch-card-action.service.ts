import { Inject, Injectable } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { GlobalState, GLOBAL_RX_STATE } from '../../global-state';
import { Area, CardAction, CardInfo } from '../../types';
import { createStateForHandCardAction } from './create-state-for-hand-card-action';

@Injectable({
  providedIn: 'root',
})
export class DispatchCardActionService {
  constructor(
    @Inject(GLOBAL_RX_STATE) private readonly globalState: RxState<GlobalState>
  ) {}

  dispatch(action: Action): void {
    const state = this.createState(action);
    this.globalState.set(state);
  }

  private createState(action: Action): GlobalState {
    switch (action.area) {
      case 'hand':
        return createStateForHandCardAction(action, this.globalState.get());
      default:
        return this.globalState.get();
    }
  }
}

export type Action = {
  type: CardAction;
  card: CardInfo;
  area: Area;
};
