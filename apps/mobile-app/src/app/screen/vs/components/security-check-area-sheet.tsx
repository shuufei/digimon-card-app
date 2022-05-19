import BottomSheet from '@gorhom/bottom-sheet';
import { Button, HStack, ScrollView, Text, View } from 'native-base';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ALL_CARD_LIST } from '../../../configs/all-card-list';
import * as vsStore from '../../../store/vs-store';
import { SecurityCheckAreaCard } from './security-check-area-card';

const DUMMY_SECURITY_CHECK_CARD_LIST = new Array(5)
  .fill(null)
  .map((_, i) => ALL_CARD_LIST[i + 120]);

export const SecurityCheckAreaSheet: FC = () => {
  const [cardList, setCardList] = useState(DUMMY_SECURITY_CHECK_CARD_LIST);
  const uiState = useSelector(vsStore.selectors.uiStateSelector);
  const snapPoints = useMemo(() => ['10%', '40%', '55%'], []);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    uiState.shouldShowSecurityCheckView
      ? bottomSheetRef.current?.expand()
      : bottomSheetRef.current?.close();
  }, [uiState.shouldShowSecurityCheckView]);

  return (
    <BottomSheet
      index={-1}
      snapPoints={snapPoints}
      style={styles.bottonSheet}
      ref={bottomSheetRef}
    >
      <ScrollView>
        <View p={4} pb={8}>
          <HStack justifyContent={'space-between'} alignItems={'center'}>
            <Text>セキュリティ確認: {cardList.length}</Text>
            <Button
              size={'xs'}
              colorScheme={'gray'}
              variant={'outline'}
              onPress={() => {
                dispatch(
                  vsStore.actions.setShouldShowSecurityCheckView({
                    shouldShowSecurityCheckView: false,
                  })
                );
              }}
            >
              元に戻す
            </Button>
          </HStack>
          <HStack flexWrap={'wrap'} space={2} mt={4}>
            {cardList.map((card, i) => {
              return (
                <View key={`${card.imgFileName}-${i}`} pb={2}>
                  <SecurityCheckAreaCard card={card} />
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
