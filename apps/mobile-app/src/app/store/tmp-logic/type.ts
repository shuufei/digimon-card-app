export const LV = {
  'Lv.2': 'Lv.2',
  'Lv.3': 'Lv.3',
  'Lv.4': 'Lv.4',
  'Lv.5': 'Lv.5',
  'Lv.6': 'Lv.6',
  'Lv.7': 'Lv.7',
  '-': '-',
} as const;

export type Lv = keyof typeof LV;

export const CARD_TYPE = {
  '1_デジタマ': '1_デジタマ',
  '2_デジモン': '2_デジモン',
  '3_テイマー': '3_テイマー',
  '4_オプション': '4_オプション',
} as const;

export type CardType = keyof typeof CARD_TYPE;

export const COLOR = {
  '1_red': '1_red',
  '2_blue': '2_blue',
  '3_yellow': '3_yellow',
  '4_green': '4_green',
  '5_black': '5_black',
  '6_purple': '6_purple',
  '7_white': '7_white',
  '8_multicolor': '8_multicolor',
} as const;

export type Color = keyof typeof COLOR;

export type CardInfo = {
  no: string;
  // lv?: Lv;
  // rarity: string;
  // cardtype: CardType;
  // parallel?: string;
  name: string;
  // colors: Color[];
  // color: string;
  // form?: string;
  // attribute: string;
  // type: string;
  // dp?: string;
  // apperanceCost?: string;
  // evolutionCost1?: string;
  // evolutionCost2?: string;
  // effect?: string;
  // evolutionaryOriginEffect?: string;
  // securityEffect?: string;
  imgFileName: string;
  // category: string;
};

export type VsCard = {
  id: string;
  data: CardInfo;
};

export type VsBoard = {
  deck: VsCard[];
  deckOpen: VsCard[];
  hand: VsCard[];
  security: VsCard[];
  securityOpen: VsCard[];
  trash: VsCard[];
  eggDeck: VsCard[];
  eggOpen: VsCard[];
  securitySelfCheck: VsCard[];
  trashSelfCheck: VsCard[];
};
