import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Peer, { DataConnection } from 'skyway-js';

@Injectable({
  providedIn: 'root',
})
export class PeerService {
  readonly peer = new Peer({
    key: '',
    debug: 3,
  });

  peerId$ = new BehaviorSubject<string | undefined>(undefined);
  dataConnection?: DataConnection;

  constructor() {
    this.peer.on('open', () => {
      console.log('open: ', this.peer.id);
      this.peerId$.next(this.peer.id);
    });
    this.listenConnection();
  }

  private listenConnection() {
    this.peer.on('connection', (dataConnection) => {
      this.dataConnection = dataConnection;
      this.dataConnection.once('open', () => {
        console.log('---- connection open');
      });
      this.dataConnection.on('data', (data) => {
        console.log('[Recieved Message] ', data);
      });
    });
  }

  connect(remotePeerId: string) {
    this.dataConnection = this.peer.connect(remotePeerId);
    this.dataConnection.once('open', () => {
      console.log('---- connection open');
    });
    this.dataConnection.on('data', (data) => {
      console.log('[Recieved Message] ', data);
    });
  }

  send(message: Record<string, unknown>) {
    if (this.dataConnection == null) return;
    this.dataConnection.send(message);
  }
}
