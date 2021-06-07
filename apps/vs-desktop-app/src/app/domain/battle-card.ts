import { Card } from '../types';

export class BattleCard {
  constructor(private readonly _card: Card, private _isRest: boolean = false) {}

  get card() {
    return this._card;
  }
  get isRest() {
    return this._isRest;
  }

  rest() {
    this._isRest = true;
  }

  active() {
    this._isRest = false;
  }
}
