import { Card } from '../types';
import { BattleCard } from './battle-card';

export class Tamer extends BattleCard {
  static deserialize(serialized: SerializedTamer) {
    return new Tamer(serialized.card, serialized.isRest);
  }

  constructor(_card: Card, _isRest: boolean = false) {
    super(_card, _isRest);
  }

  serialize(): SerializedTamer {
    return {
      card: this.card,
      isRest: this.isRest,
    };
  }
}

export type SerializedTamer = {
  card: Card;
  isRest: boolean;
};
