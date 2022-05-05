import React, { FC } from 'react';
import { CreateDeckSheet } from './create-deck-sheet';
import { DeckDetailSheet } from './deck-detail-sheet';

export const DeckScreenSheet: FC = React.memo(() => {
  return (
    <>
      <DeckDetailSheet />
      <CreateDeckSheet />
    </>
  );
});
