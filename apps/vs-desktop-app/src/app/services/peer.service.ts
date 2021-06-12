import { ApplicationRef, Inject, Injectable } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { BehaviorSubject } from 'rxjs';
import Peer, { DataConnection } from 'skyway-js';
import {
  deserializePlayState,
  GlobalState,
  GLOBAL_RX_STATE,
  SerializedPlayState,
} from '../global-state';
import { Side } from '../types';

@Injectable({
  providedIn: 'root',
})
export class PeerService {
  readonly peer = new Peer({
    key: '',
    debug: 3,
  });

  readonly peerId$ = new BehaviorSubject<string | undefined>(undefined);
  readonly isConnected$ = new BehaviorSubject<boolean>(false);
  dataConnection?: DataConnection;

  constructor(
    @Inject(GLOBAL_RX_STATE) private globalState: RxState<GlobalState>,
    private appRef: ApplicationRef
  ) {
    this.peer.on('open', () => {
      console.log('open: ', this.peer.id);
      this.peerId$.next(this.peer.id);
      this.appRef.tick();
    });
    this.listenConnection();
  }

  private listenConnection() {
    this.peer.on('connection', (dataConnection) => {
      this.dataConnection = dataConnection;
      this.dataConnection.once('open', () => {
        console.log('---- connection open');
        this.isConnected$.next(true);
        this.appRef.tick();
      });
      this.dataConnection.on('data', (event: PeerEvent) => {
        console.log('[Recieved Message] ', event);
        this.onReceivedPeerEvent(event);
      });
      this.dataConnection.once('close', () => {
        this.isConnected$.next(false);
        this.appRef.tick();
      });
      this.dataConnection.once('error', () => {
        this.isConnected$.next(false);
        this.appRef.tick();
      });
    });
  }

  connect(remotePeerId: string) {
    this.dataConnection = this.peer.connect(remotePeerId);
    this.dataConnection.once('open', () => {
      console.log('---- connection open');
      this.isConnected$.next(true);
      this.appRef.tick();
    });
    this.dataConnection.on('data', (event) => {
      console.log('[Recieved Message] ', event);
      this.onReceivedPeerEvent(event);
    });
    this.dataConnection.once('close', () => {
      this.isConnected$.next(false);
      this.appRef.tick();
    });
    this.dataConnection.once('error', () => {
      this.isConnected$.next(false);
      this.appRef.tick();
    });
  }

  send(event: PeerEvent) {
    if (this.dataConnection == null) return;
    console.log('send: ', event);
    this.dataConnection.send(event);
  }

  private onReceivedPeerEvent(event: PeerEvent) {
    switch (event.type) {
      case 'memory':
        this.dispatchMemory(event.data);
        return;
      case 'playState':
        this.dispatchOtherPlayState(event.data);
        return;
      default:
        break;
    }
  }

  private reverseMemorySide(side: Side): Side {
    switch (side) {
      case 'other':
        return 'self';
      case 'self':
        return 'other';
      default:
        return side;
    }
  }

  private dispatchMemory(data: MemoryPeerEvent['data']): void {
    this.globalState.set('memory', () => {
      return {
        ...data,
        side: this.reverseMemorySide(data.side),
      };
    });
    this.appRef.tick();
  }

  private dispatchOtherPlayState(data: PlayStatePeerEvent['data']): void {
    const deserializedPlayState = deserializePlayState(data);
    this.globalState.set('otherSidePlayState', () => deserializedPlayState);
    this.appRef.tick();
  }
}

export type PlayStatePeerEvent = {
  type: 'playState';
  data: SerializedPlayState;
};

export type MemoryPeerEvent = {
  type: 'memory';
  data: GlobalState['memory'];
};

export type PeerEvent = PlayStatePeerEvent | MemoryPeerEvent;
