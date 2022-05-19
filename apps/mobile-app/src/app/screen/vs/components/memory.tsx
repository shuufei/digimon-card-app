import { FC, memo, useState } from 'react';
import { HStack, Text, Pressable, ScrollView } from 'native-base';
import { reverse } from 'lodash';

const MemoryButton: FC<{
  label: string;
  isActive?: boolean;
  isInversion?: boolean;
  onPress?: () => void;
}> = memo(({ label, isActive = false, isInversion = false, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <HStack
        height={'8'}
        width={'8'}
        backgroundColor={isActive ? 'white' : 'gray.500'}
        borderRadius={'full'}
        justifyContent={'center'}
        alignItems={'center'}
        style={{ transform: isInversion ? [{ rotate: '180deg' }] : [] }}
      >
        <Text>{label}</Text>
      </HStack>
    </Pressable>
  );
});

export const Memory: FC = memo(() => {
  const [memory, setMemory] = useState(0);
  const [turn, setTurn] = useState<'opponent' | 'myself'>('myself');

  const opponentMemories = reverse(
    new Array(10).fill(1).map((v, i) => String(v + i))
  );
  const mineMemories = new Array(10).fill(1).map((v, i) => String(v + i));
  return (
    <ScrollView
      horizontal={true}
      backgroundColor={'gray.800'}
      borderRadius={'sm'}
    >
      <HStack p={2} space={2}>
        {opponentMemories.map((value) => {
          return (
            <MemoryButton
              key={value}
              label={value}
              isInversion={true}
              isActive={turn === 'opponent' && String(memory) === value}
              onPress={() => {
                setMemory(Number(value));
                setTurn('opponent');
              }}
            />
          );
        })}
        <MemoryButton
          label={'0'}
          isActive={memory === 0}
          onPress={() => {
            setMemory(0);
          }}
        />
        {mineMemories.map((value) => {
          return (
            <MemoryButton
              key={value}
              label={value}
              isActive={turn === 'myself' && String(memory) === value}
              onPress={() => {
                setMemory(Number(value));
                setTurn('myself');
              }}
            />
          );
        })}
      </HStack>
    </ScrollView>
  );
});
