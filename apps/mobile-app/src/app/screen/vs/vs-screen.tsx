import { ScrollView, View, VStack } from 'native-base';
import { useDispatchSetSigendQueryStrings } from '../../hooks/use-dispatch-set-signed-query-strings';
import { Board } from './components/board';
import { HandAreaSheet } from './components/hand-area-sheet';
import { Memory } from './components/memory';
import { SecurityCheckAreaSheet } from './components/security-check-area-sheet';
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
            <Board />
          </View>
        </VStack>
      </ScrollView>
      <HandAreaSheet />
      <SecurityCheckAreaSheet />
      <TrashCheckAreaSheet />
    </>
  );
};
