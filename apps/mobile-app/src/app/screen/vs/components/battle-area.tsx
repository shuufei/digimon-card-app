import { Ionicons } from '@expo/vector-icons';
import { Button, HStack, Menu, View, VStack } from 'native-base';
import { FC, useMemo, useState, memo } from 'react';
import { ALL_CARD_LIST } from '../../../configs/all-card-list';
import { CardInfo } from '../../../domains/card';
import { BattleAreaDigimonCard } from './battle-area-digimon-card';
import { BattleAreaOptionCard } from './battle-area-option-card';
import { BattleAreaTamerCard } from './battle-area-tamer-card';

const DUMMY_BATTLE_CARD_LIST = [
  ALL_CARD_LIST[10],
  ALL_CARD_LIST[20],
  ALL_CARD_LIST[21],
  ALL_CARD_LIST[22],
  ALL_CARD_LIST[30],
  ALL_CARD_LIST[31],
  ALL_CARD_LIST[32],
  ALL_CARD_LIST[33],
  ALL_CARD_LIST[34],
  ALL_CARD_LIST[83],
  ALL_CARD_LIST[84],
  ALL_CARD_LIST[85],
  ALL_CARD_LIST[86],
  ALL_CARD_LIST[87],
  ALL_CARD_LIST[88],
  ALL_CARD_LIST[100],
  ALL_CARD_LIST[100],
  ALL_CARD_LIST[101],
  ALL_CARD_LIST[102],
  ALL_CARD_LIST[103],
  ALL_CARD_LIST[104],
  ALL_CARD_LIST[105],
  ALL_CARD_LIST[106],
];

const CardList: FC<{
  cardList: CardInfo[];
  CardComponent: FC<{ card: CardInfo }>;
}> = ({ cardList, CardComponent }) => {
  return (
    <HStack flexWrap={'wrap'} space={1} justifyContent={'center'}>
      {cardList.map((card, i) => {
        return (
          <View key={`${card.imgFileName}-${i}`} paddingBottom={4}>
            <CardComponent card={card} />
          </View>
        );
      })}
    </HStack>
  );
};

export const BattleArea: FC = memo(() => {
  const [cardList, setCardList] = useState(DUMMY_BATTLE_CARD_LIST);

  const digimonCardList = useMemo(() => {
    return cardList.filter((v) => v.cardtype === '2_デジモン');
  }, [cardList]);

  const tamerCardList = useMemo(() => {
    return cardList.filter((v) => v.cardtype === '3_テイマー');
  }, [cardList]);

  const optionCardList = useMemo(() => {
    return cardList.filter((v) => v.cardtype === '4_オプション');
  }, [cardList]);

  return (
    <VStack px={2}>
      <View marginTop={5}>
        <CardList
          cardList={digimonCardList}
          CardComponent={BattleAreaDigimonCard}
        />
      </View>
      <View marginTop={5}>
        <CardList
          cardList={tamerCardList}
          CardComponent={BattleAreaTamerCard}
        />
      </View>
      <View marginTop={5}>
        <CardList
          cardList={optionCardList}
          CardComponent={BattleAreaOptionCard}
        />
      </View>
      <HStack justifyContent={'center'}>
        <Menu
          placement="top"
          trigger={(triggerProps) => {
            return (
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
                  size={20}
                  color={'#000000'}
                />
              </Button>
            );
          }}
        >
          <Menu.Item>全てレスト</Menu.Item>
          <Menu.Item>全てアクティブ</Menu.Item>
        </Menu>
      </HStack>
    </VStack>
  );
});
