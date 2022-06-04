import { CardInfo } from './card';

export type VsBoard = {
  deck: CardInfo[];
};

export const initVsBoard: VsBoard = {
  deck: [],
};
