import { Inject, Injectable } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { GlobalState, GLOBAL_RX_STATE } from '../global-state';
import { MemoryCount, Side } from '../types';

@Injectable({
  providedIn: 'root',
})
export class DispatchMemoryService {
  constructor(
    @Inject(GLOBAL_RX_STATE) private globalState: RxState<GlobalState>
  ) {}

  dispatch(side: Side, count: MemoryCount): void {
    this.globalState.set('memory', () => {
      return {
        side,
        count,
      };
    });
  }
}
