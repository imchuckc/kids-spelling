import { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import LetterBubble from '../../components/LetterBubble';
import GameHeader from '../../components/GameHeader';
import StarBurst from '../../components/StarBurst';
import ResultModal from '../../components/ResultModal';
import { useWordList, type WordItem } from '../../hooks/useWordList';
import { useAudio } from '../../hooks/useAudio';
import { useProgress } from '../../hooks/useProgress';
import { useGameState } from '../../hooks/useGameState';
import { getEmojiForWord } from '../../utils/emoji';
import { recordPractice } from '../../utils/learningEngine';
import './index.scss';

const WORDS_PER_ROUND = 10;
const DISTRACTORS_COUNT = 3;

export default function SpellPage() {
  const { getSmartWordsForMode, getRandomDistractorLetters, shuffle } = useWordList();
  const { playWord, playSfx } = useAudio();
  const { stars, earnStars, recordAnswer, completeGame } = useProgress();
  const { round, errorsThisWord, recordCorrect, recordWrong, nextWord, resetRound } = useGameState(WORDS_PER_ROUND);

  // Words for this round
  const [wordList, setWordList] = useState<WordItem[]>([]);
  // Current letter filling progress
  const [filledLetters, setFilledLetters] = useState<string[]>([]);
  // Which bubble indices have been used (correct taps)
  const [usedIndices, setUsedIndices] = useState<Set<number>>(new Set());
  // Scrambled letters for current word (including distractors)
  const [bubbleLetters, setBubbleLetters] = useState<{ letter: string; key: string }[]>([]);
  // Show celebration overlay
  const [showCelebration, setShowCelebration] = useState(false);
  // Lock input during transitions
  const [locked, setLocked] = useState(false);

  const currentWord = wordList[round.currentIndex];
  const targetLetters = currentWord?.word.toLowerCase().split('') || [];
  const nextLetterIdx = filledLetters.length;
  const expectedLetter = targetLetters[nextLetterIdx];
  const isWordComplete = filledLetters.length === targetLetters.length;

  // Initialize round
  useEffect(() => {
    startNewRound();
  }, []);

  const startNewRound = useCallback(() => {
    const words = getSmartWordsForMode(WORDS_PER_ROUND, 'spell');
    setWordList(words);
    resetRound();
    if (words.length > 0) {
      setupWord(words[0]);
    }
  }, [getSmartWordsForMode, resetRound]);

  const setupWord = useCallback((word: WordItem) => {
    setFilledLetters([]);
    setUsedIndices(new Set());
    setShowCelebration(false);
    setLocked(false);

    const wordLetters = word.word.toLowerCase().split('');
    const distractors = getRandomDistractorLetters(word.word, DISTRACTORS_COUNT);
    const allLetters = [...wordLetters, ...distractors].map((l, i) => ({
      letter: l,
      key: `${l}-${i}-${Math.random()}`,
    }));
    setBubbleLetters(shuffle(allLetters));

    // Auto-play pronunciation
    setTimeout(() => playWord(word.audio, word.word), 300);
  }, [getRandomDistractorLetters, shuffle, playWord]);

  // Setup new word when currentIndex changes
  useEffect(() => {
    if (wordList.length > 0 && round.currentIndex < wordList.length && !round.isComplete) {
      setupWord(wordList[round.currentIndex]);
    }
  }, [round.currentIndex, wordList]);

  // Handle letter tap from a bubble
  const handleLetterTap = useCallback((letter: string, bubbleIdx: number): 'correct' | 'wrong' => {
    if (locked || isWordComplete) return 'wrong';

    if (letter.toLowerCase() === expectedLetter) {
      // Correct!
      playSfx('ding');
      recordCorrect();
      recordAnswer(currentWord.id, true);

      const newFilled = [...filledLetters, letter];
      setFilledLetters(newFilled);
      setUsedIndices(prev => new Set([...prev, bubbleIdx]));

      // Check if word is now complete
      if (newFilled.length === targetLetters.length) {
        setLocked(true);
        playSfx('cheer');
        setShowCelebration(true);
        recordPractice(currentWord.id, 'spell', true);

        setTimeout(() => {
          setShowCelebration(false);
          nextWord();
        }, 1500);
      }
      return 'correct';
    } else {
      // Wrong!
      playSfx('wrong');
      recordWrong();
      recordAnswer(currentWord.id, false);
      recordPractice(currentWord.id, 'spell', false);
      return 'wrong';
    }
  }, [locked, isWordComplete, expectedLetter, filledLetters, targetLetters, currentWord, playSfx, recordCorrect, recordWrong, recordAnswer, nextWord]);

  const handlePlayAgain = () => {
    earnStars(round.starsEarned);
    completeGame(round.correctCount);
    startNewRound();
  };

  const handleGoHome = () => {
    earnStars(round.starsEarned);
    completeGame(round.correctCount);
    Taro.navigateBack();
  };

  const handlePlayPronunciation = () => {
    if (currentWord) playWord(currentWord.audio, currentWord.word);
  };

  if (wordList.length === 0) {
    return (
      <View className='spell'>
        <Text className='spell__loading'>正在加载...</Text>
      </View>
    );
  }

  return (
    <View className='spell'>
      <GameHeader
        stars={stars}
        currentWord={round.currentIndex + 1}
        totalWords={round.totalWords}
        title='拼一拼'
      />

      {!round.isComplete && currentWord && (
        <>
          {/* Image area */}
          <View className='spell__image-area' onClick={handlePlayPronunciation}>
            <Text className='spell__emoji'>{getEmojiForWord(currentWord.id)}</Text>
            <Text className='spell__zh'>{currentWord.zh}</Text>
            <View className='spell__sound-btn'>
              <Text className='spell__sound-icon'>🔊</Text>
            </View>
          </View>

          {/* Letter slots */}
          <View className='spell__slots'>
            {targetLetters.map((letter, i) => (
              <View
                key={i}
                className={`spell__slot ${i < filledLetters.length ? 'spell__slot--filled' : ''} ${i === nextLetterIdx ? 'spell__slot--active' : ''}`}
              >
                <Text className='spell__slot-text'>
                  {i < filledLetters.length ? filledLetters[i].toUpperCase() : ''}
                </Text>
              </View>
            ))}
          </View>

          {/* Letter bubbles */}
          <View className='spell__bubbles'>
            {bubbleLetters.map((b, i) => (
              <LetterBubble
                key={b.key}
                letter={b.letter}
                used={usedIndices.has(i)}
                disabled={locked}
                onTap={(letter) => handleLetterTap(letter, i)}
              />
            ))}
          </View>

          {/* Hint text */}
          <Text className='spell__hint'>
            点击字母，拼出正确的单词
          </Text>
        </>
      )}

      <StarBurst visible={showCelebration} starsEarned={1} />

      <ResultModal
        visible={round.isComplete}
        starsEarned={round.starsEarned}
        correctCount={round.correctCount}
        totalWords={round.totalWords}
        onPlayAgain={handlePlayAgain}
        onGoHome={handleGoHome}
      />
    </View>
  );
}
