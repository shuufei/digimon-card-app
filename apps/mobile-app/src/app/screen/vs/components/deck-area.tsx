import { Image, Menu, Pressable, View, Text, Flex } from 'native-base';
import { FC, useState } from 'react';
import { ALL_CARD_LIST } from '../../../configs/all-card-list';
import { useCustomMenuProps } from '../../../hooks/use-custom-menu-props';
import { CARD_WIDTH, CARD_HEIGHT } from '../configs/card-style';
import { getVsAssetsImageSrc } from '../utils/get-vs-assets-image-src';

const DUMMY_DECK_CARD_LIST = new Array(50)
  .fill(null)
  .map((_, i) => ALL_CARD_LIST[i]);

export const DeckArea: FC<{ signedQueryStrings: string }> = ({
  signedQueryStrings,
}) => {
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
                <Image
                  source={{
                    uri: getVsAssetsImageSrc(
                      'back.png',
                      signedQueryStrings ?? ''
                    ),
                  }}
                  resizeMode="contain"
                  width={CARD_WIDTH}
                  height={CARD_HEIGHT}
                  alt={`card_back`}
                />
              </View>
              <Flex
                justifyContent={'center'}
                alignItems={'center'}
                width={5}
                height={5}
                backgroundColor={'gray.600'}
                borderRadius={'xl'}
                position={'absolute'}
                top={'-4'}
                left={'-4'}
              >
                <Text color={'white'} fontSize="9">
                  {cardList.length}
                </Text>
              </Flex>
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
