import { Component, Inject, Input, OnInit } from '@angular/core';
import { GLOBAL_RX_STATE, GlobalState } from '../../global-state';
import { Deck } from '../../types';
import { RxState, update } from '@rx-angular/state';
import { FormControl } from '@angular/forms';
import { filter, tap } from 'rxjs/operators';
import { merge } from 'rxjs';

@Component({
  selector: 'digimon-card-app-deck-detail',
  templateUrl: './deck-detail.component.html',
  styleUrls: ['./deck-detail.component.scss'],
})
export class DeckDetailComponent implements OnInit {
  readonly titleForm = new FormControl('');

  private readonly commitDeckTitleHandler$ = this.titleForm.valueChanges.pipe(
    tap((value) => {
      console.log('change: ', value);
      this.globalState.set('deckList', (state) => {
        const selectedDeck = state.deckList.find(
          (v) => v.id === state.selectedDeckId
        );
        console.log(selectedDeck)
        return selectedDeck == null
          ? state.deckList
          : update(
              state.deckList,
              {
                ...selectedDeck,
                title: value,
              },
              (a, b) => a.id === b.id
            );
      });
    })
  );
  private readonly updateTitleFormHandler$ = merge(
    this.globalState.select('selectedDeckId'),
    this.globalState.select('deckList')
  ).pipe(
    tap(() => {
      const selectedDeckId = this.globalState.get('selectedDeckId');
      const deckList = this.globalState.get('deckList');
      const deck = deckList.find(v => v.id === selectedDeckId);
      this.titleForm.setValue(deck?.title ?? '', { emitEvent: false });
    })
  );

  constructor(
    @Inject(GLOBAL_RX_STATE) private globalState: RxState<GlobalState>
  ) {}

  ngOnInit(): void {
    this.globalState.hold(this.commitDeckTitleHandler$);
    this.globalState.hold(this.updateTitleFormHandler$);
  }
}
