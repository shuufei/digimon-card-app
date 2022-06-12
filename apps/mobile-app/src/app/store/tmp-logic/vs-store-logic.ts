type VsCard = {
  name: string;
};

type VsBoard = {
  deck: VsCard[];
  deckOpen: VsCard[];
  hand: VsCard[];
  security: VsCard[];
  trash: VsCard[];
};

type State = {
  ui: {
    shouldShowSecurityCheckView: boolean;
    shouldShowTrashCheckView: boolean;
  };
  board: {
    myself: VsBoard;
    opponent: VsBoard;
  };
};

const initVsBoard: VsBoard = {
  deck: [],
  deckOpen: [],
  hand: [],
  security: [],
  trash: [],
};

const initialState: State = {
  ui: {
    shouldShowSecurityCheckView: false,
    shouldShowTrashCheckView: false,
  },
  board: {
    myself: initVsBoard,
    opponent: initVsBoard,
  },
};

const trashAllFromOpen = (state: State) => {
  const cardList = state.board.myself.deckOpen;
  state.board.myself.deckOpen = [];
  state.board.myself.trash = state.board.myself.trash.concat(cardList);
  return state;
};

const state = initialState;

const dispatch = () => {
  const currenState = state;
  currenState.board.myself.deckOpen = [
    {
      name: 'ベルゼブモン',
    },
  ];
  console.log('--- currentState: ', currenState);
  const newState = trashAllFromOpen(state);
  console.log('--- newState: ', newState);
};

dispatch();
