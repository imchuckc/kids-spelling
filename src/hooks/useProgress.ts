import { useState, useCallback, useEffect } from 'react';
import {
  getTotalStars,
  addStars,
  getMasteredWords,
  addMasteredWord,
  getDailyProgress,
  updateDailyProgress,
  getCheckInDays,
  checkInToday,
  updateWordStat,
  type DailyProgress,
} from '../utils/storage';

export function useProgress() {
  const [stars, setStars] = useState(0);
  const [mastered, setMastered] = useState<string[]>([]);
  const [daily, setDaily] = useState<DailyProgress>({ date: '', wordsCompleted: 0, gamesPlayed: 0 });
  const [checkInDays, setCheckInDays] = useState<string[]>([]);

  useEffect(() => {
    setStars(getTotalStars());
    setMastered(getMasteredWords());
    setDaily(getDailyProgress());
    setCheckInDays(getCheckInDays());
  }, []);

  const earnStars = useCallback((count: number) => {
    const total = addStars(count);
    setStars(total);
    return total;
  }, []);

  const masterWord = useCallback((wordId: string) => {
    addMasteredWord(wordId);
    setMastered(getMasteredWords());
  }, []);

  const completeGame = useCallback((wordsCount: number) => {
    updateDailyProgress(wordsCount);
    setDaily(getDailyProgress());
  }, []);

  const doCheckIn = useCallback(() => {
    const days = checkInToday();
    setCheckInDays(days);
    return days;
  }, []);

  const recordAnswer = useCallback((wordId: string, correct: boolean) => {
    updateWordStat(wordId, correct);
    if (correct) {
      masterWord(wordId);
    }
  }, [masterWord]);

  const refresh = useCallback(() => {
    setStars(getTotalStars());
    setMastered(getMasteredWords());
    setDaily(getDailyProgress());
    setCheckInDays(getCheckInDays());
  }, []);

  return {
    stars,
    mastered,
    daily,
    checkInDays,
    earnStars,
    masterWord,
    completeGame,
    doCheckIn,
    recordAnswer,
    refresh,
  };
}
