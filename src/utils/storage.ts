import Taro from '@tarojs/taro';

const KEYS = {
  STARS: 'kids_spelling_stars',
  MASTERED: 'kids_spelling_mastered',
  DAILY_PROGRESS: 'kids_spelling_daily',
  CHECK_IN: 'kids_spelling_checkin',
  WORD_STATS: 'kids_spelling_word_stats',
  CUSTOM_WORDS: 'kids_spelling_custom_words',
  SELECTED_COURSE: 'kids_spelling_course',
} as const;

export interface DailyProgress {
  date: string;
  wordsCompleted: number;
  gamesPlayed: number;
}

export interface WordStat {
  wordId: string;
  correctCount: number;
  wrongCount: number;
  lastReview: number;
  nextReview: number;
  interval: number;
  ease: number;
}

function todayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

export function getTotalStars(): number {
  return Taro.getStorageSync(KEYS.STARS) || 0;
}

export function addStars(count: number): number {
  const total = getTotalStars() + count;
  Taro.setStorageSync(KEYS.STARS, total);
  return total;
}

export function getMasteredWords(): string[] {
  return Taro.getStorageSync(KEYS.MASTERED) || [];
}

export function addMasteredWord(wordId: string): void {
  const list = getMasteredWords();
  if (!list.includes(wordId)) {
    list.push(wordId);
    Taro.setStorageSync(KEYS.MASTERED, list);
  }
}

export function getDailyProgress(): DailyProgress {
  const saved = Taro.getStorageSync(KEYS.DAILY_PROGRESS) as DailyProgress | '';
  if (!saved || saved.date !== todayStr()) {
    return { date: todayStr(), wordsCompleted: 0, gamesPlayed: 0 };
  }
  return saved;
}

export function updateDailyProgress(wordsCompleted: number): void {
  const current = getDailyProgress();
  current.wordsCompleted += wordsCompleted;
  current.gamesPlayed += 1;
  current.date = todayStr();
  Taro.setStorageSync(KEYS.DAILY_PROGRESS, current);
}

export function getCheckInDays(): string[] {
  return Taro.getStorageSync(KEYS.CHECK_IN) || [];
}

export function checkInToday(): string[] {
  const days = getCheckInDays();
  const today = todayStr();
  if (!days.includes(today)) {
    days.push(today);
    Taro.setStorageSync(KEYS.CHECK_IN, days);
  }
  return days;
}

export function getWordStats(): Record<string, WordStat> {
  return Taro.getStorageSync(KEYS.WORD_STATS) || {};
}

export function updateWordStat(wordId: string, correct: boolean): void {
  const stats = getWordStats();
  const existing = stats[wordId] || {
    wordId,
    correctCount: 0,
    wrongCount: 0,
    lastReview: Date.now(),
    nextReview: Date.now(),
    interval: 1,
    ease: 2.5,
  };

  if (correct) {
    existing.correctCount++;
  } else {
    existing.wrongCount++;
  }
  existing.lastReview = Date.now();
  stats[wordId] = existing;
  Taro.setStorageSync(KEYS.WORD_STATS, stats);
}

export function getCustomWords() {
  return Taro.getStorageSync(KEYS.CUSTOM_WORDS) || [];
}

export function setCustomWords(words: any[]) {
  Taro.setStorageSync(KEYS.CUSTOM_WORDS, words);
}

export function getSelectedCourse(): string {
  return Taro.getStorageSync(KEYS.SELECTED_COURSE) || 'dolch:pre-primer';
}

export function setSelectedCourse(course: string): void {
  Taro.setStorageSync(KEYS.SELECTED_COURSE, course);
}
