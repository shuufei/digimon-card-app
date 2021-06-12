import { Inject, Injectable } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { GlobalState, GLOBAL_RX_STATE } from '../global-state';
import { MemoryCount, Side } from '../types';
import { PeerService } from './peer.service';

@Injectable({
  providedIn: 'root',
})
export class DispatchMemoryService {
  constructor(
    @Inject(GLOBAL_RX_STATE) private globalState: RxState<GlobalState>,
    private peerService: PeerService
  ) {}

  dispatch(side: Side, count: MemoryCount): void {
    const memory: GlobalState['memory'] = {
      side,
      count,
    };
    this.globalState.set('memory', () => {
      return memory;
    });
    this.peerService.send({
      type: 'memory',
      data: memory,
    });
  }
}
