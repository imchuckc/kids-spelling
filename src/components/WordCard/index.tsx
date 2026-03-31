import { View, Text } from '@tarojs/components';
import './index.scss';

interface Props {
  emoji: string;
  word: string;
  selected?: boolean;
  correct?: boolean | null;
  onTap?: () => void;
}

export default function WordCard({ emoji, word, selected, correct, onTap }: Props) {
  let stateClass = '';
  if (correct === true) stateClass = 'word-card--correct';
  else if (correct === false) stateClass = 'word-card--wrong';
  else if (selected) stateClass = 'word-card--selected';

  return (
    <View className={`word-card ${stateClass}`} onClick={onTap}>
      <Text className='word-card__emoji'>{emoji}</Text>
      <Text className='word-card__word'>{word}</Text>
    </View>
  );
}
