import { last } from 'lodash';
import { View } from 'native-base';
import { FC, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as vsStore from '../../../store/vs-store';
import { CountLabel } from './presentation/count-label';
import { VsScreenCard } from './vs-screen-card';

export const TrashArea: FC = memo(() => {
  const cardList = useSelector(vsStore.selectors.myselfTrashSelector);
  const lastCard = last(cardList);
  const dispatch = useDispatch();

  return lastCard ? (
    <View>
      <VsScreenCard
        card={lastCard.data}
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
