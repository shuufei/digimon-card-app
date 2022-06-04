import { useNavigation } from '@react-navigation/native';
import { HStack, Pressable, ScrollView, View } from 'native-base';
import { FC, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeckItem } from '../components/presentation/deck-item';
import { Deck } from '../domains/deck';
import * as deckStore from '../store/deck-store';
import * as vsStore from '../store/vs-store';

export const SelectDeckModalScreen: FC = () => {
  const decks = useSelector(deckStore.selectors.decksSelector);
  const sortedDecks = useMemo(
    () =>
      [...decks].sort((v1, v2) => {
        if (v1.createdAt > v2.createdAt) {
          return 1;
        }
        if (v1.createdAt < v2.createdAt) {
          return -1;
        }
        return 0;
      }),
    [decks]
  );
  const dispatch = useDispatch();
  const { goBack } = useNavigation();

  const selectDeck = useCallback(
    (deck: Deck) => {
      dispatch(vsStore.actions.selectDeck({ selectedDeck: deck }));
      goBack();
    },
    [dispatch, goBack]
  );

  return (
    <ScrollView>
      <View p={2} pb={8}>
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
                  selectDeck(deck);
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
};
