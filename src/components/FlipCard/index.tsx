import { View, Text } from '@tarojs/components';
import './index.scss';

interface Props {
  frontContent: string;
  frontLabel?: string;
  isFlipped: boolean;
  isMatched: boolean;
  onTap: () => void;
}

export default function FlipCard({ frontContent, frontLabel, isFlipped, isMatched, onTap }: Props) {
  return (
    <View
      className={`flip-card ${isFlipped ? 'flip-card--flipped' : ''} ${isMatched ? 'flip-card--matched' : ''}`}
      onClick={onTap}
    >
      <View className='flip-card__inner'>
        {/* Back face (question mark - default visible) */}
        <View className='flip-card__face flip-card__back'>
          <Text className='flip-card__question'>?</Text>
        </View>
        {/* Front face (content - shown when flipped) */}
        <View className='flip-card__face flip-card__front'>
          <Text className='flip-card__content'>{frontContent}</Text>
          {frontLabel && <Text className='flip-card__label'>{frontLabel}</Text>}
        </View>
      </View>
    </View>
  );
}
