import { Component, Input } from '@angular/core';
import { CardInfo } from '../../types';

type Size = 's' | 'm'

@Component({
  selector: 'digimon-card-app-card-img',
  templateUrl: './card-img.component.html',
  styleUrls: ['./card-img.component.scss']
})
export class CardImgComponent {
  @Input() src: CardInfo['imgSrc'] = '';
  @Input() size: Size = 'm';
}

