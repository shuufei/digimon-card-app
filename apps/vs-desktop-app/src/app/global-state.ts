import { InjectionToken } from '@angular/core';
import { v4 } from 'uuid';
import { deck } from './deck';
import { Digimon } from './domain/digimon';
import { Tamer } from './domain/tamer';
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
    tamerArea: {
      tamerList: Tamer[];
    };
    trashArea: AreaState;
    securityArea: AreaState;
    standbyArea: {
      digimon?: Digimon;
    };
    securityOpenArea: AreaState;
    securityCheckArea: AreaState;
    stackOpenArea: AreaState;
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
      tamerList: [],
    },
    trashArea: {
      cardList: [],
    },
    securityArea: {
      cardList: [],
    },
    standbyArea: {
      digimon: undefined,
    },
    securityOpenArea: {
      cardList: [],
    },
    securityCheckArea: {
      cardList: [],
    },
    stackOpenArea: {
      cardList: [],
    },
  },
  ui: {},
};
