import { HStack, ScrollView, Text, View } from 'native-base';
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
      <Text fontSize={'xs'}>山札オープン: {cardList.length}</Text>
      <ScrollView horizontal={true} mt={1} overflow={'visible'}>
        <HStack space={1} overflow={'visible'}>
          {cardList.map((card) => {
            return <DeckOpenAreaCard key={card.imgFileName} card={card} />;
          })}
        </HStack>
      </ScrollView>
    </View>
  );
};
