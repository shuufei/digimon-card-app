import { FC, memo } from 'react';
import { VsCard } from '../../../domains/vs-card';
import { MenuProps, VsScreenCard } from './vs-screen-card';

const TRAINING_AREA_MENU: MenuProps[] = [{ label: '登場' }];

export const TrainingAreaCard: FC<{ card: VsCard }> = memo(({ card }) => {
  return (
    <VsScreenCard
      card={card}
      menuList={TRAINING_AREA_MENU}
      menuPlacement={'right top'}
    />
  );
});
