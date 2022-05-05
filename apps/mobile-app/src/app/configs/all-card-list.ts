import BT01 from '../../assets/cardInfo/BT01.json';
import BT02 from '../../assets/cardInfo/BT02.json';
import BT03 from '../../assets/cardInfo/BT03.json';
import BT04 from '../../assets/cardInfo/BT04.json';
import BT05 from '../../assets/cardInfo/BT05.json';
import BT06 from '../../assets/cardInfo/BT06.json';
import BT07 from '../../assets/cardInfo/BT07.json';
import BT08 from '../../assets/cardInfo/BT08.json';
import BT09 from '../../assets/cardInfo/BT09.json';
import EX01 from '../../assets/cardInfo/EX01.json';
import EX02 from '../../assets/cardInfo/EX02.json';
import PRO from '../../assets/cardInfo/PRO.json';
import ST01 from '../../assets/cardInfo/ST01.json';
import ST02 from '../../assets/cardInfo/ST02.json';
import ST03 from '../../assets/cardInfo/ST03.json';
import ST04 from '../../assets/cardInfo/ST04.json';
import ST05 from '../../assets/cardInfo/ST05.json';
import ST06 from '../../assets/cardInfo/ST06.json';
import ST07 from '../../assets/cardInfo/ST07.json';
import ST08 from '../../assets/cardInfo/ST08.json';
import ST09 from '../../assets/cardInfo/ST09.json';
import ST10 from '../../assets/cardInfo/ST10.json';
import ST11 from '../../assets/cardInfo/ST11.json';
import { CardInfo, COLOR, Color, CardType, Lv } from '../domains/card';

export const convertFromApiColorToColor = (color: string): Color => {
  switch (color) {
    case 'red':
      return COLOR['1_red'];
    case 'blue':
      return COLOR['2_blue'];
    case 'yellow':
      return COLOR['3_yellow'];
    case 'green':
      return COLOR['4_green'];
    case 'black':
      return COLOR['5_black'];
    case 'purple':
      return COLOR['6_purple'];
    case 'white':
      return COLOR['7_white'];
    default:
      return COLOR['8_multicolor'];
  }
};

export const convertFromApiColorsToColors = (color: string) => {
  const isMulticolor = color.includes('multicolor');
  const colors = isMulticolor ? color.split(' ')[0].split('_') : [color];
  return colors.map(convertFromApiColorToColor);
};

export const convertFromApiCarttypeToCardtype = (
  cardtype: string
): CardType => {
  switch (cardtype) {
    case 'デジタマ':
      return '1_デジタマ';
    case 'デジモン':
      return '2_デジモン';
    case 'テイマー':
      return '3_テイマー';
    case 'オプション':
      return '4_オプション';
    default:
      return '2_デジモン';
  }
};

export const convertFromApiLvToLv = (lv?: string): Lv => {
  switch (lv) {
    case undefined:
      return '-';
    default:
      return lv as Lv;
  }
};

export const ALL_CARD_LIST: CardInfo[] = [
  ...BT01.cardInfoList.map((v) => ({ ...v, category: 'BT01' })),
  ...BT02.cardInfoList.map((v) => ({ ...v, category: 'BT02' })),
  ...BT03.cardInfoList.map((v) => ({ ...v, category: 'BT03' })),
  ...BT04.cardInfoList.map((v) => ({ ...v, category: 'BT04' })),
  ...BT05.cardInfoList.map((v) => ({ ...v, category: 'BT05' })),
  ...BT06.cardInfoList.map((v) => ({ ...v, category: 'BT06' })),
  ...BT07.cardInfoList.map((v) => ({ ...v, category: 'BT07' })),
  ...BT08.cardInfoList.map((v) => ({ ...v, category: 'BT08' })),
  ...BT09.cardInfoList.map((v) => ({ ...v, category: 'BT09' })),
  ...EX01.cardInfoList.map((v) => ({ ...v, category: 'EX01' })),
  ...EX02.cardInfoList.map((v) => ({ ...v, category: 'EX02' })),
  ...PRO.cardInfoList.map((v) => ({ ...v, category: 'PRO' })),
  ...ST01.cardInfoList.map((v) => ({ ...v, category: 'ST01' })),
  ...ST02.cardInfoList.map((v) => ({ ...v, category: 'ST02' })),
  ...ST03.cardInfoList.map((v) => ({ ...v, category: 'ST03' })),
  ...ST04.cardInfoList.map((v) => ({ ...v, category: 'ST04' })),
  ...ST05.cardInfoList.map((v) => ({ ...v, category: 'ST05' })),
  ...ST06.cardInfoList.map((v) => ({ ...v, category: 'ST06' })),
  ...ST07.cardInfoList.map((v) => ({ ...v, category: 'ST07' })),
  ...ST08.cardInfoList.map((v) => ({ ...v, category: 'ST08' })),
  ...ST09.cardInfoList.map((v) => ({ ...v, category: 'ST09' })),
  ...ST10.cardInfoList.map((v) => ({ ...v, category: 'ST10' })),
  ...ST11.cardInfoList.map((v) => ({ ...v, category: 'ST11' })),
].map((v) => ({
  ...v,
  color: convertFromApiColorToColor(v.color),
  colors: convertFromApiColorsToColors(v.color),
  cardtype: convertFromApiCarttypeToCardtype(v.cardtype),
  lv: convertFromApiLvToLv(v.lv),
}));
