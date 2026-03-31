import { View, Text } from '@tarojs/components';
import './index.scss';

interface Props {
  visible: boolean;
  starsEarned: number;
  correctCount: number;
  totalWords: number;
  onPlayAgain: () => void;
  onGoHome: () => void;
}

export default function ResultModal({
  visible,
  starsEarned,
  correctCount,
  totalWords,
  onPlayAgain,
  onGoHome,
}: Props) {
  if (!visible) return null;

  const messages = ['继续加油!', '很不错!', '非常棒!', '太厉害了!'];
  const msgIndex = Math.min(starsEarned, messages.length - 1);

  return (
    <View className='result-modal'>
      <View className='result-modal__overlay' />
      <View className='result-modal__card animate-bounce-in'>
        <Text className='result-modal__trophy'>🏆</Text>
        <Text className='result-modal__message'>{messages[msgIndex]}</Text>

        <View className='result-modal__stars'>
          {[1, 2, 3].map(i => (
            <Text
              key={i}
              className={`result-modal__star ${i <= starsEarned ? 'result-modal__star--active' : ''}`}
            >
              ⭐
            </Text>
          ))}
        </View>

        <View className='result-modal__stats'>
          <Text className='result-modal__stat'>
            答对 {correctCount}/{totalWords} 个单词
          </Text>
        </View>

        <View className='result-modal__actions'>
          <View className='result-modal__btn result-modal__btn--primary' onClick={onPlayAgain}>
            <Text className='result-modal__btn-text'>再来一轮 🔄</Text>
          </View>
          <View className='result-modal__btn result-modal__btn--secondary' onClick={onGoHome}>
            <Text className='result-modal__btn-text result-modal__btn-text--secondary'>回首页</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
