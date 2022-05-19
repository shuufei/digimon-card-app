import { HStack, View, VStack } from 'native-base';
import { FC } from 'react';
import { BattleArea } from './battle-area';
import { DeckArea } from './deck-area';
import { DeckOpenArea } from './deck-open-area';
import { DigitamaArea } from './digitama-area';
import { SecurityArea } from './security-area';
import { SecurityOpenArea } from './security-open-area';
import { TrainingArea } from './training-area';
import { TrashArea } from './trash-area';

export const Board: FC = () => {
  return (
    <>
      <VStack>
        <HStack justifyContent={'flex-start'} p={2}>
          <SecurityOpenArea />
        </HStack>
        <HStack justifyContent={'flex-end'} p={2}>
          <DeckOpenArea />
        </HStack>
      </VStack>
      <HStack justifyContent={'space-between'} mt={4} pb={'240'}>
        <VStack>
          <View marginLeft={'-8'}>
            <SecurityArea />
          </View>
          <VStack marginLeft={'-4'} marginTop={2} space={1}>
            <DigitamaArea />
            <TrainingArea />
          </VStack>
        </VStack>
        <View flex={1}>
          <BattleArea />
        </View>
        <View>
          <VStack marginRight={'-4'} space={2}>
            <DeckArea />
            <TrashArea />
          </VStack>
        </View>
      </HStack>
    </>
  );
};
