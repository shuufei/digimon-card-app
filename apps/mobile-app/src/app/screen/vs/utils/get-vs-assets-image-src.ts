import { ENDPOINT } from '../../../configs/distribution';

export const getVsAssetsImageSrc = (
  fileName: string,
  signedQueryStrings: string
) => {
  const url = `${ENDPOINT}/vs-assets/${fileName}?${signedQueryStrings}`;
  return url;
};
