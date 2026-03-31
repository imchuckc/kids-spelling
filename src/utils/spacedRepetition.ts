import { getWordStats, type WordStat } from './storage';

// Simplified SM-2 spaced repetition:
// - Each word tracks ease factor and interval
// - Correct answer increases interval, wrong answer resets it
// - Words due for review (nextReview <= now) get priority

const MIN_EASE = 1.3;
const INITIAL_INTERVAL_MS = 60 * 60 * 1000; // 1 hour

export function computeNextReview(stat: WordStat, correct: boolean): Partial<WordStat> {
  let { ease, interval } = stat;

  if (correct) {
    interval = interval * ease;
    ease = Math.max(MIN_EASE, ease + 0.1);
  } else {
    interval = INITIAL_INTERVAL_MS;
    ease = Math.max(MIN_EASE, ease - 0.2);
  }

  return {
    ease,
    interval,
    nextReview: Date.now() + interval,
    lastReview: Date.now(),
  };
}

/**
 * Returns word IDs sorted by review priority:
 * 1. Words that are overdue for review
 * 2. Words never reviewed
 * 3. Words reviewed recently (lowest priority)
 */
export function getReviewPriority(allWordIds: string[]): string[] {
  const stats = getWordStats();
  const now = Date.now();

  const overdue: { id: string; priority: number }[] = [];
  const unreviewed: string[] = [];
  const upcoming: { id: string; nextReview: number }[] = [];

  for (const id of allWordIds) {
    const stat = stats[id];
    if (!stat) {
      unreviewed.push(id);
    } else if (stat.nextReview <= now) {
      overdue.push({ id, priority: now - stat.nextReview });
    } else {
      upcoming.push({ id, nextReview: stat.nextReview });
    }
  }

  overdue.sort((a, b) => b.priority - a.priority);
  upcoming.sort((a, b) => a.nextReview - b.nextReview);

  return [
    ...overdue.map(o => o.id),
    ...unreviewed,
    ...upcoming.map(u => u.id),
  ];
}
