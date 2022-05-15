import { FC, memo } from 'react';
import { CardInfo } from '../../../domains/card';
import { MenuProps, VsScreenCard } from './vs-screen-card';

const TRASH_AREA_MENU: MenuProps[] = [
  { label: '登場' },
  { label: '進化' },
  { label: '進化元に追加' },
  { label: '手札に戻す' },
  { label: '山札の下に戻す' },
  { label: '山札の上に戻す' },
  { label: 'セキュリティに追加' },
  { label: 'デジタマの下に戻す' },
  { label: 'デジタマの上に戻す' },
];

export const TrashCheckAreaCard: FC<{ card: CardInfo }> = memo(({ card }) => {
  return <VsScreenCard card={card} menuList={TRASH_AREA_MENU} />;
});
