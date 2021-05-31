import { Component, Inject, OnInit } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { Subject } from 'rxjs';
import { v4 } from 'uuid';
import { GLOBAL_RX_STATE, GlobalState } from '../../global-state';
import { Deck } from '../../types';

type State = Record<string, never>;
@Component({
  selector: 'digimon-card-app-deck-panel',
  templateUrl: './deck-panel.component.html',
  styleUrls: ['./deck-panel.component.scss'],
  providers: [RxState],
})
export class DeckPanelComponent implements OnInit {
  readonly globalState$ = this.globalState.select();

  readonly onClickedCreateNewDeckBtn$ = new Subject<void>();
  readonly onClickedBackBtn$ = new Subject<void>();
  readonly onClickedDeckItem$ = new Subject<Deck['id']>();

  constructor(
    private readonly state: RxState<State>,
    @Inject(GLOBAL_RX_STATE) private globalState: RxState<GlobalState>
  ) {}

  ngOnInit(): void {
    this.globalState.connect(this.onClickedCreateNewDeckBtn$, (state) => {
      const deck = this.createNewDeck();
      return {
        ...state,
        deckList: [...state.deckList, deck],
        selectedDeckId: deck.id,
      };
    });
    this.globalState.connect(this.onClickedBackBtn$, (state) => ({
      ...state,
      selectedDeckId: undefined,
    }));
    this.globalState.connect('selectedDeckId', this.onClickedDeckItem$, (_, deckId) => deckId);
  }

  private createNewDeck(): Deck {
    return {
      id: v4(),
      title: '',
      cardList: [],
    };
  }
}
