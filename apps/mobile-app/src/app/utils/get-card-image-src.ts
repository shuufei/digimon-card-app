import { ENDPOINT } from '../configs/distribution';
import { CardInfo } from '../domains/card';
// import { SIGNED_QS } from '@env';

// const signedQueryStrings = SIGNED_QS;

export const getCardImageSrc = (card: CardInfo, signedQueryStrings: string) => {
  return `${ENDPOINT}/${card.category}/${card.imgFileName}?${signedQueryStrings}`;
};
