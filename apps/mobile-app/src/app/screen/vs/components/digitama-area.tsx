import { Menu, Pressable, View } from 'native-base';
import { FC, useState, memo } from 'react';
import { ALL_CARD_LIST } from '../../../configs/all-card-list';
import { useCustomMenuProps } from '../../../hooks/use-custom-menu-props';
import { CountLabel } from './presentation/count-label';
import { VsAssetsImage } from './vs-assets-image';

const DUMMY_DIGITAMA_CARD_LIST = new Array(5)
  .fill(null)
  .map((_, i) => ALL_CARD_LIST[i]);

export const DigitamaArea: FC = memo(() => {
  const [menuProps, triggerStyleProps] = useCustomMenuProps();
  const [cardList, setCardList] = useState(DUMMY_DIGITAMA_CARD_LIST);

  return (
    <View>
      <Menu
        placement={'left top'}
        trigger={(triggerProps) => {
          return (
            <Pressable accessibilityLabel="more options menu" {...triggerProps}>
              <View {...triggerStyleProps}>
                <VsAssetsImage
                  imageFileName="back_digitama.png"
                  alt="digitama card"
                />
              </View>
              <CountLabel count={cardList.length} position="topRight" />
            </Pressable>
          );
        }}
        {...menuProps}
      >
        <Menu.Item>孵化</Menu.Item>
        <Menu.Item>上から1枚破棄</Menu.Item>
        <Menu.Item>シャッフル</Menu.Item>
      </Menu>
    </View>
  );
});
