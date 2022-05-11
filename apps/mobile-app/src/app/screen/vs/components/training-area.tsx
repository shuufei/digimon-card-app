import { View } from 'native-base';
import { FC, useState, memo } from 'react';
import { ALL_CARD_LIST } from '../../../configs/all-card-list';
import { TrainingAreaCard } from './training-area-card';

const DUMMY_TRAINING_CARD = ALL_CARD_LIST[0];

export const TrainingArea: FC = memo(() => {
  const [card, setCard] = useState(DUMMY_TRAINING_CARD);

  return (
    <View>
      <TrainingAreaCard card={card} />
    </View>
  );
});
