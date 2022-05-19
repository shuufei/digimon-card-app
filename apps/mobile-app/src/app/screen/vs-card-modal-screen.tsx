import {
  RouteProp,
  useNavigation,
  useRoute,
  NavigationProp,
} from '@react-navigation/native';
import { Image, View, ScrollView, Pressable } from 'native-base';
import { FC, useEffect, useMemo } from 'react';
import { Dimensions } from 'react-native';
import { RootParamList } from '../navigation';
import * as authStore from '../store/auth-store';
import { useSelector } from 'react-redux';
import { getCardImageSrc } from '../utils/get-card-image-src';
import { reverse } from 'lodash';

export const VsCardModalScreen: FC = () => {
  const { params } = useRoute<RouteProp<RootParamList, 'VsCardModal'>>();
  const { setOptions } = useNavigation();
  const windowWidth = Dimensions.get('window').width;
  const signedQueryStrings = useSelector(
    authStore.selectors.signedQueryStringsSelector
  );
  const { navigate } = useNavigation<NavigationProp<RootParamList>>();

  const title = params.card.data.name;
  const src = useMemo(
    () => getCardImageSrc(params.card.data, signedQueryStrings ?? ''),
    [params.card.data, signedQueryStrings]
  );
  const cardWidth = windowWidth * 0.9;
  const cardHeight = cardWidth * 1.395;
  const evolutionarySources = reverse([...params.card.evolutionarySources]);

  useEffect(() => {
    setOptions({
      title,
    });
  }, [setOptions, title]);

  return (
    <ScrollView>
      <View pb={12}>
        <Image
          zIndex={evolutionarySources.length + 1}
          source={{
            uri: src,
          }}
          resizeMode="contain"
          height={cardHeight}
          width={cardWidth}
          alt={`${title}`}
          marginX="auto"
          marginTop={8}
        />
        {evolutionarySources.map((card, i) => {
          return (
            <Pressable
              onLongPress={() => {
                navigate('CardModal', {
                  name: card.name,
                  cardImageSrc: getCardImageSrc(card, signedQueryStrings ?? ''),
                });
              }}
              key={i}
              zIndex={evolutionarySources.length - i}
              mt={-cardHeight * 0.7}
            >
              <Image
                source={{
                  uri: getCardImageSrc(card, signedQueryStrings ?? ''),
                }}
                resizeMode="contain"
                height={cardHeight}
                width={cardWidth}
                alt={`${title}`}
                marginX="auto"
              />
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
};
