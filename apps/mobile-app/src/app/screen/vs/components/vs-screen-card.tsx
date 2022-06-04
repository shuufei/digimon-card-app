import { NavigationProp, useNavigation } from '@react-navigation/native';
import { reverse } from 'lodash';
import { HStack, Image, IMenuProps, Menu, Pressable, View } from 'native-base';
import { FC, memo, useContext, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Card } from '../../../components/presentation/card';
import { CardInfo } from '../../../domains/card';
import { useCustomMenuProps } from '../../../hooks/use-custom-menu-props';
import { RootParamList } from '../../../navigation/index';
import * as authStore from '../../../store/auth-store';
import { getCardImageSrc } from '../../../utils/get-card-image-src';
import { CARD_HEIGHT, CARD_WIDTH } from '../configs/card-style';
import { BoardContext } from '../context/board-context';
import { isVsCard, VsCard } from '../../../domains/vs-card';

export type MenuProps = {
  label: string;
  onPress?: () => void;
};

export const VsScreenCard: FC<{
  card: VsCard | CardInfo;
  menuList: MenuProps[];
  menuPlacement?: IMenuProps['placement'];
}> = memo(({ card, menuList, menuPlacement = 'bottom left' }) => {
  const signedQueryStrings = useSelector(
    authStore.selectors.signedQueryStringsSelector
  );
  const [menuProps, triggerStyleProps] = useCustomMenuProps();
  const { navigate } = useNavigation<NavigationProp<RootParamList>>();

  const cardViewWidth = useMemo(
    () => (isVsCard(card) && card.isRest ? CARD_HEIGHT : CARD_WIDTH),
    [card]
  );

  const boardContext = useContext(BoardContext);

  return signedQueryStrings ? (
    <Menu
      {...menuProps}
      placement={menuPlacement}
      trigger={(triggerProps) => {
        return isVsCard(card) ? (
          <Pressable
            {...(boardContext.side === 'myself' ? triggerProps : {})}
            onLongPress={() => {
              navigate('VsCardModal', {
                card,
              });
            }}
          >
            <View {...triggerStyleProps} width={cardViewWidth}>
              <View style={card.isRest && { transform: [{ rotate: '90deg' }] }}>
                <Card
                  card={card.data}
                  height={CARD_HEIGHT}
                  width={CARD_WIDTH}
                  isPressable={false}
                  signedQueryStrings={signedQueryStrings}
                />
              </View>
              {card.evolutionarySources.length > 0 && (
                <HStack flexWrap={'wrap'} space={0} mt={1}>
                  {reverse([...card.evolutionarySources]).map(
                    (evolutionarySource, i) => {
                      return (
                        <Image
                          key={`${evolutionarySource.imgFileName}-${i}`}
                          source={{
                            uri: getCardImageSrc(
                              evolutionarySource,
                              signedQueryStrings
                            ),
                            cache: 'force-cache',
                          }}
                          resizeMode="center"
                          height={4}
                          width={4}
                          alt={`${evolutionarySource.name}`}
                        />
                      );
                    }
                  )}
                </HStack>
              )}
            </View>
          </Pressable>
        ) : (
          <Pressable
            {...(boardContext.side === 'myself' ? triggerProps : {})}
            onLongPress={() => {
              navigate('CardModal', {
                name: card.name,
                cardImageSrc: getCardImageSrc(card, signedQueryStrings),
              });
            }}
          >
            <View {...triggerStyleProps} width={CARD_WIDTH}>
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
});
