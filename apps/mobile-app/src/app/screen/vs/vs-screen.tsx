import { API } from 'aws-amplify';
import {
  Button,
  HStack,
  Image,
  Menu,
  Pressable,
  ScrollView,
  View,
  VStack,
} from 'native-base';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from '../../components/presentation/card';
import { ALL_CARD_LIST } from '../../configs/all-card-list';
import { useCustomMenuProps } from '../../hooks/use-custom-menu-props';
import * as authStore from '../../store/auth-store';
import { DeckArea } from './components/deck-area';
import { DeckOpenArea } from './components/deck-open-area';
import { TrashArea } from './components/trash-area';
import { CARD_HEIGHT, CARD_WIDTH } from './configs/card-style';
import { getVsAssetsImageSrc } from './utils/get-vs-assets-image-src';

const cardSample = ALL_CARD_LIST[10];

const SecurityArea: FC<{ signedQueryStrings: string }> = ({
  signedQueryStrings,
}) => {
  const [menuProps, triggerStyleProps] = useCustomMenuProps();
  return (
    <Menu
      placement={'left top'}
      {...menuProps}
      trigger={(triggerProps) => {
        return (
          <Pressable {...triggerProps}>
            <View {...triggerStyleProps}>
              <Image
                source={{
                  uri: getVsAssetsImageSrc(
                    'back_rotate90.png',
                    signedQueryStrings ?? ''
                  ),
                }}
                resizeMode="contain"
                width={CARD_HEIGHT}
                height={CARD_WIDTH}
                alt={`card_back`}
                zIndex={2}
              />
              <Image
                source={{
                  uri: getVsAssetsImageSrc(
                    'back_rotate90.png',
                    signedQueryStrings ?? ''
                  ),
                }}
                resizeMode="contain"
                width={CARD_HEIGHT}
                height={CARD_WIDTH}
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
    <ScrollView>
      <VStack>
        <HStack justifyContent={'flex-end'} p={2}>
          <DeckOpenArea />
        </HStack>
      </VStack>
      <HStack justifyContent={'space-between'} mt={4}>
        <View>
          <View marginLeft={'-8'}>
            <SecurityArea signedQueryStrings={signedQueryStrings ?? ''} />
          </View>
        </View>
        <View>
          <Card
            card={cardSample}
            width={CARD_WIDTH}
            height={CARD_HEIGHT}
            padding={0}
            isPressable={false}
          />
          <Button
            size={'xs'}
            mt={1}
            colorScheme="gray"
            variant="outline"
            _pressed={{ borderWidth: '1', borderColor: '#000000' }}
          >
            選択
          </Button>
        </View>
        <View>
          <VStack marginRight={'-4'} space={2}>
            <DeckArea signedQueryStrings={signedQueryStrings ?? ''} />
            <TrashArea />
          </VStack>
        </View>
      </HStack>
    </ScrollView>
  );
};
