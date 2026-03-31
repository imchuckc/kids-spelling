import { View, Text } from '@tarojs/components';
import './index.scss';

interface Props {
  visible: boolean;
  starsEarned?: number;
}

const CONFETTI_COLORS = ['#FFD93D', '#FF6B9D', '#7C5CFC', '#6BCB77', '#FF6B6B', '#00D2FF'];

export default function StarBurst({ visible, starsEarned = 3 }: Props) {
  if (!visible) return null;

  return (
    <View className='star-burst'>
      {/* Confetti particles */}
      {CONFETTI_COLORS.map((color, i) => (
        <View
          key={`c-${i}`}
          className='star-burst__confetti'
          style={{
            backgroundColor: color,
            left: `${15 + i * 13}%`,
            animationDelay: `${i * 0.08}s`,
            animationDuration: `${0.8 + Math.random() * 0.4}s`,
          }}
        />
      ))}

      {/* Floating stars */}
      {Array.from({ length: 5 }).map((_, i) => (
        <Text
          key={`s-${i}`}
          className='star-burst__star'
          style={{
            left: `${10 + i * 18}%`,
            animationDelay: `${i * 0.12}s`,
          }}
        >
          ⭐
        </Text>
      ))}

      {/* Center celebration */}
      <View className='star-burst__center'>
        <Text className='star-burst__emoji'>🎉</Text>
        <Text className='star-burst__text'>太棒了!</Text>
        <View className='star-burst__earned'>
          {Array.from({ length: starsEarned }).map((_, i) => (
            <Text key={i} className='star-burst__earned-star'>⭐</Text>
          ))}
        </View>
      </View>
    </View>
  );
}
