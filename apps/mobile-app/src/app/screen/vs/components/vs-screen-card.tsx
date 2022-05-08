import { NavigationProp, useNavigation } from '@react-navigation/native';
import { IMenuProps, Menu, Pressable, View } from 'native-base';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Card } from '../../../components/presentation/card';
import { CardInfo } from '../../../domains/card';
import { useCustomMenuProps } from '../../../hooks/use-custom-menu-props';
import { RootParamList } from '../../../navigation/index';
import * as authStore from '../../../store/auth-store';
import { getCardImageSrc } from '../../../utils/get-card-image-src';
import { CARD_HEIGHT, CARD_WIDTH } from '../configs/card-style';

export type MenuProps = {
  label: string;
  onPress?: () => void;
};

export const VsScreenCard: FC<{
  card: CardInfo;
  menuList: MenuProps[];
  menuPlacement?: IMenuProps['placement'];
}> = ({ card, menuList, menuPlacement = 'bottom left' }) => {
  const signedQueryStrings = useSelector(
    authStore.selectors.signedQueryStringsSelector
  );
  const [menuProps, triggerStyleProps] = useCustomMenuProps();
  const { navigate } = useNavigation<NavigationProp<RootParamList>>();

  return signedQueryStrings ? (
    <Menu
      {...menuProps}
      placement={menuPlacement}
      trigger={(triggerProps) => {
        return (
          <Pressable
            {...triggerProps}
            onLongPress={() => {
              navigate('CardModal', {
                name: card.name,
                cardImageSrc: getCardImageSrc(card, signedQueryStrings),
              });
            }}
          >
            <View {...triggerStyleProps}>
              <Card
                card={card}
                height={CARD_HEIGHT}
                width={CARD_WIDTH}
                isPressable={false}
                signedQueryStrings={signedQueryStrings}
              />
            </View>
          </Pressable>
        );
      }}
    >
      {menuList.map((menu) => {
        return (
          <Menu.Item key={menu.label} onPress={menu.onPress}>
            {menu.label}
          </Menu.Item>
        );
      })}
    </Menu>
  ) : null;
};
