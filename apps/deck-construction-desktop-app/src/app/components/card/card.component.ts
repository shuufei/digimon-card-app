import { Component, Input } from '@angular/core';

@Component({
  selector: 'digimon-card-app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() src = '';

}
