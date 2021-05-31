import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DeckCardList, CardInfo } from '../../types';

@Component({
  selector: 'digimon-card-app-deck-cardtype-card-list',
  templateUrl: './deck-cardtype-card-list.component.html',
  styleUrls: ['./deck-cardtype-card-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeckCardtypeCardListComponent {
  @Input() deckCardList: DeckCardList = [];
  @Input() count = 0;
  @Input() cardtype = '';
  @Output() add = new EventEmitter<CardInfo['imgFileName']>();
  @Output() remove = new EventEmitter<CardInfo['imgFileName']>();

}
