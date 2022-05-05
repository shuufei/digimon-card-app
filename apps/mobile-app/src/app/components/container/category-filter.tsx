import { last } from 'lodash';
import { Text, View } from 'native-base';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Category,
  categoryList,
  convertToDisplayCategoryFromCategory,
} from '../../domains/card';
import { actions, selectors } from '../../store/card-list-filter-store';
import { FilterCheckItem } from '../presentation/filter-check-item';

export const CategoryFilter = React.memo(() => {
  const dispatch = useDispatch();
  const filteredCategories = useSelector(selectors.categoriesSelector);
  const setFilteredCategories = useCallback((categories: Category[]) => {
    dispatch(actions.updateCategories({ categories }));
  }, []);

  const toggleFilteredColor = useCallback(
    (lv: Category) => {
      const includes = filteredCategories.includes(lv);
      const updated = includes
        ? filteredCategories.filter((v) => v !== lv)
        : [...filteredCategories, lv];
      setFilteredCategories(updated);
    },
    [filteredCategories, setFilteredCategories]
  );

  return (
    <View>
      <Text fontSize={14} color="gray.500" fontWeight="bold" paddingLeft={2}>
        収録ブースター・スタートデッキ
      </Text>
      <View backgroundColor="white" borderRadius={5} marginTop={1}>
        {categoryList.map((category) => {
          return (
            <FilterCheckItem
              key={category}
              checked={filteredCategories.includes(category)}
              showDivider={category !== last(categoryList)}
              isPressable={true}
              onPress={() => toggleFilteredColor(category)}
            >
              <View display="flex" alignItems="center" flexDirection="row">
                <Text fontSize={14} color="black" fontWeight="semibold">
                  {convertToDisplayCategoryFromCategory(category)}
                </Text>
              </View>
            </FilterCheckItem>
          );
        })}
      </View>
    </View>
  );
});
