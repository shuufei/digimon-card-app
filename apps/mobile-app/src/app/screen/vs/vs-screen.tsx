import { ScrollView, View, VStack } from 'native-base';
import { useDispatchSetSigendQueryStrings } from '../../hooks/use-dispatch-set-signed-query-strings';
import { Board } from './components/board';
import { HandAreaSheet } from './components/hand-area-sheet';
import { Memory } from './components/memory';
import { SecurityCheckAreaSheet } from './components/security-check-area-sheet';
import { TrashCheckAreaSheet } from './components/trash-check-area-sheet';
import { BoardContext } from './context/board-context';

export const VSScreen = () => {
  useDispatchSetSigendQueryStrings();

  return (
    <>
      <ScrollView>
        <VStack pb={'240'}>
          <View style={{ transform: [{ rotate: '180deg' }] }}>
            <BoardContext.Provider value={{ side: 'opponent' }}>
              <Board />
            </BoardContext.Provider>
          </View>
          <View p={2}>
            <Memory />
          </View>
          <View>
            <BoardContext.Provider value={{ side: 'myself' }}>
              <Board />
            </BoardContext.Provider>
          </View>
        </VStack>
      </ScrollView>
      <HandAreaSheet />
      <SecurityCheckAreaSheet />
      <TrashCheckAreaSheet />
    </>
  );
};
