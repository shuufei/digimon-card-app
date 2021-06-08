import { InjectionToken } from '@angular/core';
import { Digimon } from './domain/digimon';
import { Tamer } from './domain/tamer';
import { Area, Card, MemoryCount, Mode, Side } from './types';

type AreaState = {
  cardList: Card[];
};

export type GlobalState = {
  memory: {
    side: Side;
    count: MemoryCount;
  };
  deck: {
    cardList: Card[];
  };
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
  memory: {
    side: 'unknown',
    count: 0,
  },
  deck: {
    cardList: [],
  },
  playState: {
    stack: {
      cardList: [],
    },
    digitamaStack: {
      cardList: [],
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
