import { CardInfo } from './card';

export type VsBattleCard = {
  data: CardInfo;
  evolutionarySources: CardInfo[];
  isRest: boolean;
};

export const isVsBattleCard = (
  value: VsBattleCard | CardInfo
): value is VsBattleCard => {
  return 'data' in value && 'evolutionarySources' in value;
};
