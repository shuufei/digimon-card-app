import { FC, memo } from 'react';
import { CardInfo } from '../../../domains/card';
import { MenuProps, VsScreenCard } from './vs-screen-card';

const BATTLE_AREA_OPTION_MENU: MenuProps[] = [
  { label: '破棄' },
  { label: '進化元に追加' },
  { label: '手札に戻す' },
  { label: 'セキュリティに追加' },
];

export const BattleAreaOptionCard: FC<{ card: CardInfo }> = memo(({ card }) => {
  return (
    <VsScreenCard
      card={card}
      menuList={BATTLE_AREA_OPTION_MENU}
      menuPlacement={'right'}
    />
  );
});
