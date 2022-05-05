import { HStack, Pressable, View, ScrollView } from 'native-base';
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions, selectors } from '../../store/deck-store';
import { DeckItem } from '../presentation/deck-item';

export const DeckList: FC = React.memo(() => {
  const dispatch = useDispatch();
  const decks = useSelector(selectors.decksSelector);
  const sortedDecks = [...decks].sort((v1, v2) => {
    if (v1.createdAt > v2.createdAt) {
      return 1;
    }
    if (v1.createdAt < v2.createdAt) {
      return -1;
    }
    return 0;
  });

  return (
    <ScrollView>
      <View justifyContent="center" pb={20}>
        <HStack p={4} space={3} flexWrap="wrap">
          {sortedDecks.map((deck) => {
            return (
              <Pressable
                key={deck.id}
                borderRadius="sm"
                _pressed={{
                  background: 'gray.200',
                }}
                onPress={() => {
                  dispatch(actions.selectDeck({ deckId: deck.id }));
                }}
              >
                <DeckItem deck={deck} />
              </Pressable>
            );
          })}
        </HStack>
      </View>
    </ScrollView>
  );
});
