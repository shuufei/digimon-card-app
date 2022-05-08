import { Image } from 'native-base';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import * as authStore from '../../../../store/auth-store';
import { CARD_HEIGHT, CARD_WIDTH } from '../../configs/card-style';
import { getVsAssetsImageSrc } from '../../utils/get-vs-assets-image-src';

export const VsAssetsImage: FC<{
  imageFileName: string;
  alt: string;
  direction?: 'normal' | 'side';
}> = ({ imageFileName, alt, direction = 'normal' }) => {
  const signedQueryStrings = useSelector(
    authStore.selectors.signedQueryStringsSelector
  );

  return (
    <Image
      source={{
        uri: getVsAssetsImageSrc(imageFileName, signedQueryStrings ?? ''),
      }}
      resizeMode="contain"
      width={direction === 'normal' ? CARD_WIDTH : CARD_HEIGHT}
      height={direction === 'normal' ? CARD_HEIGHT : CARD_WIDTH}
      alt={alt}
    />
  );
};
