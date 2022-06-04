import { Ionicons } from '@expo/vector-icons';
import {
  Button,
  HStack,
  Input,
  ScrollView,
  Text,
  useClipboard,
  VStack,
} from 'native-base';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';

export const ConnectOpponentModalScreen: FC = () => {
  const { control, getValues } = useForm<{
    opponentId: string;
  }>();
  const { value, onCopy } = useClipboard();
  const id = 'xxxx-xxxx-xxxx-xxxx';

  return (
    <ScrollView>
      <VStack p="4" space={'8'}>
        <VStack>
          <Text fontWeight={'semibold'}>自分の接続ID</Text>
          <HStack justifyContent={'space-between'} alignItems={'center'}>
            <Text fontSize={'xl'}>{id}</Text>
            <Button
              size="sm"
              colorScheme={'gray'}
              variant={'outline'}
              onPress={() => {
                onCopy(id);
              }}
            >
              <Ionicons name="copy-outline" size={20} />
            </Button>
          </HStack>
        </VStack>
        <VStack space="4">
          <Controller
            control={control}
            name="opponentId"
            defaultValue=""
            render={({ field }) => {
              return (
                <>
                  <Text fontWeight={'semibold'}>相手の接続ID</Text>
                  <Input
                    mt="2"
                    type="text"
                    w="100%"
                    placeholder=""
                    fontSize={16}
                    fontWeight="semibold"
                    backgroundColor="white"
                    _focus={{ borderColor: 'gray.500' }}
                    value={field.value}
                    onChangeText={(value) => field.onChange(value)}
                  />
                </>
              );
            }}
          />
          <Button colorScheme={'gray'}>接続</Button>
        </VStack>
      </VStack>
    </ScrollView>
  );
};
