import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Button, ScrollView, VStack } from 'native-base';
import { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CardTypeFilter } from '../components/container/card-type-filter';
import { CategoryFilter } from '../components/container/category-filter';
import { ColorFilter } from '../components/container/color-filter';
import { DigimonLevelFilter } from '../components/container/digimon-level-filter';
import { ParallelFilter } from '../components/container/parallel-filter';
import { storageKeys } from '../configs/storage';
import { RootParamList } from '../navigation';
import { actions, selectors } from '../store/card-list-filter-store';

export const CardListFilterModalScreen: FC = () => {
  const filterSettings = useSelector(selectors.selectSelf);
  const dispatch = useDispatch();

  const executeFilter = useCallback(async () => {
    await AsyncStorage.setItem(
      storageKeys.cardListFilterStore,
      JSON.stringify(filterSettings)
    );
    dispatch(actions.executeFilter());
  }, [filterSettings, dispatch]);

  const { setOptions, goBack, addListener } =
    useNavigation<NavigationProp<RootParamList>>();
  useEffect(() => {
    setOptions({
      headerRight: () => {
        return (
          <Button
            variant="ghost"
            colorScheme="blue"
            _pressed={{ background: '#f0f0f0' }}
            onPress={() => {
              goBack();
              executeFilter();
            }}
          >
            完了
          </Button>
        );
      },
    });

    addListener('beforeRemove', () => {
      executeFilter();
    });
  }, [executeFilter]);

  return (
    <ScrollView>
      <VStack space={4} px={4} pt={4} pb={20}>
        <ColorFilter />
        <CardTypeFilter />
        <DigimonLevelFilter />
        <CategoryFilter />
        <ParallelFilter />
      </VStack>
    </ScrollView>
  );
};
