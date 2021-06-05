import { v4 } from 'uuid';
import { Card } from '../types';

export class Digimon {
  readonly id = v4();
  constructor(
    private readonly _card: Card,
    private readonly _evolutionOiriginCardList: Card[] = [],
    private readonly _isRest: boolean = false
  ) {}

  get card() {
    return this._card;
  }

  get evolutionOiriginCardList() {
    return this._evolutionOiriginCardList;
  }

  get isRest() {
    return this._isRest;
  }

  addEvolutionOrigin(card: Card, index: number) {
    this._evolutionOiriginCardList.splice(index, 0, card);
  }
}
