import { InjectionToken } from '@angular/core';
import { v4 } from 'uuid';
import { deck } from './deck';
import { Digimon } from './domain/digimon';
import { Area, Card, Mode } from './types';

type AreaState = {
  cardList: Card[];
};

export type GlobalState = {
  playState: {
    stack: AreaState;
    digitamaStack: AreaState;
    hand: AreaState;
    battleArea: {
      digimonList: Digimon[];
    };
    optionArea: AreaState;
    tamerArea: AreaState;
    trashArea: AreaState;
    securityArea: AreaState;
  };
  ui: {
    modeState?: {
      mode: Mode;
      trigger?: {
        card: Card;
        area: Area;
      };
    };
  };
};

export const GLOBAL_RX_STATE = new InjectionToken<GlobalState>(
  'GLOBAL_RX_STATE'
);

export const INITIAL_GLOBAL_STATE: GlobalState = {
  playState: {
    stack: {
      cardList: deck
        .filter((v) => v.cardtype !== 'デジタマ')
        .map((v) => ({ ...v, id: v4() })),
    },
    digitamaStack: {
      cardList: deck
        .filter((v) => v.cardtype === 'デジタマ')
        .map((v) => ({ ...v, id: v4() })),
    },
    hand: { cardList: [] },
    battleArea: {
      digimonList: [],
    },
    optionArea: {
      cardList: [],
    },
    tamerArea: {
      cardList: [],
    },
    trashArea: {
      cardList: [],
    },
    securityArea: {
      cardList: [],
    },
  },
  ui: {},
};
