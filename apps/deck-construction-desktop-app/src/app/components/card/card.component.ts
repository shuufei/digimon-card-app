import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { GLOBAL_RX_STATE, GlobalState } from '../../global-state';
import { RxState, update } from '@rx-angular/state';
import { Subject } from 'rxjs';
import { CardInfo } from '../../types';

@Component({
  selector: 'digimon-card-app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements OnInit {
  @Input() src = '';
  @Input() imgFileName!: CardInfo['imgFileName'];

  readonly gs$ = this.globalState.select();

  readonly onAdd$ = new Subject<CardInfo['imgFileName']>();

  constructor(
    @Inject(GLOBAL_RX_STATE) private globalState: RxState<GlobalState>
  ) {}

  ngOnInit() {
    if (this.imgFileName == null) {
      throw new Error('imgFileName is required!!! in card.component');
    }
    this.globalState.connect('deckList', this.onAdd$, (state, imgFileName) => {
      const selectDeck = state.deckList.find(
        (v) => v.id === state.selectedDeckId
      );
      return selectDeck == null
        ? state.deckList
        : update(
            state.deckList,
            {
              ...selectDeck,
              cardList: [...selectDeck.cardList, imgFileName],
            },
            'id'
          );
    });
  }
}
