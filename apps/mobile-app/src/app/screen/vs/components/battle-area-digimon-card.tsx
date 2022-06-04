import { FC, memo } from 'react';
import { VsBattleCard } from '../../../domains/vs-card';
import { MenuProps, VsScreenCard } from './vs-screen-card';

const BATTLE_AREA_DIGIMON_MENU: MenuProps[] = [
  { label: 'アタック' },
  { label: 'レスト' },
  { label: 'アクティブ' },
  { label: '破棄' },
  { label: '退化' },
  { label: '進化元に追加' },
  { label: '手札に戻す' },
  { label: '山札の下に戻す' },
  { label: '山札の上に戻す' },
  { label: 'セキュリティに追加' },
];

export const BattleAreaDigimonCard: FC<{ card: VsBattleCard }> = memo(
  ({ card }) => {
    return (
      <VsScreenCard
        card={card}
        menuList={BATTLE_AREA_DIGIMON_MENU}
        menuPlacement={'right'}
      />
    );
  }
);
