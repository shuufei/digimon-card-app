import { last } from 'lodash';
import { View } from 'native-base';
import { FC, memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ALL_CARD_LIST } from '../../../configs/all-card-list';
import * as vsStore from '../../../store/vs-store';
import { CountLabel } from './presentation/count-label';
import { VsScreenCard } from './vs-screen-card';

const DUMMY_TRASH_CARD_LIST = new Array(20)
  .fill(null)
  .map((_, i) => ALL_CARD_LIST[i]);

export const TrashArea: FC = memo(() => {
  const [cardList, setCardList] = useState(DUMMY_TRASH_CARD_LIST);
  const lastCard = last(cardList);
  const dispatch = useDispatch();

  return lastCard ? (
    <View>
      <VsScreenCard
        card={lastCard}
        menuList={[
          {
            label: '確認',
            onPress: () => {
              dispatch(
                vsStore.actions.setShouldShowTrashCheckView({
                  shouldShowTrashCheckView: true,
                })
              );
            },
          },
        ]}
        menuPlacement={'left top'}
      />
      <CountLabel count={cardList.length} />
    </View>
  ) : null;
});
