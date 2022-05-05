import { Ionicons } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import { Auth } from 'aws-amplify';
import { S3 } from 'aws-sdk';
import { omit } from 'lodash';
import {
  Button,
  Heading,
  HStack,
  Menu,
  ScrollView,
  Text,
  useToast,
  View,
} from 'native-base';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BUCKET, REGION } from '../../configs/s3';
import { primaryColorCode } from '../../configs/styles';
import {
  cardImageAspectRate,
  CardType,
  convertToDisplayCardTypeFromCardType,
  convertToDisplayDigimonLvFromDigimonLv,
  Lv,
} from '../../domains/card';
import { createDeck, getKeyCard } from '../../domains/deck';
import { convertToDeckForVsAppFromDeck } from '../../domains/deck-for-vs-app';
import * as deckStore from '../../store/deck-store';
import { Card } from '../presentation/card';
import { EditDeckTitleForm } from '../presentation/edit-deck-title-form';
import { MenuItem } from '../presentation/menu-item';
import { SelectKeyCardForDeck } from '../presentation/select-key-card-for-deck';
import { DeckCardList } from './deck-card-list';

type ViewMode = 'list' | 'edit-title' | 'select-keycard' | 'share' | 'delete';

export const DeckDetailSheet = React.memo(() => {
  const dispatch = useDispatch();
  const selectedDeckId = useSelector(
    deckStore.selectors.selectedDeckIdSelector
  );
  const selectedDeck = useSelector(deckStore.selectors.selectedDeckSelector);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['20%', '60%', '95%'], []);

  const toast = useToast();

  useEffect(() => {
    selectedDeckId
      ? bottomSheetRef.current?.expand()
      : bottomSheetRef.current?.close();
  }, [selectedDeckId, bottomSheetRef]);

  const totalCount = Object.values(selectedDeck?.cards ?? {}).reduce(
    (acc, curr) => {
      const count = Object.values(curr).reduce((_acc, _curr) => {
        return _acc + _curr.count;
      }, 0);
      return acc + count;
    },
    0
  );

  const keyCard =
    selectedDeck?.keyCard ?? (selectedDeck && getKeyCard(selectedDeck));

  const uploadDeckToS3 = useCallback(async () => {
    console.log('touched upload deck to s3: ', selectedDeck == null);
    if (selectedDeck == null) {
      return;
    }
    const creds = await Auth.currentCredentials();
    const user = await Auth.currentAuthenticatedUser();
    try {
      const s3 = new S3({ region: REGION, credentials: creds });
      const deckForVsApp = convertToDeckForVsAppFromDeck(selectedDeck);
      const res = await s3
        .putObject({
          Bucket: BUCKET,
          Key: `decks/${user.username}/${selectedDeck.title}_${selectedDeck.id}.json`,
          Body: JSON.stringify(deckForVsApp),
          ContentType: 'application/json',
        })
        .promise();
      console.log('upload deck success: ', res);
      toast.show({
        title: 'デッキデータをS3にアップロードしました',
        duration: 3000,
        isClosable: true,
        placement: 'top',
        status: 'success',
      });
    } catch (error) {
      console.error('list objects failed: ', error);
      toast.show({
        title: 'デッキデータをS3にアップロードできませんでした',
        duration: 3000,
        isClosable: true,
        placement: 'top',
        status: 'error',
      });
    }
  }, [selectedDeck, toast]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      style={styles.bottonSheet}
    >
      {viewMode === 'list' && (
        <>
          <HStack
            flexDirection="row"
            px={2}
            justifyContent="space-between"
            alignItems="center"
            space={2}
          >
            <View flex={1} flexDirection="row" justifyContent="flex-start">
              <Button
                variant="ghost"
                colorScheme="blue"
                display="flex"
                justifyContent="flex-start"
                onPress={() => {
                  setViewMode('list');
                  dispatch(deckStore.actions.selectDeck({ deckId: undefined }));
                }}
              >
                閉じる
              </Button>
            </View>
            <View flex={3} flexDirection="column">
              <Heading
                fontSize={16}
                fontWeight="semibold"
                textAlign="center"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {selectedDeck?.title}
              </Heading>
              <View flexDirection="row" justifyContent="center">
                <View
                  backgroundColor="gray.900"
                  borderRadius="sm"
                  p={1}
                  mt={1}
                  width={12}
                >
                  <Text fontSize={9} color="white" textAlign="center">
                    {totalCount} / 55
                  </Text>
                </View>
              </View>
            </View>
            <Menu
              trigger={(triggerProps) => {
                return (
                  <View
                    flex={1}
                    display="flex"
                    flexDirection="row"
                    justifyContent="flex-end"
                  >
                    <Button
                      size="xs"
                      variant="ghost"
                      _pressed={{
                        background: '#f0f0f0',
                      }}
                      colorScheme="blue"
                      {...triggerProps}
                    >
                      <Ionicons
                        name="ellipsis-horizontal-circle-outline"
                        size={24}
                        color={primaryColorCode}
                      />
                    </Button>
                  </View>
                );
              }}
              width="160"
              backgroundColor="white"
              px={2}
              mr={4}
            >
              <MenuItem
                label="タイトル変更"
                onPress={() => {
                  setViewMode('edit-title');
                }}
              />
              <MenuItem
                label="複製"
                onPress={() => {
                  if (selectedDeck == null) {
                    return;
                  }
                  const duplicatedDeck = createDeck({
                    ...omit(selectedDeck, ['id', 'createdAt']),
                    title: `${selectedDeck.title} コピー`,
                  });
                  dispatch(deckStore.actions.addDeck({ deck: duplicatedDeck }));
                  bottomSheetRef.current?.snapToIndex(0);
                }}
              />
              <MenuItem label="共有" />
              <MenuItem label="対戦" />
              <MenuItem label="S3にアップロード" onPress={uploadDeckToS3} />
              <MenuItem
                label="削除"
                color="red.500"
                onPress={() => {
                  if (selectedDeck == null) {
                    return;
                  }
                  dispatch(
                    deckStore.actions.deleteDeck({ deckId: selectedDeck.id })
                  );
                  dispatch(deckStore.actions.selectDeck({ deckId: undefined }));
                }}
              />
            </Menu>
          </HStack>
          <ScrollView marginTop={2}>
            {keyCard && (
              <View mt={2} p={2} justifyContent="center" alignItems="center">
                <Card
                  card={keyCard}
                  width={90}
                  height={90 * cardImageAspectRate}
                />
                <Text fontSize={12} fontWeight="medium" mt={2}>
                  キーカード
                </Text>
                <Button
                  colorScheme="gray"
                  variant="outline"
                  mt="2"
                  size="xs"
                  px={6}
                  onPress={() => {
                    setViewMode('select-keycard');
                  }}
                >
                  変更
                </Button>
              </View>
            )}
            <View mt={3} px={4} paddingBottom={20}>
              {Object.entries(selectedDeck?.cards ?? {}).map(([key, value]) => {
                const displayCardType = convertToDisplayCardTypeFromCardType(
                  key as CardType
                );
                const displayLv = convertToDisplayDigimonLvFromDigimonLv(
                  key as Lv
                );
                const title =
                  displayCardType !== '-' ? displayCardType : displayLv;
                return (
                  <DeckCardList
                    key={key}
                    title={title}
                    cardsGroupedByNo={value}
                  />
                );
              })}
            </View>
          </ScrollView>
        </>
      )}
      {viewMode === 'edit-title' && (
        <EditDeckTitleForm
          defaultValue={selectedDeck?.title ?? ''}
          onCancel={() => {
            setViewMode('list');
          }}
          onUpdate={(title) => {
            setViewMode('list');
            if (selectedDeck != null) {
              dispatch(
                deckStore.actions.updateDeckTitle({
                  id: selectedDeck.id,
                  title,
                })
              );
            }
          }}
        />
      )}
      {viewMode === 'select-keycard' && selectedDeck != null && (
        <SelectKeyCardForDeck
          deck={selectedDeck}
          onCancel={() => {
            setViewMode('list');
          }}
          onSelect={(card) => {
            dispatch(
              deckStore.actions.updateDeckKeyCard({
                id: selectedDeck.id,
                keyCard: card,
              })
            );
            setViewMode('list');
          }}
        />
      )}
    </BottomSheet>
  );
});
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
