import { DrawerNavigationOptions } from '@react-navigation/drawer';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { HStack, ScrollView, View, VStack } from 'native-base';
import { useEffect } from 'react';
import { useDispatchSetSigendQueryStrings } from '../../hooks/use-dispatch-set-signed-query-strings';
import { RootParamList } from '../../navigation';
import { Board } from './components/board';
import { HandAreaSheet } from './components/hand-area-sheet';
import { Memory } from './components/memory';
import { SecurityCheckAreaSheet } from './components/security-check-area-sheet';
import { TrashCheckAreaSheet } from './components/trash-check-area-sheet';
import { VsMenu } from './components/vs-menu';
import { BoardContext } from './context/board-context';

export const VsBoardScreen = () => {
  useDispatchSetSigendQueryStrings();

  const { setOptions } = useNavigation<NavigationProp<RootParamList>>();

  useEffect(() => {
    const options: DrawerNavigationOptions = {
      headerShown: false,
    };
    setOptions(options);
  }, [setOptions]);

  return (
    <>
      <ScrollView>
        <HStack pt={'10'} px={'3'} justifyContent={'flex-end'}>
          <VsMenu />
        </HStack>

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
