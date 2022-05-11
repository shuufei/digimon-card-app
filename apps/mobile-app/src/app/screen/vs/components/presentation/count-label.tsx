import { Flex, Text } from 'native-base';
import { FC, memo } from 'react';

export const CountLabel: FC<{
  count: number;
  position?: 'topLeft' | 'topRight';
}> = memo(({ count, position = 'topLeft' }) => {
  const positionStyle =
    position === 'topLeft'
      ? { top: '-4', left: '-4' }
      : { top: '-4', right: '-4' };
  return (
    <Flex
      justifyContent={'center'}
      alignItems={'center'}
      width={5}
      height={5}
      backgroundColor={'gray.600'}
      borderRadius={'xl'}
      position={'absolute'}
      {...positionStyle}
    >
      <Text color={'white'} fontSize="9">
        {count}
      </Text>
    </Flex>
  );
});
