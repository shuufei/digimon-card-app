import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Card } from '../../../../components/presentation/card';
import { CardInfo } from '../../../../domains/card';
import * as authStore from '../../../../store/auth-store';
import { CARD_HEIGHT, CARD_WIDTH } from '../../configs/card-style';

export const VsScreenCard: FC<{ card: CardInfo }> = ({ card }) => {
  const signedQueryStrings = useSelector(
    authStore.selectors.signedQueryStringsSelector
  );

  return (
    <Card
      card={card}
      height={CARD_HEIGHT}
      width={CARD_WIDTH}
      isPressable={false}
      isLongPressable={false}
      signedQueryStrings={signedQueryStrings}
    />
  );
};
