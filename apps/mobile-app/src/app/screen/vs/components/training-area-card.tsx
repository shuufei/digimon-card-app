import { FC, memo } from 'react';
import { CardInfo } from '../../../domains/card';
import { MenuProps, VsScreenCard } from './vs-screen-card';

const TRAINING_AREA_MENU: MenuProps[] = [{ label: '登場' }];

export const TrainingAreaCard: FC<{ card: CardInfo }> = memo(({ card }) => {
  return (
    <VsScreenCard
      card={card}
      menuList={TRAINING_AREA_MENU}
      menuPlacement={'right top'}
    />
  );
});
