import { useState, useEffect } from 'react';
import { View, Text, Image } from '@tarojs/components';
import { useWordList, type WordItem } from '../../hooks/useWordList';
import { useAudio } from '../../hooks/useAudio';
import { getEmojiForWord } from '../../utils/emoji';
import { markIntroduced } from '../../utils/learningEngine';
import wordAssets from '../../data/word-assets.json';
import './index.scss';

export default function LearnPage() {
  const { filteredWords, curriculum, currentLevel } = useWordList();
  const { playWord, playSentence } = useAudio();
  const [currentIdx, setCurrentIdx] = useState(0);

  const word: WordItem | undefined = filteredWords[currentIdx];

  const handlePrev = () => setCurrentIdx(prev => Math.max(0, prev - 1));
  const handleNext = () => setCurrentIdx(prev => Math.min(filteredWords.length - 1, prev + 1));
  const handleTapImage = () => { if (word) playWord('', word.word); };

  useEffect(() => {
    if (word) {
      playWord('', word.word);
      markIntroduced(word.id);
    }
  }, [currentIdx]);

  if (!word) {
    return <View className='learn'><Text className='learn__empty'>暂无单词</Text></View>;
  }

  return (
    <View className='learn'>
      <View className='learn__topbar'>
        <Text className='learn__course-name'>
          {curriculum.icon} {currentLevel?.label}
        </Text>
        <Text className='learn__counter-text'>
          {currentIdx + 1} / {filteredWords.length}
        </Text>
      </View>

      <View className='learn__card' onClick={handleTapImage}>
        {(() => {
          const asset = (wordAssets as any)[word.word];
          const emoji = getEmojiForWord(word.word);
          if (asset?.hasImage) {
            return (
              <View className='learn__image-wrap'>
                <Image className='learn__ai-image' src={asset.image} mode='aspectFill' />
              </View>
            );
          } else if (emoji) {
            return (
              <View className='learn__image-wrap learn__image-wrap--emoji'>
                <Text className='learn__emoji-placeholder'>{emoji}</Text>
              </View>
            );
          } else {
            return (
              <View className='learn__image-wrap learn__image-wrap--letter'>
                <Text className='learn__letter-visual'>{word.word[0].toUpperCase()}</Text>
              </View>
            );
          }
        })()}
        <Text className='learn__word'>{word.word}</Text>
        <Text className='learn__zh'>{word.zh}</Text>
        <View className='learn__sources'>
          <Text className='learn__source-tag'>{curriculum.name}</Text>
          <Text className='learn__source-tag'>{currentLevel?.label}</Text>
        </View>
        <View className='learn__sound-hint'>
          <Text className='learn__sound-icon'>🔊</Text>
          <Text className='learn__sound-text'>点击听发音</Text>
        </View>
      </View>

      {word.examples && word.examples.length > 0 && (
        <View className='learn__examples'>
          {word.examples.map((ex, i) => (
            <View key={i} className='learn__example' onClick={(e) => { e.stopPropagation(); playSentence(ex.en); }}>
              <View className='learn__example-row'>
                <Text className='learn__example-speaker'>🔊</Text>
                <Text className='learn__example-en'>{ex.en}</Text>
              </View>
              <Text className='learn__example-zh'>{ex.zh}</Text>
            </View>
          ))}
        </View>
      )}

      <View className='learn__nav'>
        <View className={`learn__nav-btn ${currentIdx === 0 ? 'learn__nav-btn--disabled' : ''}`} onClick={handlePrev}>
          <Text className='learn__nav-btn-text'>◀ 上一个</Text>
        </View>
        <View className={`learn__nav-btn ${currentIdx === filteredWords.length - 1 ? 'learn__nav-btn--disabled' : ''}`} onClick={handleNext}>
          <Text className='learn__nav-btn-text'>下一个 ▶</Text>
        </View>
      </View>
    </View>
  );
}
