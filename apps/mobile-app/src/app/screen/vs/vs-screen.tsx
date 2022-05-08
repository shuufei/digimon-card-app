import { Button, HStack, ScrollView, View, VStack } from 'native-base';
import { Card } from '../../components/presentation/card';
import { ALL_CARD_LIST } from '../../configs/all-card-list';
import { useDispatchSetSigendQueryStrings } from '../../hooks/use-dispatch-set-signed-query-strings';
import { DeckArea } from './components/deck-area';
import { DeckOpenArea } from './components/deck-open-area';
import { DigitamaArea } from './components/digitama-area';
import { SecurityArea } from './components/security-area';
import { SecurityOpenArea } from './components/security-open-area';
import { TrainingArea } from './components/training-area';
import { TrashArea } from './components/trash-area';
import { CARD_HEIGHT, CARD_WIDTH } from './configs/card-style';

const cardSample = ALL_CARD_LIST[10];

export const VSScreen = () => {
  useDispatchSetSigendQueryStrings();

  return (
    <ScrollView>
      <VStack>
        <HStack justifyContent={'flex-start'} p={2}>
          <SecurityOpenArea />
        </HStack>
        <HStack justifyContent={'flex-end'} p={2}>
          <DeckOpenArea />
        </HStack>
      </VStack>
      <HStack justifyContent={'space-between'} mt={4}>
        <VStack>
          <View marginLeft={'-8'}>
            <SecurityArea />
          </View>
          <VStack marginLeft={'-4'} marginTop={2} space={1}>
            <DigitamaArea />
            <TrainingArea />
          </VStack>
        </VStack>
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
