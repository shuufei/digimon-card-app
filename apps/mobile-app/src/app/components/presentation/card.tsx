import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Image, Pressable, View } from 'native-base';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { CardInfo } from '../../domains/card';
import { RootParamList } from '../../navigation';
import * as authStore from '../../store/auth-store';
import { getCardImageSrc } from '../../utils/get-card-image-src';

export type CardProps = {
  card: CardInfo;
  height: number;
  width: number;
  padding?: number;
  isPressable?: boolean;
  isLongPressable?: boolean;
  signedQueryStrings?: string;
};

const CardImage: FC<CardProps> = ({
  card,
  height,
  width,
  padding,
  signedQueryStrings,
}) => {
  return signedQueryStrings != null ? (
    <Image
      source={{
        uri: getCardImageSrc(card, signedQueryStrings),
        cache: 'force-cache',
      }}
      resizeMode="contain"
      height={height}
      width={width}
      alt={`${card.name}`}
      m={padding}
    />
  ) : null;
};
export const Card: FC<CardProps> = React.memo(
  ({
    card,
    height,
    width,
    padding,
    isPressable = true,
    isLongPressable = false,
  }) => {
    const { navigate } = useNavigation<NavigationProp<RootParamList>>();
    const signedQueryStrings = useSelector(
      authStore.selectors.signedQueryStringsSelector
    );
    return signedQueryStrings != null ? (
      isPressable || isLongPressable ? (
        <Pressable
        // onPress={() => {
        //   isPressable &&
        //     navigate('CardModal', {
        //       name: card.name,
        //       cardImageSrc: getCardImageSrc(card, signedQueryStrings),
        //     });
        // }}
        // onLongPress={() => {
        //   isLongPressable &&
        //     navigate('CardModal', {
        //       name: card.name,
        //       cardImageSrc: getCardImageSrc(card, signedQueryStrings),
        //     });
        // }}
        >
          <CardImage
            card={card}
            height={height}
            width={width}
            padding={padding}
            signedQueryStrings={signedQueryStrings}
          />
        </Pressable>
      ) : (
        <View>
          <CardImage
            card={card}
            height={height}
            width={width}
            padding={padding}
            signedQueryStrings={signedQueryStrings}
          />
        </View>
      )
    ) : null;
  }
);
