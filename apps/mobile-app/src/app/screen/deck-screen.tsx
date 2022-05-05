import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SegmentControl from '@react-native-segmented-control/segmented-control';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { API } from 'aws-amplify';
import { Button, Menu, Text, View } from 'native-base';
import { FC, useEffect, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { CardList } from '../components/container/card-list';
import { DeckList } from '../components/container/deck-list';
import { DeckScreenSheet } from '../components/container/deck-screen-sheet';
import { useValueRef } from '../components/hooks/use-value-ref';
import { ALL_CARD_LIST } from '../configs/all-card-list';
import { DECK_SCREEN_TAB } from '../configs/deck-screen-tabs';
import { storageKeys } from '../configs/storage';
import { Category } from '../domains/card';
import { Deck } from '../domains/deck';
import { RootParamList } from '../navigation';
import * as authStore from '../store/auth-store';
import {
  actions as cardListFilterStoreActions,
  selectors as cardListFilterStoreSelectors,
  State as CardListFilterState,
} from '../store/card-list-filter-store';
import * as deckStore from '../store/deck-store';

const useInitStore = () => {
  const dispatch = useDispatch();

  /**
   * card list filter store
   */
  useEffect(() => {
    const dispatchInitCardListFilterStore = async () => {
      try {
        const value = await AsyncStorage.getItem(
          storageKeys.cardListFilterStore
        );
        const filterSettings =
          value && (JSON.parse(value) as CardListFilterState);
        filterSettings &&
          dispatch(cardListFilterStoreActions.set({ state: filterSettings }));
        dispatch(cardListFilterStoreActions.executeFilter());
      } catch (error) {
        console.error('Init Store Error: card list filter store: ', error);
      }
    };
    dispatchInitCardListFilterStore();
  }, [dispatch]);

  /**
   * deck store
   */
  useEffect(() => {
    const dispatchInitDeckStore = async () => {
      try {
        const value = await AsyncStorage.getItem(storageKeys.decks);
        const decks = value && (JSON.parse(value) as Deck[]);
        decks &&
          dispatch(
            deckStore.actions.set({
              state: {
                decks,
                isCreateMode: false,
              },
            })
          );
      } catch (error) {
        console.error('Init Store Error: deck store: ', error);
      }
    };
    dispatchInitDeckStore();
  }, [dispatch]);
};

const useExecuteCardListFilter = () => {
  const executeFilterTimestamp = useSelector(
    cardListFilterStoreSelectors.executeFilterTimestamp
  );
  const filteredColorsRef = useValueRef(
    useSelector(cardListFilterStoreSelectors.colorsSelector)
  );
  const filteredCardTypesRef = useValueRef(
    useSelector(cardListFilterStoreSelectors.cardTypesSelector)
  );
  const filteredLvListRef = useValueRef(
    useSelector(cardListFilterStoreSelectors.lvListSelector)
  );
  const filteredCategoriesRef = useValueRef(
    useSelector(cardListFilterStoreSelectors.categoriesSelector)
  );
  const filteredIncludesParallelRef = useValueRef(
    useSelector(cardListFilterStoreSelectors.includesParallelSelector)
  );

  const filteredCardList = useMemo(() => {
    return ALL_CARD_LIST.filter((card) => {
      const isColorMatch = !!card.colors.find((color) => {
        return filteredColorsRef.current.includes(color);
      });
      if (!isColorMatch) {
        return false;
      }
      const isCardTypeMatch = filteredCardTypesRef.current.includes(
        card.cardtype
      );
      if (!isCardTypeMatch) {
        return false;
      }
      const isLvMatch = card.lv && filteredLvListRef.current.includes(card.lv);
      if (!isLvMatch) {
        return false;
      }
      const isCategoryMatch = filteredCategoriesRef.current.includes(
        card.category as Category
      );
      if (!isCategoryMatch) {
        return false;
      }
      const isIncludesParallelMatch =
        card.parallel !== undefined
          ? filteredIncludesParallelRef.current
          : true;
      return (
        isColorMatch &&
        isCardTypeMatch &&
        isLvMatch &&
        isCategoryMatch &&
        isIncludesParallelMatch
      );
    });
  }, [
    executeFilterTimestamp,
    filteredColorsRef,
    filteredCardTypesRef,
    filteredLvListRef,
    filteredCategoriesRef,
    filteredIncludesParallelRef,
  ]);

  return filteredCardList;
};

const CardListFilterButton: FC<{ onPress: () => void }> = ({ onPress }) => {
  return (
    <Button
      size="xs"
      variant="ghost"
      _pressed={{
        background: '#f0f0f0',
      }}
      onPress={onPress}
    >
      <Ionicons name="ios-filter" size={24} />
    </Button>
  );
};

const DeckMenuButton: FC<{ onPress: () => void }> = ({ onPress }) => {
  const dispatch = useDispatch();
  return (
    <Menu
      trigger={(triggerProps) => {
        return (
          <Button
            size="xs"
            variant="ghost"
            _pressed={{
              background: '#f0f0f0',
            }}
            onPress={onPress}
            {...triggerProps}
          >
            <Ionicons name="ellipsis-horizontal-circle-outline" size={24} />
          </Button>
        );
      }}
      width="160"
      backgroundColor="white"
      px={2}
      mr={4}
    >
      <Menu.Item
        borderRadius={3}
        onPress={() => {
          dispatch(deckStore.actions.selectDeck({ deckId: undefined }));
          dispatch(deckStore.actions.setCreateMode({ isCreateMode: true }));
        }}
      >
        <Text fontSize={14} fontWeight="semibold">
          新規作成
        </Text>
      </Menu.Item>
      <Menu.Item borderRadius={3}>
        <Text fontSize={14} fontWeight="semibold">
          インポート
        </Text>
      </Menu.Item>
    </Menu>
  );
};

export const DeckScreen = () => {
  useInitStore();

  const { navigate, setOptions } =
    useNavigation<NavigationProp<RootParamList>>();
  const dispatch = useDispatch();

  const filteredCardList = useExecuteCardListFilter();
  const currentTab = useSelector(deckStore.selectors.currentTabSelector);
  const decks = useSelector(deckStore.selectors.decksSelector);

  useEffect(() => {
    const saveDecks = async () => {
      await AsyncStorage.setItem(storageKeys.decks, JSON.stringify(decks));
    };
    saveDecks();
  }, [decks]);

  useEffect(() => {
    const setSignedQueryStrings = async () => {
      const res: { credentials: string } = await API.get(
        'v1',
        '/v1/credentials',
        {}
      );
      console.log('--- signed query strings: ', res.credentials);
      dispatch(
        authStore.actions.setSignedQueryString({
          signedQueryStrings: res.credentials,
        })
      );
    };
    setSignedQueryStrings();
  }, [dispatch]);

  useEffect(() => {
    setOptions({
      title: 'デッキ構築',
      headerTitle: () => {
        const tabTitles = ['デッキ', 'カードリスト'];
        return (
          <SegmentControl
            values={tabTitles}
            selectedIndex={DECK_SCREEN_TAB.deck}
            style={{
              width: 200,
            }}
            onValueChange={(value) => {
              dispatch(
                deckStore.actions.setTab({
                  tab:
                    (tabTitles.findIndex((title) => title === value) ?? 0) ===
                    DECK_SCREEN_TAB.deck
                      ? 'deck'
                      : 'cardList',
                })
              );
            }}
          />
        );
      },
      headerRight: () => {
        return (
          <View paddingRight={2}>
            {currentTab === 'deck' ? (
              <DeckMenuButton onPress={() => {}} />
            ) : (
              <CardListFilterButton
                onPress={() => {
                  navigate('DeckFilterModal');
                }}
              />
            )}
          </View>
        );
      },
    });
  }, [setOptions, currentTab]);

  return (
    <View flex={1}>
      <View display={currentTab === 'deck' ? 'flex' : 'none'}>
        <DeckList />
      </View>
      <View display={currentTab === 'cardList' ? 'flex' : 'none'}>
        <CardList cardList={filteredCardList} />
      </View>
      <DeckScreenSheet />
    </View>
  );
};

const styles = StyleSheet.create({
  bottonSheet: {
    shadowColor: '#000000',
    shadowOpacity: 0.03,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
});
