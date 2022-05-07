import { API } from 'aws-amplify';
import { Button, HStack, Image, Menu, Pressable, View } from 'native-base';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from '../components/presentation/card';
import { ALL_CARD_LIST } from '../configs/all-card-list';
import { ENDPOINT } from '../configs/distribution';
import { cardImageAspectRate } from '../domains/card';
import * as authStore from '../store/auth-store';

const cardSample = ALL_CARD_LIST[10];

const getCardImageSrc = (fileName: string, signedQueryStrings: string) => {
  const url = `${ENDPOINT}/vs-assets/${fileName}?${signedQueryStrings}`;
  return url;
};

const cardWidth = 54;
const cardHeight = cardWidth * cardImageAspectRate;

const useCustomMenuProps = () => {
  const [isOpened, setOpened] = useState(false);
  const menuProps = {
    onOpen: () => {
      setOpened(true);
    },
    onClose: () => {
      setOpened(false);
    },
  };
  // TODO: animation
  const triggerStyleProps = {
    shadow: isOpened ? 9 : 0,
    // marginTop: isOpened ? -4 : 0
  };
  return [menuProps, triggerStyleProps];
};

const DeckArea: FC<{ signedQueryStrings: string }> = ({
  signedQueryStrings,
}) => {
  const [menuProps, triggerStyleProps] = useCustomMenuProps();
  return (
    <View>
      <Menu
        w={190}
        placement={'left'}
        offset={8}
        trigger={(triggerProps) => {
          return (
            <Pressable accessibilityLabel="more options menu" {...triggerProps}>
              <View {...triggerStyleProps}>
                <Image
                  source={{
                    uri: getCardImageSrc('back.png', signedQueryStrings ?? ''),
                  }}
                  resizeMode="contain"
                  width={cardWidth}
                  height={cardHeight}
                  alt={`card_back`}
                />
              </View>
            </Pressable>
          );
        }}
        {...menuProps}
      >
        <Menu.Item>ドロー</Menu.Item>
        <Menu.Item>シャッフル</Menu.Item>
      </Menu>
    </View>
  );
};

const SecurityArea: FC<{ signedQueryStrings: string }> = ({
  signedQueryStrings,
}) => {
  const [menuProps, triggerStyleProps] = useCustomMenuProps();
  return (
    <Menu
      w={180}
      placement={'left top'}
      offset={8}
      {...menuProps}
      trigger={(triggerProps) => {
        return (
          <Pressable {...triggerProps}>
            <View {...triggerStyleProps}>
              <Image
                source={{
                  uri: getCardImageSrc(
                    'back_rotate90.png',
                    signedQueryStrings ?? ''
                  ),
                }}
                resizeMode="contain"
                width={cardHeight}
                height={cardWidth}
                alt={`card_back`}
                zIndex={2}
              />
              <Image
                source={{
                  uri: getCardImageSrc(
                    'back_rotate90.png',
                    signedQueryStrings ?? ''
                  ),
                }}
                resizeMode="contain"
                width={cardHeight}
                height={cardWidth}
                alt={`card_back`}
                marginTop={-12}
                zIndex={1}
              />
            </View>
          </Pressable>
        );
      }}
    >
      <Menu.Item>オープン</Menu.Item>
      <Menu.Item>確認</Menu.Item>
      <Menu.Item>シャッフル</Menu.Item>
    </Menu>
  );
};

export const VSScreen = () => {
  // TODO: custom hooks
  const dispatch = useDispatch();
  useEffect(() => {
    const setSignedQueryStrings = async () => {
      const res: { credentials: string } = await API.get(
        'v1',
        '/v1/credentials',
        {}
      );
      console.log('--- signed query strings: ', res.credentials);
      dispatch(
        authStore.actions.setSignedQueryString({
          signedQueryStrings: res.credentials,
        })
      );
    };
    setSignedQueryStrings();
  }, [dispatch]);

  const signedQueryStrings = useSelector(
    authStore.selectors.signedQueryStringsSelector
  );

  return (
    <View>
      <HStack justifyContent={'space-between'} mt={4}>
        <View>
          <View marginLeft={'-8'}>
            <SecurityArea signedQueryStrings={signedQueryStrings ?? ''} />
          </View>
        </View>
        <View>
          <Card
            card={cardSample}
            width={cardWidth}
            height={cardHeight}
            padding={0}
            isPressable={false}
            isLongPressable={true}
          />
          <Button size={'xs'} mt={1} colorScheme="gray" variant="outline">
            選択
          </Button>
        </View>
        <View>
          <View marginRight={'-6'}>
            <DeckArea signedQueryStrings={signedQueryStrings ?? ''} />
          </View>
        </View>
      </HStack>
    </View>
  );
};
