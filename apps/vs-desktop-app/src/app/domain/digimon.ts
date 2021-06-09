import * as _ from 'lodash';
import { v4 } from 'uuid';
import { Card } from '../types';
import { BattleCard } from './battle-card';

export class Digimon extends BattleCard {
  readonly id = v4();

  static deserialize(serialized: SerializedDigimon) {
    return new Digimon(
      serialized.card,
      serialized.evolutionOriginCardList,
      serialized.isRest
    );
  }

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

  removeEvolutionOrigin(cardId: Card['id']) {
    _.remove(this._evolutionOiriginCardList, (v) => v.id === cardId);
    console.log(this._evolutionOiriginCardList);
  }

  serialize(): SerializedDigimon {
    return {
      card: this.card,
      isRest: this.isRest,
      evolutionOriginCardList: this.evolutionOiriginCardList,
    };
  }
}

export type SerializedDigimon = {
  card: Card;
  isRest: boolean;
  evolutionOriginCardList: Card[];
};
