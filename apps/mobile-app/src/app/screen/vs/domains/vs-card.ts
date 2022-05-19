import { CardInfo } from '../../../domains/card';

export type VsCard = {
  data: CardInfo;
  evolutionarySources: CardInfo[];
  isRest: boolean;
};

export const isVsCard = (value: VsCard | CardInfo): value is VsCard => {
  return 'data' in value && 'evolutionarySources' in value;
};
