import dayjs from 'dayjs';
import { first } from 'lodash';
import { Text, View } from 'native-base';
import { FC } from 'react';
import { cardImageAspectRate } from '../../domains/card';
import { Deck, getKeyCard } from '../../domains/deck';
import { Card } from './card';

export const DeckItem: FC<{ deck: Deck }> = ({ deck }) => {
  const keyCard = deck.keyCard ?? getKeyCard(deck);
  const width = 85;
  const height = width * cardImageAspectRate;
  return (
    <View px={2} pt={2} pb={6} alignItems="center">
      {keyCard ? (
        <Card
          width={width}
          height={height}
          card={keyCard}
          isPressable={false}
        />
      ) : (
        <View
          width={width}
          height={height}
          justifyContent="center"
          alignItems="center"
          backgroundColor="gray.400"
          borderRadius="sm"
        >
          <Text fontSize={9} color="white" fontWeight="semibold">
            NONE KEYCARD
          </Text>
        </View>
      )}
      <Text
        fontSize={12}
        fontWeight="semibold"
        marginTop="2"
        maxWidth={20}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {deck.title}
      </Text>
      <Text fontSize={12} fontWeight="medium" color="gray.400">
        {dayjs(deck.createdAt).format('YYYY/MM/DD')}
      </Text>
    </View>
  );
};
