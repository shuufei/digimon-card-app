import * as Haptics from 'expo-haptics';
import { Divider, Pressable, View } from 'native-base';
import React, { FC } from 'react';

export const FilterItem: FC<{
  showDivider?: boolean;
  isPressable?: boolean;
  onPress?: () => void;
}> = React.memo(
  ({ showDivider = true, isPressable = true, onPress, children }) => {
    return isPressable ? (
      <Pressable
        _pressed={{ backgroundColor: 'gray.100' }}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          onPress && onPress();
        }}
        overflow="hidden"
      >
        {children}
        {showDivider && <Divider marginLeft={4} />}
      </Pressable>
    ) : (
      <View>
        {children}
        {showDivider && <Divider marginLeft={4} />}
      </View>
    );
  }
);
