import { FC, memo } from 'react';
import { CardInfo } from '../../../domains/card';
import { MenuProps, VsScreenCard } from './vs-screen-card';

const SECURITY_AREA_MENU: MenuProps[] = [{ label: '手札に追加' }];

export const SecurityCheckAreaCard: FC<{ card: CardInfo }> = memo(
  ({ card }) => {
    return <VsScreenCard card={card} menuList={SECURITY_AREA_MENU} />;
  }
);
