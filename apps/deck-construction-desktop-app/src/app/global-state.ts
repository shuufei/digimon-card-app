import { InjectionToken } from '@angular/core';
import { CardType, Color, Lv } from './types';

export type GlobalState = {
  filter: {
    colorList: Color[];
    cardTypeList: CardType[];
    lvList: Lv[];
  };
};

export const GLOBAL_RX_STATE = new InjectionToken<GlobalState>(
  'GLOBAL_RX_STATE'
);
