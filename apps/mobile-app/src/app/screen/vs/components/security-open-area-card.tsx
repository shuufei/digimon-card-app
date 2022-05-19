import { FC, memo } from 'react';
import { CardInfo } from '../../../domains/card';
import { MenuProps, VsScreenCard } from './vs-screen-card';

const SECURITY_OPEN_AREA_MENU: MenuProps[] = [
  { label: '登場' },
  { label: '進化' },
  { label: '進化元に追加' },
  { label: '破棄' },
  { label: '手札に追加' },
  { label: 'セキュリティに追加' },
];

export const SecurityOpenAreaCard: FC<{ card: CardInfo }> = memo(({ card }) => {
  return <VsScreenCard card={card} menuList={SECURITY_OPEN_AREA_MENU} />;
});
