import { FC, memo } from 'react';
import { VsCard } from '../domains/vs-card';
import { MenuProps, VsScreenCard } from './vs-screen-card';

const BATTLE_AREA_TAMER_MENU: MenuProps[] = [
  { label: 'レスト' },
  { label: 'アクティブ' },
  { label: 'デジモンとして登場' },
  { label: '破棄' },
  { label: '進化元に追加' },
  { label: '手札に戻す' },
  { label: '山札の下に戻す' },
];

export const BattleAreaTamerCard: FC<{ card: VsCard }> = memo(({ card }) => {
  return (
    <VsScreenCard
      card={card}
      menuList={BATTLE_AREA_TAMER_MENU}
      menuPlacement={'right'}
    />
  );
});
