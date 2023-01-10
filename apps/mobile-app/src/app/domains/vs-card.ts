import { CardInfo } from './card';

export type VsBattleCard = {
  id: string;
  data: CardInfo;
  evolutionarySources: VsCard[];
  isRest: boolean;
};

export type VsCard = {
  id: string;
  data: CardInfo;
};

export const isVsBattleCard = (
  value: VsBattleCard | CardInfo
): value is VsBattleCard => {
  return 'data' in value && 'evolutionarySources' in value;
};
