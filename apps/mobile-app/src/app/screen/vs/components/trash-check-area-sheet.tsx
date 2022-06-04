import BottomSheet from '@gorhom/bottom-sheet';
import { Button, HStack, ScrollView, Text, View } from 'native-base';
import { FC, useEffect, useMemo, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as vsStore from '../../../store/vs-store';
import { TrashCheckAreaCard } from './trash-check-area-card';

export const TrashCheckAreaSheet: FC = () => {
  const cardList = useSelector(vsStore.selectors.myselfTrashSelector);
  const uiState = useSelector(vsStore.selectors.uiStateSelector);
  const snapPoints = useMemo(() => ['10%', '40%', '55%'], []);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    uiState.shouldShowTrashCheckView
      ? bottomSheetRef.current?.expand()
      : bottomSheetRef.current?.close();
  }, [uiState.shouldShowTrashCheckView]);

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
            <Text>トラッシュ確認: {cardList.length}</Text>
            <Button
              size={'xs'}
              colorScheme={'gray'}
              variant={'outline'}
              onPress={() => {
                dispatch(
                  vsStore.actions.setShouldShowTrashCheckView({
                    shouldShowTrashCheckView: false,
                  })
                );
              }}
            >
              閉じる
            </Button>
          </HStack>
          <HStack flexWrap={'wrap'} space={2} mt={4}>
            {cardList.map((card, i) => {
              return (
                <View key={`${card.data.imgFileName}-${i}`} pb={2}>
                  <TrashCheckAreaCard card={card.data} />
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
