import { Card } from '../types';
import { BattleCard } from './battle-card';

export class Tamer extends BattleCard {
  constructor(_card: Card, _isRest: boolean = false) {
    super(_card, _isRest);
  }
}
