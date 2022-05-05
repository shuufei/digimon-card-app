import { last } from 'lodash';
import { Text, View } from 'native-base';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Color,
  colorList,
  convertToColorCodeFromColor,
  convertToDisplayColorFromColor,
} from '../../domains/card';
import { actions, selectors } from '../../store/card-list-filter-store';
import { FilterCheckItem } from '../presentation/filter-check-item';

export const convertToBorderColorCodeFromColor = (color: Color): string => {
  switch (color) {
    case '1_red':
      return '#e7052c';
    case '2_blue':
      return '#2697e1';
    case '3_yellow':
      return '#fde105';
    case '4_green':
      return '#2a9b69';
    case '5_black':
      return '#211715';
    case '6_purple':
      return '#6356a3';
    case '7_white':
      return '#e0e0e0';
    default:
      return '#a0a0a0';
  }
};

export const ColorFilter = React.memo(() => {
  const dispatch = useDispatch();
  const filteredColors = useSelector(selectors.colorsSelector);

  const setFilteredColors = useCallback(
    (colors: Color[]) => {
      dispatch(actions.updateColors({ colors }));
    },
    [dispatch]
  );

  const toggleFilteredColor = useCallback(
    (color: Color) => {
      const includes = filteredColors.includes(color);
      const updated = includes
        ? filteredColors.filter((v) => v !== color)
        : [...filteredColors, color];
      setFilteredColors(updated);
    },
    [filteredColors, setFilteredColors]
  );

  return (
    <View>
      <Text fontSize={14} color="gray.500" fontWeight="bold" paddingLeft={2}>
        カラー
      </Text>
      <View backgroundColor="white" borderRadius={5} marginTop={1}>
        {colorList.map((color) => {
          return (
            <FilterCheckItem
              key={color}
              checked={filteredColors.includes(color)}
              showDivider={color !== last(colorList)}
              isPressable={true}
              onPress={() => toggleFilteredColor(color)}
            >
              <View display="flex" alignItems="center" flexDirection="row">
                <View
                  width={14}
                  height={14}
                  backgroundColor={convertToColorCodeFromColor(color)}
                  borderColor={convertToBorderColorCodeFromColor(color)}
                  borderStyle="solid"
                  borderWidth={1}
                  borderRadius={14}
                ></View>
                <Text
                  marginLeft={2}
                  fontSize={14}
                  color="black"
                  fontWeight="semibold"
                >
                  {convertToDisplayColorFromColor(color)}
                </Text>
              </View>
            </FilterCheckItem>
          );
        })}
      </View>
    </View>
  );
});
