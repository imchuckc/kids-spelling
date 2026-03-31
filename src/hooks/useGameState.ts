import { useState, useCallback } from 'react';

export interface GameRound {
  totalWords: number;
  currentIndex: number;
  correctCount: number;
  wrongCount: number;
  starsEarned: number;
  isComplete: boolean;
}

const INITIAL_ROUND: GameRound = {
  totalWords: 10,
  currentIndex: 0,
  correctCount: 0,
  wrongCount: 0,
  starsEarned: 0,
  isComplete: false,
};

// Star rating: 3 stars for <=1 mistake, 2 for <=3, 1 for more
function calcStars(correct: number, wrong: number): number {
  const accuracy = correct / (correct + wrong);
  if (accuracy >= 0.95) return 3;
  if (accuracy >= 0.75) return 2;
  return 1;
}

export function useGameState(wordsPerRound = 10) {
  const [round, setRound] = useState<GameRound>({ ...INITIAL_ROUND, totalWords: wordsPerRound });
  const [errorsThisWord, setErrorsThisWord] = useState(0);

  const recordCorrect = useCallback(() => {
    setRound(prev => ({ ...prev, correctCount: prev.correctCount + 1 }));
  }, []);

  const recordWrong = useCallback(() => {
    setErrorsThisWord(prev => prev + 1);
    setRound(prev => ({ ...prev, wrongCount: prev.wrongCount + 1 }));
  }, []);

  const nextWord = useCallback(() => {
    setErrorsThisWord(0);
    setRound(prev => {
      const nextIdx = prev.currentIndex + 1;
      if (nextIdx >= prev.totalWords) {
        return {
          ...prev,
          currentIndex: nextIdx,
          starsEarned: calcStars(prev.correctCount, prev.wrongCount),
          isComplete: true,
        };
      }
      return { ...prev, currentIndex: nextIdx };
    });
  }, []);

  const resetRound = useCallback(() => {
    setErrorsThisWord(0);
    setRound({ ...INITIAL_ROUND, totalWords: wordsPerRound });
  }, [wordsPerRound]);

  return {
    round,
    errorsThisWord,
    recordCorrect,
    recordWrong,
    nextWord,
    resetRound,
  };
}
