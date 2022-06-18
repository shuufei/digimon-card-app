import { shuffle } from 'lodash';
import { v4 } from 'uuid';
import { VsBoard, VsCard } from './type';

const getVsCard = (name?: string): VsCard => {
  return {
    id: v4(),
    data: {
      no: v4(),
      name: name ?? 'アグモン',
      imgFileName: `images/${v4()}`,
    },
  };
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
  securitySelfCheck: [],
  trashSelfCheck: [],
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
  return state;
};

const moveAllToUnderDeckFromDeckOpen = (state: State) => {
  state = moveToDeck(state, 'deckOpen', 'Under');
  return state;
};

const moveAllToTopDeckFromDeckOpen = (state: State) => {
  state = moveToDeck(state, 'deckOpen', 'Top');
  return state;
};

/*------------------ トラッシュ------------------*/
const securitySelfCheckFromTrash = (state: State) => {
  const cardList = state.board.myself.trash;
  state.board.myself.trash = [];
  state.board.myself.trashSelfCheck =
    state.board.myself.trashSelfCheck.concat(cardList);
  return state;
};

/*------------------ セキュリティ------------------*/
const shuffleSecurity = (state: State) => {
  state.board.myself.security = shuffle(state.board.myself.security);
  return state;
};

const securityOpen = (state: State) => {
  const card = state.board.myself.security.pop();
  if (card == null) {
    return state;
  }
  state.board.myself.securityOpen = [...state.board.myself.securityOpen, card];
  return state;
};

const securitySelfCheck = (state: State) => {
  const cardList = state.board.myself.security;
  state.board.myself.security = [];
  state.board.myself.securitySelfCheck =
    state.board.myself.securitySelfCheck.concat(cardList);
  return;
};

/*------------------ セキュリティオープン------------------*/
const trashAllFromSecurity = (state: State) => {
  state = trashAll(state, 'security');
  return state;
};

const getAllToHandFromSecurity = (state: State) => {
  state = getAllToHand(state, 'security');
  return state;
};

/*------------------ セキュリティ確認------------------*/
const securitySelfCheckReturnSecurity = (state: State) => {
  const cardList = state.board.myself.securitySelfCheck;
  state.board.myself.securitySelfCheck = [];
  state.board.myself.security = state.board.myself.security.concat(cardList);
  return state;
};

/*------------------ デジタマ------------------*/
const shuffleEgg = (state: State) => {
  state.board.myself.eggDeck = shuffle(state.board.myself.eggDeck);
  return state;
};

/* eggDeck should be VsCard but if so, function defined below won't work.
   That's why its type is VsCard[]  How should i do this?
*/
const hatchEgg = (state: State) => {
  state.board.myself.eggOpen = [state.board.myself.eggDeck[0]];
  state.board.myself.eggDeck.pop();
  return state;
};

/*------------------ 関数 ------------------ */
const trashAll = (state: State, from: keyof VsBoard) => {
  const cardList = state.board.myself[from];
  state.board.myself[from] = [];
  state.board.myself.trash = state.board.myself.trash.concat(cardList);
  return state;
};

const getAllToHand = (state: State, from: keyof VsBoard) => {
  const cardList = state.board.myself[from];
  state.board.myself[from] = [];
  state.board.myself.hand = state.board.myself.hand.concat(cardList);
  return state;
};

const moveToDeck = (state: State, from: keyof VsBoard, to: 'Top' | 'Under') => {
  const cardList = state.board.myself[from];
  state.board.myself[from] = [];
  state.board.myself.deck =
    to === 'Top'
      ? cardList.concat(state.board.myself.deck)
      : state.board.myself.deck.concat(cardList);
  return state;
};

const state = initialState;

const dispatch = () => {
  const currenState = state;
  currenState.board.myself.eggDeck = [getVsCard()];

  currenState.board.myself.security = [
    getVsCard('ボコモン'),
    getVsCard('オーガモン'),
    getVsCard('グレイモン'),
  ];
  currenState.board.myself.deckOpen = [getVsCard('ベルゼブモン')];
  console.log('--- currentState: ', currenState);
  const newState = hatchEgg(state);
  console.log('--- newState: ', newState.board.myself.eggOpen.pop());
};

dispatch();
