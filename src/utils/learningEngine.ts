/**
 * Learning Engine — Scientifically designed word selection algorithm
 *
 * Based on: Spaced Repetition (Ebbinghaus), Scaffolded Learning (Vygotsky ZPD),
 * Multi-modal Mastery (Bloom), and Retrieval Practice research.
 *
 * Core principle: words move through stages, and all 4 game modes
 * draw from the SAME progress-aware pool.
 */

import Taro from '@tarojs/taro';
import { getWordStats, type WordStat } from './storage';
import type { WordItem } from '../hooks/useWordList';

// --- Word mastery stages ---
export enum WordStage {
  New = 'new',               // Never seen
  Introduced = 'introduced', // Seen in Learn mode
  Practicing = 'practicing', // Attempted in at least 1 game
  Familiar = 'familiar',     // Correct 3+ times
  Mastered = 'mastered',     // Correct 5+ times across 2+ modes
}

// --- Game mode identifiers ---
export type GameMode = 'learn' | 'spell' | 'listen' | 'memory';

const STORAGE_KEY = 'kids_spelling_learn_progress';

export interface WordProgress {
  wordId: string;
  stage: WordStage;
  learnedAt: number;        // When first introduced
  modeHistory: GameMode[];  // Which modes this word was practiced in
  correctByMode: Partial<Record<GameMode, number>>;
  totalCorrect: number;
  totalWrong: number;
  lastPracticed: number;
  nextReview: number;
  streak: number;           // Consecutive correct answers
}

// --- Spaced repetition intervals (ms) ---
const INTERVALS = [
  1 * 60 * 60 * 1000,      // 1 hour
  4 * 60 * 60 * 1000,      // 4 hours
  1 * 24 * 60 * 60 * 1000, // 1 day
  3 * 24 * 60 * 60 * 1000, // 3 days
  7 * 24 * 60 * 60 * 1000, // 7 days
  14 * 24 * 60 * 60 * 1000, // 14 days
  30 * 24 * 60 * 60 * 1000, // 30 days
];

// --- Persistence ---
function loadProgress(): Record<string, WordProgress> {
  return Taro.getStorageSync(STORAGE_KEY) || {};
}

function saveProgress(data: Record<string, WordProgress>): void {
  Taro.setStorageSync(STORAGE_KEY, data);
}

// --- Stage calculation ---
function computeStage(p: WordProgress): WordStage {
  const uniqueModes = new Set(p.modeHistory).size;

  if (p.totalCorrect >= 5 && uniqueModes >= 2) return WordStage.Mastered;
  if (p.totalCorrect >= 3) return WordStage.Familiar;
  if (p.totalCorrect > 0 || p.totalWrong > 0) return WordStage.Practicing;
  if (p.learnedAt > 0) return WordStage.Introduced;
  return WordStage.New;
}

// --- Public API ---

/**
 * Mark a word as introduced (seen in Learn mode).
 */
export function markIntroduced(wordId: string): void {
  const all = loadProgress();
  const existing = all[wordId] || createEmpty(wordId);
  if (!existing.learnedAt) {
    existing.learnedAt = Date.now();
  }
  if (!existing.modeHistory.includes('learn')) {
    existing.modeHistory.push('learn');
  }
  existing.stage = computeStage(existing);
  all[wordId] = existing;
  saveProgress(all);
}

/**
 * Record a practice result in any game mode.
 */
export function recordPractice(wordId: string, mode: GameMode, correct: boolean): void {
  const all = loadProgress();
  const p = all[wordId] || createEmpty(wordId);
  const now = Date.now();

  if (!p.modeHistory.includes(mode)) {
    p.modeHistory.push(mode);
  }

  if (correct) {
    p.totalCorrect++;
    p.streak++;
    p.correctByMode[mode] = (p.correctByMode[mode] || 0) + 1;

    const intervalIdx = Math.min(p.streak - 1, INTERVALS.length - 1);
    p.nextReview = now + INTERVALS[intervalIdx];
  } else {
    p.totalWrong++;
    p.streak = 0;
    p.nextReview = now + INTERVALS[0];
  }

  p.lastPracticed = now;
  p.stage = computeStage(p);
  all[wordId] = p;
  saveProgress(all);
}

/**
 * Get the progress record for a word.
 */
export function getWordProgress(wordId: string): WordProgress {
  const all = loadProgress();
  return all[wordId] || createEmpty(wordId);
}

/**
 * Smart word selection for game modes.
 *
 * Selection strategy:
 * 1. Overdue review words (spaced repetition says it's time)
 * 2. Words in the "introduced" or "practicing" stage (reinforce recent learning)
 * 3. New words from curriculum order (gentle introduction)
 *
 * Ratio: ~40% review + 40% practice + 20% new
 */
export function getSmartWords(
  allWords: WordItem[],
  count: number,
  mode: GameMode,
): WordItem[] {
  const progress = loadProgress();
  const now = Date.now();
  const wordMap = new Map(allWords.map(w => [w.id, w]));

  const overdue: { word: WordItem; urgency: number }[] = [];
  const practicing: { word: WordItem; score: number }[] = [];
  const introduced: WordItem[] = [];
  const newWords: WordItem[] = [];

  for (const w of allWords) {
    const p = progress[w.id];
    if (!p || p.stage === WordStage.New) {
      newWords.push(w);
      continue;
    }

    if (p.stage === WordStage.Mastered) {
      // Even mastered words can come back if overdue
      if (p.nextReview <= now) {
        overdue.push({ word: w, urgency: now - p.nextReview });
      }
      continue;
    }

    if (p.nextReview <= now) {
      overdue.push({ word: w, urgency: now - p.nextReview });
    } else if (p.stage === WordStage.Practicing || p.stage === WordStage.Familiar) {
      // Prioritize words NOT yet practiced in this specific mode
      const modeCount = p.correctByMode[mode] || 0;
      practicing.push({ word: w, score: 100 - modeCount * 20 + p.totalWrong * 10 });
    } else if (p.stage === WordStage.Introduced) {
      introduced.push(w);
    }
  }

  // Sort by priority
  overdue.sort((a, b) => b.urgency - a.urgency);
  practicing.sort((a, b) => b.score - a.score);

  // Allocate slots
  const overdueSlots = Math.ceil(count * 0.4);
  const practiceSlots = Math.ceil(count * 0.4);
  const newSlots = count - overdueSlots - practiceSlots;

  const result: WordItem[] = [];
  const used = new Set<string>();

  const addWord = (w: WordItem) => {
    if (!used.has(w.id)) {
      result.push(w);
      used.add(w.id);
    }
  };

  // 1. Overdue words
  for (const o of overdue) {
    if (result.length >= overdueSlots) break;
    addWord(o.word);
  }

  // 2. Practicing / introduced words
  for (const p of practicing) {
    if (result.length >= overdueSlots + practiceSlots) break;
    addWord(p.word);
  }
  for (const w of introduced) {
    if (result.length >= overdueSlots + practiceSlots) break;
    addWord(w);
  }

  // 3. New words (in curriculum order — maintains textbook sequence)
  for (const w of newWords) {
    if (result.length >= count) break;
    addWord(w);
  }

  // If still not enough, fill from any remaining
  const allRemaining = [...overdue.map(o => o.word), ...practicing.map(p => p.word), ...introduced, ...newWords];
  for (const w of allRemaining) {
    if (result.length >= count) break;
    addWord(w);
  }

  // Shuffle the selected words so it doesn't feel predictable,
  // but keep the new words cluster at the end for scaffolding
  const reviewPart = result.filter(w => {
    const p = progress[w.id];
    return p && p.stage !== WordStage.New;
  });
  const newPart = result.filter(w => {
    const p = progress[w.id];
    return !p || p.stage === WordStage.New;
  });

  return [...fisherYatesShuffle(reviewPart), ...newPart];
}

/**
 * Get learning stats summary.
 */
export function getLearningStats(allWordIds: string[]) {
  const progress = loadProgress();
  let newCount = 0, introduced = 0, practicing = 0, familiar = 0, mastered = 0;

  for (const id of allWordIds) {
    const p = progress[id];
    if (!p || p.stage === WordStage.New) newCount++;
    else if (p.stage === WordStage.Introduced) introduced++;
    else if (p.stage === WordStage.Practicing) practicing++;
    else if (p.stage === WordStage.Familiar) familiar++;
    else if (p.stage === WordStage.Mastered) mastered++;
  }

  return { new: newCount, introduced, practicing, familiar, mastered, total: allWordIds.length };
}

// --- Helpers ---

function createEmpty(wordId: string): WordProgress {
  return {
    wordId,
    stage: WordStage.New,
    learnedAt: 0,
    modeHistory: [],
    correctByMode: {},
    totalCorrect: 0,
    totalWrong: 0,
    lastPracticed: 0,
    nextReview: 0,
    streak: 0,
  };
}

function fisherYatesShuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
