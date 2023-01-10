import BottomSheet from '@gorhom/bottom-sheet';
import { HStack, ScrollView, Text, View } from 'native-base';
import { FC, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import * as vsStore from '../../../store/vs-store';
import { HandAreaCard } from './hand-area-card';

export const HandAreaSheet: FC = () => {
  const cardList = useSelector(vsStore.selectors.myselfHandSelector);
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
                <View key={`${card.data.imgFileName}-${i}`} pb={2}>
                  <HandAreaCard card={card.data} />
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
