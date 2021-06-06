export const COLOR = {
  '1_red': '1_red',
  '2_blue': '2_blue',
  '3_yellow': '3_yellow',
  '4_green': '4_green',
  '5_black': '5_black',
  '6_purple': '6_purple',
  '7_white': '7_white',
} as const;

export type Color = keyof typeof COLOR;

export const CARD_TYPE = {
  デジモン: 'デジモン',
  デジタマ: 'デジタマ',
  テイマー: 'テイマー',
  オプション: 'オプション',
} as const;

export type CardType = keyof typeof CARD_TYPE;

export const LV = {
  'Lv.2': 'Lv.2',
  'Lv.3': 'Lv.3',
  'Lv.4': 'Lv.4',
  'Lv.5': 'Lv.5',
  'Lv.6': 'Lv.6',
  'Lv.7': 'Lv.7',
} as const;

export type Lv = keyof typeof LV;

export const CATEGORY = {
  BT01: 'BT01',
  BT02: 'BT02',
  BT03: 'BT03',
  BT04: 'BT04',
  BT05: 'BT05',
  BT06: 'BT06',
  ST01: 'ST01',
  ST02: 'ST02',
  ST03: 'ST03',
  ST04: 'ST04',
  ST05: 'ST05',
  ST06: 'ST06',
  ST07: 'ST07',
  ST08: 'ST08',
} as const;

export type Category = keyof typeof CATEGORY;

export type Deck = {
  id: string;
  title: string;
  cardList: CardInfo['imgFileName'][];
};

export type CardInfo = {
  no: string;
  lv?: Lv;
  rarity: string;
  cardtype: CardType;
  parallel?: string;
  name: string;
  form: string;
  attribute: string;
  type: string;
  dp: string;
  appearanceCost: string;
  evolutionCost1: string;
  evolutionCost2: string;
  effect: string;
  evolutionaryOriginEffect: string;
  securityEffect: string;
  imgFileName: string;
  imgSrc: string;
  category: Category;
  color: Color;
};

export type Card = CardInfo & {
  id: string;
};

export const CARD_ACTION = {
  draw: 'draw',
  entry: 'entry',
  evolution: 'evolution',
  shuffle: 'shuffle',
  reset: 'reset',
  active: 'active',
  rest: 'rest',
  trash: 'trash',
  recovery: 'recovery',
  incubation: 'incubation',
  open: 'open',
  addToBottomOfStack: 'addToBottomOfStack',
  selfCheck: 'selfCheck',
  return: 'return',
  degeneration: 'degeneration',
} as const;

export type CardAction = keyof typeof CARD_ACTION;

export type Area =
  | 'stack'
  | 'digitamaStack'
  | 'hand'
  | 'battleArea'
  | 'optionArea'
  | 'tamerArea'
  | 'securityArea'
  | 'standbyArea'
  | 'stackOpenArea'
  | 'securityOpenArea'
  | 'securityCheckArea'
  | 'trashArea'
  | 'whole';

export const MODE = {
  evolution: 'evolution',
} as const;

export type Mode = keyof typeof MODE;
