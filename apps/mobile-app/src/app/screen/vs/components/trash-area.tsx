import { FC, useState, memo } from 'react';
import { View } from 'native-base';
import { ALL_CARD_LIST } from '../../../configs/all-card-list';
import { VsScreenCard } from './vs-screen-card';
import { last } from 'lodash';
import { CountLabel } from './presentation/count-label';

const DUMMY_TRASH_CARD_LIST = new Array(20)
  .fill(null)
  .map((_, i) => ALL_CARD_LIST[i]);

export const TrashArea: FC = memo(() => {
  const [cardList, setCardList] = useState(DUMMY_TRASH_CARD_LIST);
  const lastCard = last(cardList);

  return lastCard ? (
    <View>
      <VsScreenCard
        card={lastCard}
        menuList={[{ label: '確認' }]}
        menuPlacement={'left top'}
      />
      <CountLabel count={cardList.length} />
    </View>
  ) : null;
});
