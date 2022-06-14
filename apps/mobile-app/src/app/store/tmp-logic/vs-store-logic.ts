import { shuffle } from 'lodash';
import { VsCardModalScreen } from '../../screen/vs-card-modal-screen';

type VsCard = {
  name: string;
};

type VsBoard = {
  deck: VsCard[];
  deckOpen: VsCard[];
  hand: VsCard[];
  security: VsCard[];
  securityOpen:VsCard[],
  trash: VsCard[];
  eggDeck: VsCard[];
  eggOpen: VsCard[];
  selfCheck: VsCard[];
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
  securityOpen: [],
  trash: [],
  eggDeck: [],
  eggOpen: [],
  selfCheck: []
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

/*------------------ 山札オープン------------------*/
const trashAllFromDeckOpen = (state: State) => {
  state = trashAll(state, 'deckOpen');
  return state;
};

const getAllToHandFromDeckOpen = (state: State) => {
  state = getAllToHand(state, 'deckOpen');
  return state
};

const returnAllToUnderDeckFromDeckOpen = (state: State) => {
  state = returnToDeck(state, 'deckOpen', 'Under')
  return state
};

const returnAllToTopDeckFromDeckOpen = (state: State) => {
  state = returnToDeck(state, 'deckOpen', 'Top')
  return state
};

/*------------------ トラッシュ------------------*/
const selfCheckFromTrash = (state: State) => {
  const cardList = state.board.myself.trash;
  state.board.myself.trash = []
  state.board.myself.selfCheck = state.board.myself.selfCheck.concat(cardList);
  return state
};

/*------------------ セキュリティ------------------*/
const shuffleSecurity = (state: State) => {
  state.board.myself.security = shuffle(state.board.myself.security);
  return state
};

const securityOpen = (state: State) => {
  state.board.myself.securityOpen = [state.board.myself.security[0]];
  state.board.myself.security.pop();
  return state
};

const securitySelfCheck = (state: State) => {
  const cardList = state.board.myself.security;
  state.board.myself.security = []
  state.board.myself.selfCheck = state.board.myself.selfCheck.concat(cardList);
  return
}

/*------------------ セキュリティオープン------------------*/
const trashAllFromSecurity = (state: State) => {
  state = trashAll(state, 'security');
  return state
};

const getAllToHandFromSecurity = (state: State) => {
  state = getAllToHand(state, 'security');
  return state
};

/*------------------ セキュリティ確認------------------*/
const selfCheckReturnSecurity = (state: State) => {
  const cardList = state.board.myself.selfCheck;
  state.board.myself.selfCheck = [];
  state.board.myself.security = state.board.myself.security.concat(cardList);
  return state
}

/*------------------ デジタマ------------------*/
const shuffleEgg = (state: State) => {
  state.board.myself.eggDeck = shuffle(state.board.myself.eggDeck);
  return state
};

/* eggDeck should be VsCard but if so, function defined below won't work.
   That's why its type is VsCard[]  How should i do this?
*/
const hatchEgg = (state: State) => {
  state.board.myself.eggOpen = [state.board.myself.eggDeck[0]];
  state.board.myself.eggDeck.pop();
  return state
};

/*------------------ 関数 ------------------ */
const trashAll = (state: State, from: keyof VsBoard) =>  {
  const cardList = state.board.myself[from];
  state.board.myself[from] = [];
  state.board.myself.trash = state.board.myself.trash.concat(cardList);
  return state;
};

const getAllToHand = (state: State, from: keyof VsBoard) => {
  const cardList = state.board.myself[from];
  state.board.myself[from] = [];
  state.board.myself.hand = state.board.myself.trash.concat(cardList);
  return state
};

const returnToDeck =  (state: State, from: keyof VsBoard, to: 'Top'|'Under') => {
  const cardList = state.board.myself.deckOpen;
  state.board.myself.deckOpen = [];
  if(to === 'Top'){
    state.board.myself.deck = cardList.concat(state.board.myself.deck);
  }else{
    state.board.myself.deck = state.board.myself.deck.concat(cardList);
  };
  return state
}; 


const state = initialState;

const dispatch = () => {
  const currenState = state;
  currenState.board.myself.eggDeck = [
    {
      name: 'コロモン'
    }
  ];

  currenState.board.myself.security = [
    {
      name: 'ホゲモン'
    },
    {
      name: 'フガモン'
    },
    {
      name: 'ホゲフガモン'
    }
  ];
  currenState.board.myself.deckOpen = [
    {
      name: 'ベルゼブモン',
    },
  ];
  console.log('--- currentState: ', currenState);
  const newState = hatchEgg(state);
  console.log('--- newState: ', newState.board.myself.eggOpen.pop());
};

dispatch();
