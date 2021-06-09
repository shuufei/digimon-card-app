import { InjectionToken } from '@angular/core';
import { Digimon, SerializedDigimon } from './domain/digimon';
import { SerializedTamer, Tamer } from './domain/tamer';
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

export type SerializedGlobalState = Pick<
  GlobalState,
  'deck' | 'memory' | 'ui'
> & {
  playState: Pick<
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
};

export const serialize = (globalState: GlobalState): SerializedGlobalState => {
  return {
    ...globalState,
    playState: {
      ...globalState.playState,
      battleArea: {
        digimonList: globalState.playState.battleArea.digimonList.map((v) =>
          v.serialize()
        ),
      },
      tamerArea: {
        tamerList: globalState.playState.tamerArea.tamerList.map((v) =>
          v.serialize()
        ),
      },
      standbyArea: {
        digimon: globalState.playState.standbyArea.digimon?.serialize(),
      },
    },
  };
};

export const deserialize = (serialized: SerializedGlobalState): GlobalState => {
  return {
    ...serialized,
    playState: {
      ...serialized.playState,
      battleArea: {
        digimonList: serialized.playState.battleArea.digimonList.map((v) =>
          Digimon.deserialize(v)
        ),
      },
      tamerArea: {
        tamerList: serialized.playState.tamerArea.tamerList.map((v) =>
          Tamer.deserialize(v)
        ),
      },
      standbyArea: {
        digimon:
          serialized.playState.standbyArea.digimon &&
          Digimon.deserialize(serialized.playState.standbyArea.digimon),
      },
    },
  };
};
