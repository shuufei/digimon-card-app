
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
  'デジモン': 'デジモン',
  'デジタマ': 'デジタマ',
  'テイマー': 'テイマー',
  'オプション': 'オプション',
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
  'BT01': 'BT01',
  'BT02': 'BT02',
  'BT03': 'BT03',
  'BT04': 'BT04',
  'BT05': 'BT05',
  'BT06': 'BT06',
  'ST01': 'ST01',
  'ST02': 'ST02',
  'ST03': 'ST03',
  'ST04': 'ST04',
  'ST05': 'ST05',
  'ST06': 'ST06',
  'ST07': 'ST07',
  'ST08': 'ST08',
} as const;

export type Category = keyof typeof CATEGORY;
