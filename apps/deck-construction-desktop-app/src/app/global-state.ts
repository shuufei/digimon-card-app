import { InjectionToken } from '@angular/core';
import { Color } from './types';

export type GlobalState = {
  filter: {
    colorList: Color[];
  };
};

export const GLOBAL_RX_STATE = new InjectionToken<GlobalState>(
  'GLOBAL_RX_STATE'
);
