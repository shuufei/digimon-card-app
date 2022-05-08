import { API } from 'aws-amplify';
import { Button, HStack, ScrollView, View, VStack } from 'native-base';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from '../../components/presentation/card';
import { ALL_CARD_LIST } from '../../configs/all-card-list';
import * as authStore from '../../store/auth-store';
import { DeckArea } from './components/deck-area';
import { DeckOpenArea } from './components/deck-open-area';
import { SecurityArea } from './components/security-area';
import { TrashArea } from './components/trash-area';
import { CARD_HEIGHT, CARD_WIDTH } from './configs/card-style';

const cardSample = ALL_CARD_LIST[10];

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
            <SecurityArea />
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
            <DeckArea />
            <TrashArea />
          </VStack>
        </View>
      </HStack>
    </ScrollView>
  );
};
