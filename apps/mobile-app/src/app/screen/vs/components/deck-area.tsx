import { Menu, Pressable, View } from 'native-base';
import { FC, useState } from 'react';
import { ALL_CARD_LIST } from '../../../configs/all-card-list';
import { useCustomMenuProps } from '../../../hooks/use-custom-menu-props';
import { CountLabel } from './presentation/count-label';
import { VsAssetsImage } from './presentation/vs-assets-image';

const DUMMY_DECK_CARD_LIST = new Array(50)
  .fill(null)
  .map((_, i) => ALL_CARD_LIST[i]);

export const DeckArea: FC = () => {
  const [menuProps, triggerStyleProps] = useCustomMenuProps();
  const [cardList, setCardList] = useState(DUMMY_DECK_CARD_LIST);

  return (
    <View>
      <Menu
        placement={'left top'}
        trigger={(triggerProps) => {
          return (
            <Pressable accessibilityLabel="more options menu" {...triggerProps}>
              <View {...triggerStyleProps}>
                <VsAssetsImage imageFileName="back.png" alt="deck card" />
              </View>
              <CountLabel count={cardList.length} />
            </Pressable>
          );
        }}
        {...menuProps}
      >
        <Menu.Item>ドロー</Menu.Item>
        <Menu.Item>オープン</Menu.Item>
        <Menu.Item>リカバリー</Menu.Item>
        <Menu.Item>上から1枚破棄</Menu.Item>
        <Menu.Item>シャッフル</Menu.Item>
      </Menu>
    </View>
  );
};
