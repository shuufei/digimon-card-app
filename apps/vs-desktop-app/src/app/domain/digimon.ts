import { v4 } from 'uuid';
import { Card } from '../types';
import { BattleCard } from './battle-card';

export class Digimon extends BattleCard {
  readonly id = v4();
  constructor(
    _card: Card,
    private readonly _evolutionOiriginCardList: Card[] = [],
    _isRest: boolean = false
  ) {
    super(_card, _isRest);
  }

  get evolutionOiriginCardList() {
    return this._evolutionOiriginCardList;
  }

  addEvolutionOrigin(card: Card, index: number) {
    this._evolutionOiriginCardList.splice(index, 0, card);
  }
}
