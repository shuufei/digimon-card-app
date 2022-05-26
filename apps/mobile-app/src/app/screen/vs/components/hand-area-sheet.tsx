import BottomSheet from '@gorhom/bottom-sheet';
import { HStack, View, Text, ScrollView } from 'native-base';
import { FC, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { ALL_CARD_LIST } from '../../../configs/all-card-list';
import { HandAreaCard } from './hand-area-card';

const DUMMY_HAND_CARD_LIST = new Array(30)
  .fill(null)
  .map((_, i) => ALL_CARD_LIST[i + 120]);

export const HandAreaSheet: FC = () => {
  const [cardList, setCardList] = useState(DUMMY_HAND_CARD_LIST);
  const snapPoints = useMemo(() => ['20%', '50%', '75%'], []);

  return (
    <BottomSheet index={0} snapPoints={snapPoints} style={styles.bottonSheet}>
      <ScrollView>
        <View p={4} pb={8}>
          <HStack>
            <Text>手札: {cardList.length}</Text>
          </HStack>
          <HStack flexWrap={'wrap'} space={2} mt={4}>
            {cardList.map((card, i) => {
              return (
                <View key={`${card.imgFileName}-${i}`} pb={2}>
                  <HandAreaCard card={card} />
                </View>
              );
            })}
          </HStack>
        </View>
      </ScrollView>
    </BottomSheet>
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
