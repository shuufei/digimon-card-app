import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Image, View } from 'native-base';
import { FC, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { RootParamList } from '../navigation';

export const CardModalScreen: FC = () => {
  const { params } = useRoute<RouteProp<RootParamList, 'CardModal'>>();
  const { setOptions } = useNavigation();
  const windowWidth = Dimensions.get('window').width;

  const title = params.name;
  const src = params.cardImageSrc;
  const cardWidth = windowWidth * 0.9;
  const cardHeight = cardWidth * 1.395;

  useEffect(() => {
    setOptions({
      title,
    });
  }, [title]);

  return (
    <View justifyContent="center">
      <Image
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
    </View>
  );
};
