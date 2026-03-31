import { View, Text } from '@tarojs/components';
import './index.scss';

interface Props {
  stars: number;
  currentWord: number;
  totalWords: number;
  title?: string;
}

export default function GameHeader({ stars, currentWord, totalWords, title }: Props) {
  return (
    <View className='game-header'>
      <View className='game-header__stars'>
        <Text className='game-header__star-icon'>⭐</Text>
        <Text className='game-header__star-count'>{stars}</Text>
      </View>

      {title && <Text className='game-header__title'>{title}</Text>}

      <View className='game-header__progress'>
        <Text className='game-header__progress-text'>
          {currentWord} / {totalWords}
        </Text>
      </View>
    </View>
  );
}
