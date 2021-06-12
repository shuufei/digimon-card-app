import { InjectionToken } from '@angular/core';
import { Digimon, SerializedDigimon } from './domain/digimon';
import { SerializedTamer, Tamer } from './domain/tamer';
import { Area, Card, MemoryCount, Mode, Side } from './types';

type AreaState = {
  cardList: Card[];
};

export type PlayState = {
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

export type GlobalState = {
  memory: {
    side: Side;
    count: MemoryCount;
  };
  deck: {
    cardList: Card[];
  };
  playState: PlayState;
  otherSidePlayState: PlayState;
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
  otherSidePlayState: {
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

export type SerializedPlayState = Pick<
  GlobalState['playState'],
  | 'digitamaStack'
  | 'hand'
  | 'optionArea'
  | 'securityArea'
  | 'securityCheckArea'
  | 'securityOpenArea'
  | 'stack'
  | 'stackOpenArea'
  | 'trashArea'
> & {
  battleArea: {
    digimonList: SerializedDigimon[];
  };
  tamerArea: {
    tamerList: SerializedTamer[];
  };
  standbyArea: {
    digimon?: SerializedDigimon;
  };
};

export type SerializedGlobalState = Pick<
  GlobalState,
  'deck' | 'memory' | 'ui'
> & {
  playState: SerializedPlayState;
  otherSidePlayState: SerializedPlayState;
};

export const serializePlayState = (
  playState: PlayState
): SerializedPlayState => {
  return {
    ...playState,
    battleArea: {
      digimonList: playState.battleArea.digimonList.map((v) => v.serialize()),
    },
    tamerArea: {
      tamerList: playState.tamerArea.tamerList.map((v) => v.serialize()),
    },
    standbyArea: {
      digimon: playState.standbyArea.digimon?.serialize(),
    },
  };
};

export const serialize = (globalState: GlobalState): SerializedGlobalState => {
  return {
    ...globalState,
    playState: serializePlayState(globalState.playState),
    otherSidePlayState: serializePlayState(globalState.otherSidePlayState),
  };
};

export const deserializePlayState = (
  serializedPlayState: SerializedPlayState
): PlayState => {
  return {
    ...serializedPlayState,
    battleArea: {
      digimonList: serializedPlayState.battleArea.digimonList.map((v) =>
        Digimon.deserialize(v)
      ),
    },
    tamerArea: {
      tamerList: serializedPlayState.tamerArea.tamerList.map((v) =>
        Tamer.deserialize(v)
      ),
    },
    standbyArea: {
      digimon:
        serializedPlayState.standbyArea.digimon &&
        Digimon.deserialize(serializedPlayState.standbyArea.digimon),
    },
  };
};

export const deserialize = (serialized: SerializedGlobalState): GlobalState => {
  return {
    ...serialized,
    playState: deserializePlayState(serialized.playState),
    otherSidePlayState: deserializePlayState(serialized.otherSidePlayState),
  };
};
