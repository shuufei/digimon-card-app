import { FC } from 'react';
import { CardInfo, cardImageAspectRate } from '../../domains/card';
import { Deck } from '../../domains/deck';
import { View, Heading, HStack, Button, ScrollView } from 'native-base';
import { Card } from './card';
export const SelectKeyCardForDeck: FC<{
  deck: Deck;
  onCancel?: () => void;
  onSelect?: (card: CardInfo) => void;
}> = ({ deck, onCancel, onSelect }) => {
  const cards = Object.values(deck.cards)
    .map((categoriezedNo) => {
      return Object.values(categoriezedNo).map((data) => {
        return data.card;
      });
    })
    .flat();
  return (
    <View px={4} pt={2} pb={8}>
      <Heading fontSize={14} textAlign="center">
        キーカード選択
      </Heading>
      <View flexDirection="row" justifyContent="space-between">
        <Button
          variant="ghost"
          colorScheme="blue"
          onPress={() => {
            onCancel && onCancel();
          }}
        >
          キャンセル
        </Button>
      </View>
      <ScrollView>
        <HStack
          flexWrap="wrap"
          justifyContent="flex-start"
          marginTop={4}
          pb={20}
        >
          {cards.map((card) => {
            return (
              <View p={2} key={card.imgFileName}>
                <Card
                  card={card}
                  width={90}
                  height={90 * cardImageAspectRate}
                />
                <Button
                  variant="outline"
                  colorScheme="gray"
                  marginTop={2}
                  onPress={() => {
                    onSelect && onSelect(card);
                  }}
                >
                  選択
                </Button>
              </View>
            );
          })}
        </HStack>
      </ScrollView>
    </View>
  );
};
