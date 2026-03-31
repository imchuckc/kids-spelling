import { useState, useMemo, useCallback } from 'react';
import dolchData from '../data/dolch.json';
import fryData from '../data/fry.json';
import wondersData from '../data/wonders.json';
import yleData from '../data/yle.json';
import { getSelectedCourse, setSelectedCourse as saveCourse } from '../utils/storage';
import { getSmartWords, type GameMode } from '../utils/learningEngine';

export interface ExampleSentence {
  en: string;
  zh: string;
}

export interface WordItem {
  id: string;
  word: string;
  zh: string;
  img: string;
  audio: string;
  category: string;
  level: string;
  examples?: ExampleSentence[];
}

export interface LevelOption {
  key: string;
  label: string;
  desc: string;
}

export interface CurriculumData {
  id: string;
  name: string;
  desc: string;
  icon: string;
  levels: LevelOption[];
  words: WordItem[];
}

// Normalize word items: add id, img, audio fields
function normalizeWords(data: any): CurriculumData {
  const raw = data as any;
  return {
    ...raw,
    words: raw.words.map((w: any) => ({
      ...w,
      id: w.word.replace(/\s+/g, '_'),
      img: `${w.cat}/${w.word.replace(/\s+/g, '_')}`,
      audio: `words/${w.word}`,
    })),
  };
}

const ALL_CURRICULA: CurriculumData[] = [
  normalizeWords(dolchData),
  normalizeWords(fryData),
  normalizeWords(wondersData),
  normalizeWords(yleData),
];

function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Stored as "curriculumId:levelKey", e.g. "dolch:pre-primer"
function parseSelection(s: string): { currId: string; levelKey: string } {
  const [currId, levelKey] = s.split(':');
  return { currId: currId || 'dolch', levelKey: levelKey || '' };
}

function serializeSelection(currId: string, levelKey: string): string {
  return `${currId}:${levelKey}`;
}

export function useWordList() {
  const [selection, setSelection] = useState<string>(() => getSelectedCourse());

  const { currId, levelKey } = useMemo(() => parseSelection(selection), [selection]);

  const curriculum = useMemo(() =>
    ALL_CURRICULA.find(c => c.id === currId) || ALL_CURRICULA[0]
  , [currId]);

  const currentLevel = useMemo(() =>
    curriculum.levels.find(l => l.key === levelKey) || curriculum.levels[0]
  , [curriculum, levelKey]);

  const filteredWords = useMemo(() => {
    const lvl = currentLevel?.key;
    if (!lvl) return curriculum.words;
    return curriculum.words.filter(w => w.level === lvl);
  }, [curriculum, currentLevel]);

  const selectCourse = useCallback((cId: string, lKey: string) => {
    const val = serializeSelection(cId, lKey);
    setSelection(val);
    saveCourse(val);
  }, []);

  const getRandomWords = useCallback((count: number): WordItem[] => {
    const shuffled = shuffle(filteredWords);
    return shuffled.slice(0, Math.min(count, shuffled.length));
  }, [filteredWords]);

  const getSmartWordsForMode = useCallback((count: number, mode: GameMode): WordItem[] => {
    return getSmartWords(filteredWords, count, mode);
  }, [filteredWords]);

  const getRandomDistractorLetters = useCallback((word: string, count: number): string[] => {
    const wordLetters = new Set(word.toLowerCase().split(''));
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const available = alphabet.split('').filter(l => !wordLetters.has(l));
    return shuffle(available).slice(0, count);
  }, []);

  return {
    allCurricula: ALL_CURRICULA,
    curriculum,
    currentLevel,
    filteredWords,
    selectCourse,
    getRandomWords,
    getSmartWordsForMode,
    getRandomDistractorLetters,
    shuffle,
  };
}
