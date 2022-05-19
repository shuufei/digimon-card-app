import { HStack, ScrollView, View, VStack } from 'native-base';
import { useDispatchSetSigendQueryStrings } from '../../hooks/use-dispatch-set-signed-query-strings';
import { BattleArea } from './components/battle-area';
import { DeckArea } from './components/deck-area';
import { DeckOpenArea } from './components/deck-open-area';
import { DigitamaArea } from './components/digitama-area';
import { HandAreaSheet } from './components/hand-area-sheet';
import { Memory } from './components/memory';
import { SecurityArea } from './components/security-area';
import { SecurityCheckAreaSheet } from './components/security-check-area-sheet';
import { SecurityOpenArea } from './components/security-open-area';
import { TrainingArea } from './components/training-area';
import { TrashArea } from './components/trash-area';
import { TrashCheckAreaSheet } from './components/trash-check-area-sheet';

export const VSScreen = () => {
  useDispatchSetSigendQueryStrings();

  return (
    <>
      <ScrollView>
        <VStack>
          <View p={2}>
            <Memory />
          </View>
          <View>
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
          </View>
        </VStack>
      </ScrollView>
      <HandAreaSheet />
      <SecurityCheckAreaSheet />
      <TrashCheckAreaSheet />
    </>
  );
};
