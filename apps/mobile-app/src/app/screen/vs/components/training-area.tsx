import { View } from 'native-base';
import { FC, memo, useState } from 'react';
import { ALL_CARD_LIST } from '../../../configs/all-card-list';
import { VsCard } from '../../../domains/vs-card';
import { TrainingAreaCard } from './training-area-card';

const DUMMY_TRAINING_CARD: VsCard = {
  data: ALL_CARD_LIST[11],
  evolutionarySources: [ALL_CARD_LIST[0], ALL_CARD_LIST[9]],
  isRest: false,
};

export const TrainingArea: FC = memo(() => {
  const [card, setCard] = useState(DUMMY_TRAINING_CARD);

  return (
    <View>
      <TrainingAreaCard card={card} />
    </View>
  );
});
