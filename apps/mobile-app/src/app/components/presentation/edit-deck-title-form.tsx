import { Button, Heading, HStack, Input, View } from 'native-base';
import React, { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Deck } from '../../domains/deck';

export const EditDeckTitleForm: FC<{
  defaultValue: Deck['title'];
  onCancel?: () => void;
  onUpdate?: (title: string) => void;
}> = React.memo(({ defaultValue, onCancel, onUpdate }) => {
  const { control, getValues } = useForm<{ title: string }>();

  return (
    <View px={4} pt={2} pb={8}>
      <Heading fontSize={14} textAlign="center">
        タイトル変更
      </Heading>
      <Controller
        control={control}
        name="title"
        defaultValue={defaultValue}
        render={({ field }) => {
          return (
            <Input
              marginTop={6}
              w="100%"
              placeholder="デッキ名を入力"
              fontSize={16}
              fontWeight="semibold"
              _focus={{ borderColor: 'gray.500' }}
              value={field.value}
              onChangeText={(value) => field.onChange(value)}
            />
          );
        }}
      />
      <HStack space={1} justifyContent="flex-end" marginTop={4}>
        <Button
          variant="ghost"
          colorScheme="blue"
          onPress={() => {
            onCancel && onCancel();
          }}
        >
          キャンセル
        </Button>
        <Button
          colorScheme="blue"
          px={6}
          ml={2}
          onPress={() => {
            const title = getValues('title');
            onUpdate && onUpdate(title);
          }}
        >
          更新
        </Button>
      </HStack>
    </View>
  );
});
