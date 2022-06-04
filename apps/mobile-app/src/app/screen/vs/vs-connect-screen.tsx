import { FC, useCallback } from 'react';
import { ScrollView, VStack, HStack, Text, Button, View } from 'native-base';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { VsParamList } from '../../navigation';

export const VsConnectScreen: FC = () => {
  const { navigate } = useNavigation<NavigationProp<VsParamList>>();

  const navigateToVsBoardScreen = useCallback(() => {
    navigate('VsBoard');
  }, [navigate]);

  return (
    <ScrollView>
      <VStack p={'4'} space={'3'}>
        <HStack>
          <Text>相手のID</Text>
        </HStack>
        <View>
          <Button onPress={navigateToVsBoardScreen}>接続</Button>
        </View>
      </VStack>
    </ScrollView>
  );
};
