import { FC } from 'react';
import { Flex, Text } from 'native-base';

export const CountLabel: FC<{ count: number }> = ({ count }) => {
  return (
    <Flex
      justifyContent={'center'}
      alignItems={'center'}
      width={5}
      height={5}
      backgroundColor={'gray.600'}
      borderRadius={'xl'}
      position={'absolute'}
      top={'-4'}
      left={'-4'}
    >
      <Text color={'white'} fontSize="9">
        {count}
      </Text>
    </Flex>
  );
};
