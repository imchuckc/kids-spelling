import { useState } from 'react';
import { View, Text } from '@tarojs/components';
import './index.scss';

interface Props {
  letter: string;
  disabled?: boolean;
  used?: boolean;
  onTap: (letter: string) => 'correct' | 'wrong';
}

export default function LetterBubble({ letter, disabled, used, onTap }: Props) {
  const [animClass, setAnimClass] = useState('');

  const handleTap = () => {
    if (disabled || used) return;
    const result = onTap(letter);
    if (result === 'correct') {
      setAnimClass('letter-bubble--correct');
    } else {
      setAnimClass('letter-bubble--wrong');
      setTimeout(() => setAnimClass(''), 500);
    }
  };

  return (
    <View
      className={`letter-bubble ${animClass} ${used ? 'letter-bubble--used' : ''} ${disabled ? 'letter-bubble--disabled' : ''}`}
      onClick={handleTap}
    >
      <Text className='letter-bubble__text'>{letter.toUpperCase()}</Text>
    </View>
  );
}
