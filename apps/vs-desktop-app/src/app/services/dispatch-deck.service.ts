import { Inject, Injectable } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { v4 } from 'uuid';
import { GlobalState, GLOBAL_RX_STATE } from '../global-state';
import { CardInfo } from '../types';

@Injectable({
  providedIn: 'root',
})
export class DispatchDeckService {
  constructor(
    @Inject(GLOBAL_RX_STATE) private readonly globalState: RxState<GlobalState>
  ) {}

  dispatch(cardList: CardInfo[]): void {
    this.globalState.set('deck', () => {
      return {
        cardList: cardList.map((v) => ({
          ...v,
          id: v4(),
        })),
      };
    });
  }
}
