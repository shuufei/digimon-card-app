import { last } from 'lodash';
import { Text, View } from 'native-base';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CardType,
  cardTypeList,
  convertToDisplayCardTypeFromCardType,
} from '../../domains/card';
import { actions, selectors } from '../../store/card-list-filter-store';
import { FilterCheckItem } from '../presentation/filter-check-item';

export const CardTypeFilter = React.memo(() => {
  const dispatch = useDispatch();
  const filteredCardTypes = useSelector(selectors.cardTypesSelector);

  const setFilteredCardTypes = useCallback(
    (cardTypes: CardType[]) => {
      dispatch(actions.updateCardTypes({ cardTypes }));
    },
    [dispatch]
  );

  const toggleFilteredColor = useCallback(
    (cardType: CardType) => {
      const includes = filteredCardTypes.includes(cardType);
      const updated = includes
        ? filteredCardTypes.filter((v) => v !== cardType)
        : [...filteredCardTypes, cardType];
      setFilteredCardTypes(updated);
    },
    [filteredCardTypes, setFilteredCardTypes]
  );

  return (
    <View>
      <Text fontSize={14} color="gray.500" fontWeight="bold" paddingLeft={2}>
        カードタイプ
      </Text>
      <View backgroundColor="white" borderRadius={5} marginTop={1}>
        {cardTypeList.map((cardType) => {
          return (
            <FilterCheckItem
              key={cardType}
              checked={filteredCardTypes.includes(cardType)}
              showDivider={cardType !== last(cardTypeList)}
              isPressable={true}
              onPress={() => toggleFilteredColor(cardType)}
            >
              <View display="flex" alignItems="center" flexDirection="row">
                <Text fontSize={14} color="black" fontWeight="semibold">
                  {convertToDisplayCardTypeFromCardType(cardType)}
                </Text>
              </View>
            </FilterCheckItem>
          );
        })}
      </View>
    </View>
  );
});
