import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Menu, Pressable, View } from 'native-base';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { CardInfo } from '../../../../domains/card';
import { useCustomMenuProps } from '../../../../hooks/use-custom-menu-props';
import { RootParamList } from '../../../../navigation/index';
import * as authStore from '../../../../store/auth-store';
import { getCardImageSrc } from '../../../../utils/get-card-image-src';
import { VsScreenCard } from './vs-screen-card';

export const DeckOpenAreaCard: FC<{ card: CardInfo }> = ({ card }) => {
  const signedQueryStrings = useSelector(
    authStore.selectors.signedQueryStringsSelector
  );
  const [menuProps, triggerStyleProps] = useCustomMenuProps();
  const { navigate } = useNavigation<NavigationProp<RootParamList>>();

  return signedQueryStrings ? (
    <Menu
      {...menuProps}
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
              <VsScreenCard card={card} />
            </View>
          </Pressable>
        );
      }}
    >
      <Menu.Item>登場</Menu.Item>
      <Menu.Item>進化</Menu.Item>
      <Menu.Item>進化元に追加</Menu.Item>
      <Menu.Item>破棄</Menu.Item>
      <Menu.Item>手札に追加</Menu.Item>
      <Menu.Item>山札の下に戻す</Menu.Item>
      <Menu.Item>山札の上に戻す</Menu.Item>
      <Menu.Item>セキュリティに追加</Menu.Item>
    </Menu>
  ) : null;
};
