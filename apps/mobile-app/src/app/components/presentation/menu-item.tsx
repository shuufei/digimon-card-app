import { FC } from 'react';
import { Menu, Text } from 'native-base';
import React from 'react';
import { ColorType } from 'native-base/lib/typescript/components/types';

export const MenuItem: FC<{
  label: string;
  color?: ColorType;
  onPress?: () => void;
}> = React.memo(({ label, color = 'gray.900', onPress }) => {
  return (
    <Menu.Item
      borderRadius={3}
      onPress={() => {
        onPress && onPress();
      }}
    >
      <Text fontSize={14} fontWeight="semibold" color={color}>
        {label}
      </Text>
    </Menu.Item>
  );
});
