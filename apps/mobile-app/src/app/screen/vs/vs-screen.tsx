import { Ionicons } from '@expo/vector-icons';
import { DrawerNavigationOptions } from '@react-navigation/drawer';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Button, HStack, Menu, ScrollView, View, VStack } from 'native-base';
import { useEffect } from 'react';
import { MenuItem } from '../../components/presentation/menu-item';
import { useDispatchSetSigendQueryStrings } from '../../hooks/use-dispatch-set-signed-query-strings';
import { RootParamList } from '../../navigation';
import { Board } from './components/board';
import { HandAreaSheet } from './components/hand-area-sheet';
import { Memory } from './components/memory';
import { SecurityCheckAreaSheet } from './components/security-check-area-sheet';
import { TrashCheckAreaSheet } from './components/trash-check-area-sheet';
import { BoardContext } from './context/board-context';

export const VSScreen = () => {
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
          <Menu
            trigger={(triggerProps) => {
              return (
                <Button
                  size="xs"
                  variant="ghost"
                  _pressed={{
                    background: '#f0f0f0',
                  }}
                  {...triggerProps}
                >
                  <Ionicons
                    name="ellipsis-horizontal-circle-outline"
                    size={24}
                  />
                </Button>
              );
            }}
            width="160"
            backgroundColor="white"
            px={2}
            mr={4}
          >
            <MenuItem label="デッキを選択" />
            <MenuItem label="対戦セットアップ" />
            <MenuItem label="接続を切断" color="red.600" />
          </Menu>
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
