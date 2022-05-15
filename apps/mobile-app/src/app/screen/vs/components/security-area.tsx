import { Menu, Pressable, View } from 'native-base';
import { FC, memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ALL_CARD_LIST } from '../../../configs/all-card-list';
import { useCustomMenuProps } from '../../../hooks/use-custom-menu-props';
import * as vsStore from '../../../store/vs-store';
import { VsAssetsImage } from './vs-assets-image';

const DUMMY_DECK_CARD_LIST = new Array(5)
  .fill(null)
  .map((_, i) => ALL_CARD_LIST[i + 10]);

export const SecurityArea: FC = memo(() => {
  const [menuProps, triggerStyleProps] = useCustomMenuProps();
  const [cardList, setCardList] = useState(DUMMY_DECK_CARD_LIST);
  const dispatch = useDispatch();

  const securityCount = cardList.length;

  return (
    <Menu
      placement={'left top'}
      {...menuProps}
      trigger={(triggerProps) => {
        return (
          <Pressable {...triggerProps}>
            <View {...triggerStyleProps}>
              {cardList.map((_, i) => {
                return (
                  <View
                    key={i}
                    zIndex={securityCount - i}
                    mt={i === 0 ? 0 : -8}
                  >
                    <VsAssetsImage
                      imageFileName="back_rotate90.png"
                      alt="security card"
                      direction="side"
                    />
                  </View>
                );
              })}
            </View>
          </Pressable>
        );
      }}
    >
      <Menu.Item>オープン</Menu.Item>
      <Menu.Item
        onPress={() => {
          dispatch(
            vsStore.actions.setShouldShowSecurityCheckView({
              shouldShowSecurityCheckView: true,
            })
          );
        }}
      >
        確認
      </Menu.Item>
      <Menu.Item>シャッフル</Menu.Item>
    </Menu>
  );
});
