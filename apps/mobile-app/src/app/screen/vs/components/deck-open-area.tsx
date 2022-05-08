import { Ionicons } from '@expo/vector-icons';
import { Button, HStack, Menu, ScrollView, Text, View } from 'native-base';
import { FC, useState } from 'react';
import { ALL_CARD_LIST } from '../../../configs/all-card-list';
import { DeckOpenAreaCard } from './presentation/deck-open-area-card';

const DUMMY_DECK_OPEN_CARD_LIST = new Array(10)
  .fill(null)
  .map((_, i) => ALL_CARD_LIST[i + 150]);

export const DeckOpenArea: FC = () => {
  const [cardList, setCardList] = useState(DUMMY_DECK_OPEN_CARD_LIST);
  return (
    <View p={1}>
      <HStack justifyContent={'space-between'} alignItems={'center'}>
        <Text fontSize={'xs'}>山札オープン: {cardList.length}</Text>
        <Menu
          placement="bottom right"
          trigger={(triggerProps) => {
            return (
              <Button
                size="xs"
                variant="ghost"
                _pressed={{
                  background: '#f0f0f0',
                }}
                colorScheme="blue"
                {...triggerProps}
              >
                <Ionicons
                  name="ellipsis-horizontal-circle-outline"
                  size={20}
                  color={'#000000'}
                />
              </Button>
            );
          }}
        >
          <Menu.Item>全て破棄</Menu.Item>
          <Menu.Item>全て手札に追加</Menu.Item>
          <Menu.Item>全て山札の下に戻す</Menu.Item>
          <Menu.Item>全て山札の上に戻す</Menu.Item>
        </Menu>
      </HStack>
      <ScrollView horizontal={true} mt={2} overflow={'visible'}>
        <HStack space={1} overflow={'visible'}>
          {cardList.map((card) => {
            return <DeckOpenAreaCard key={card.imgFileName} card={card} />;
          })}
        </HStack>
      </ScrollView>
    </View>
  );
};
