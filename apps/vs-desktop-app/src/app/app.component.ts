import { Component, OnInit } from '@angular/core';
import { RxState } from '@rx-angular/state';
import * as _ from 'lodash';
import { Subject } from 'rxjs';
import { tag } from 'rxjs-spy/operators/tag';
import { deck } from './deck';
import { CardInfo } from './types';

type State = {
  stack: CardInfo[];
  digitamaStack: CardInfo[];
  hand: CardInfo[];
};

const INITIAL_STATE = {
  stack: deck.filter((v) => v.cardtype !== 'デジタマ'),
  digitamaStack: deck.filter((v) => v.cardtype === 'デジタマ'),
  hand: [],
};
@Component({
  selector: 'digimon-card-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [RxState],
})
export class AppComponent implements OnInit {
  title = 'vs-desktop-app';

  readonly state$ = this.state.select().pipe(tag('state'));

  /**
   * Events
   */
  readonly onStackShuffle$ = new Subject();
  readonly onDraw$ = new Subject();
  readonly onReset$ = new Subject();

  constructor(private readonly state: RxState<State>) {
    this.state.set(INITIAL_STATE);
  }

  ngOnInit() {
    this.state.connect('stack', this.onStackShuffle$, (state) => {
      return _.shuffle(state.stack);
    });
    this.state.connect(this.onDraw$, (state) => {
      const stack = [...state.stack];
      const hand = [...state.hand];
      const drawCard = stack.shift();
      if (drawCard != null) {
        hand.push(drawCard);
      }
      return {
        ...state,
        stack,
        hand,
      };
    });
    this.state.connect(this.onReset$, () => INITIAL_STATE);
  }
}
