import { useState, useEffect, useCallback } from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import WordCard from '../../components/WordCard';
import GameHeader from '../../components/GameHeader';
import ResultModal from '../../components/ResultModal';
import { useWordList, type WordItem } from '../../hooks/useWordList';
import { useAudio } from '../../hooks/useAudio';
import { useProgress } from '../../hooks/useProgress';
import { useGameState } from '../../hooks/useGameState';
import { getEmojiForWord } from '../../utils/emoji';
import { recordPractice } from '../../utils/learningEngine';
import './index.scss';

const WORDS_PER_ROUND = 10;
const CHOICES_COUNT = 4;

export default function ListenPage() {
  const { getSmartWordsForMode, getRandomWords, shuffle } = useWordList();
  const { playWord, playSfx } = useAudio();
  const { stars, earnStars, recordAnswer, completeGame } = useProgress();
  const { round, recordCorrect, recordWrong, nextWord, resetRound } = useGameState(WORDS_PER_ROUND);

  const [wordList, setWordList] = useState<WordItem[]>([]);
  const [choices, setChoices] = useState<WordItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [correctId, setCorrectId] = useState<string | null>(null);
  const [locked, setLocked] = useState(false);

  const currentWord = wordList[round.currentIndex];

  useEffect(() => {
    startNewRound();
  }, []);

  const startNewRound = useCallback(() => {
    const words = getSmartWordsForMode(WORDS_PER_ROUND, 'listen');
    setWordList(words);
    resetRound();
  }, [getSmartWordsForMode, resetRound]);

  // Generate choices when word changes
  useEffect(() => {
    if (!currentWord || round.isComplete) return;

    const otherWords = getRandomWords(20).filter(w => w.id !== currentWord.id);
    const distractors = otherWords.slice(0, CHOICES_COUNT - 1);
    const allChoices = shuffle([currentWord, ...distractors]);
    setChoices(allChoices);
    setSelectedId(null);
    setCorrectId(null);
    setLocked(false);

    setTimeout(() => playWord(currentWord.audio, currentWord.word), 400);
  }, [round.currentIndex, wordList]);

  const handleChoice = (word: WordItem) => {
    if (locked) return;
    setLocked(true);
    setSelectedId(word.id);

    if (word.id === currentWord.id) {
      setCorrectId(word.id);
      playSfx('ding');
      recordCorrect();
      recordAnswer(currentWord.id, true);
      recordPractice(currentWord.id, 'listen', true);

      setTimeout(() => {
        nextWord();
      }, 1200);
    } else {
      playSfx('wrong');
      recordWrong();
      recordAnswer(currentWord.id, false);
      recordPractice(currentWord.id, 'listen', false);

      // Show correct answer after a brief delay, then move on
      setTimeout(() => setCorrectId(currentWord.id), 600);
      setTimeout(() => {
        nextWord();
      }, 1800);
    }
  };

  const handleReplay = () => {
    if (currentWord) playWord(currentWord.audio, currentWord.word);
  };

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

  return (
    <View className='listen'>
      <GameHeader
        stars={stars}
        currentWord={round.currentIndex + 1}
        totalWords={round.totalWords}
        title='听一听'
      />

      {!round.isComplete && currentWord && (
        <>
          {/* Prompt area */}
          <View className='listen__prompt'>
            <Text className='listen__prompt-text'>听发音，选出正确的图片</Text>
          </View>

          {/* Play button */}
          <View className='listen__play-btn animate-pulse' onClick={handleReplay}>
            <Text className='listen__play-icon'>🔊</Text>
            <Text className='listen__play-text'>再听一次</Text>
          </View>

          {/* Choice grid */}
          <View className='listen__grid'>
            {choices.map(choice => {
              let correct: boolean | null = null;
              if (correctId === choice.id) correct = true;
              else if (selectedId === choice.id && correctId && correctId !== choice.id) correct = false;

              return (
                <View key={choice.id} className='listen__grid-item'>
                  <WordCard
                    emoji={getEmojiForWord(choice.id)}
                    word={choice.word}
                    correct={correct}
                    onTap={() => handleChoice(choice)}
                  />
                </View>
              );
            })}
          </View>
        </>
      )}

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
