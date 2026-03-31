/**
 * Cloud development wrapper.
 *
 * How to enable:
 *   1. Open WeChat DevTools → Cloud Development → Create environment
 *   2. Copy the environment ID into CLOUD_ENV below
 *   3. Set IS_CLOUD = true
 *   4. Create cloud DB collections: users, user_data, orders
 *   5. Right-click each cloud function folder → Upload and Deploy
 */

import Taro from '@tarojs/taro';

export const IS_CLOUD = true;
export const CLOUD_ENV = 'cloud1-4g5hzzvh6e819a83';

// wx is the native WeChat global — always available in mini programs
declare const wx: any;

let _ready = false;
let _syncTimer: any = null;
let _dirty = false;

const SYNC_DELAY_MS = 5000;

// ── Initialization ───────────────────────────────────────────

export function initCloud(): void {
  if (!IS_CLOUD || _ready) return;
  try {
    wx.cloud.init({ env: CLOUD_ENV, traceUser: true });
    _ready = true;
    console.log('[Cloud] init OK, env:', CLOUD_ENV);
  } catch (e) {
    console.error('[Cloud] init FAILED:', e);
  }
}

export function isCloudReady(): boolean {
  return _ready;
}

// ── Cloud function caller ────────────────────────────────────

export async function callCloudFunction<T = any>(
  name: string,
  data: Record<string, any> = {},
): Promise<T | null> {
  if (!_ready) return null;
  try {
    console.log(`[Cloud] calling ${name}...`);
    const res: any = await wx.cloud.callFunction({ name, data });
    console.log(`[Cloud] ${name} OK:`, JSON.stringify(res.result));
    return res.result as T;
  } catch (e) {
    console.error(`[Cloud] ${name} FAILED:`, e);
    return null;
  }
}

// ── Debounced sync: batch local writes into one cloud push ───

export function scheduleSyncToCloud(): void {
  if (!_ready) return;
  _dirty = true;
  if (_syncTimer) clearTimeout(_syncTimer);
  _syncTimer = setTimeout(pushAllData, SYNC_DELAY_MS);
}

/** Force-flush pending sync (call on app hide). */
export async function forceSyncToCloud(): Promise<void> {
  if (!_ready || !_dirty) return;
  if (_syncTimer) clearTimeout(_syncTimer);
  await pushAllData();
}

async function pushAllData(): Promise<void> {
  _dirty = false;
  const snapshot = {
    stars: Taro.getStorageSync('kids_spelling_stars') || 0,
    mastered: Taro.getStorageSync('kids_spelling_mastered') || [],
    dailyProgress: Taro.getStorageSync('kids_spelling_daily') || null,
    checkInDays: Taro.getStorageSync('kids_spelling_checkin') || [],
    wordStats: Taro.getStorageSync('kids_spelling_word_stats') || {},
    customWords: Taro.getStorageSync('kids_spelling_custom_words') || [],
    selectedCourse: Taro.getStorageSync('kids_spelling_course') || '',
    learnProgress: Taro.getStorageSync('kids_spelling_learn_progress') || {},
    memberPlan: Taro.getStorageSync('kids_spelling_member_plan') || '',
    memberExpire: Taro.getStorageSync('kids_spelling_member_expire') || 0,
    memberOrder: Taro.getStorageSync('kids_spelling_member_order') || '',
  };
  await callCloudFunction('sync', { action: 'push', data: snapshot });
}

// ── Pull cloud data & merge into local storage ──────────────

export async function pullFromCloud(): Promise<boolean> {
  if (!_ready) return false;
  try {
    const res = await callCloudFunction<{ data: any }>('sync', { action: 'pull' });
    if (!res?.data) return false;
    mergeIntoLocal(res.data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Merge strategy:
 *  - Stars: keep the larger value
 *  - Mastered / check-in arrays: union (no duplicates)
 *  - Word stats / learn progress: per-word, keep the higher correctCount
 *  - Settings (course, membership): cloud overwrites local
 */
function mergeIntoLocal(c: Record<string, any>): void {
  if (c.stars != null) {
    const local = Taro.getStorageSync('kids_spelling_stars') || 0;
    Taro.setStorageSync('kids_spelling_stars', Math.max(local, c.stars));
  }

  if (Array.isArray(c.mastered)) {
    const local: string[] = Taro.getStorageSync('kids_spelling_mastered') || [];
    Taro.setStorageSync('kids_spelling_mastered', [...new Set([...local, ...c.mastered])]);
  }

  if (Array.isArray(c.checkInDays)) {
    const local: string[] = Taro.getStorageSync('kids_spelling_checkin') || [];
    Taro.setStorageSync('kids_spelling_checkin', [...new Set([...local, ...c.checkInDays])]);
  }

  if (c.wordStats && typeof c.wordStats === 'object') {
    const local = Taro.getStorageSync('kids_spelling_word_stats') || {};
    const merged: Record<string, any> = { ...c.wordStats };
    for (const [k, v] of Object.entries(local)) {
      if (!merged[k] || (v as any).correctCount > merged[k].correctCount) {
        merged[k] = v;
      }
    }
    Taro.setStorageSync('kids_spelling_word_stats', merged);
  }

  if (c.learnProgress && typeof c.learnProgress === 'object') {
    const local = Taro.getStorageSync('kids_spelling_learn_progress') || {};
    const merged: Record<string, any> = { ...c.learnProgress };
    for (const [k, v] of Object.entries(local)) {
      if (!merged[k] || (v as any).totalCorrect > merged[k].totalCorrect) {
        merged[k] = v;
      }
    }
    Taro.setStorageSync('kids_spelling_learn_progress', merged);
  }

  if (Array.isArray(c.customWords)) {
    Taro.setStorageSync('kids_spelling_custom_words', c.customWords);
  }
  if (c.selectedCourse) {
    Taro.setStorageSync('kids_spelling_course', c.selectedCourse);
  }
  if (c.memberPlan) {
    Taro.setStorageSync('kids_spelling_member_plan', c.memberPlan);
    Taro.setStorageSync('kids_spelling_member_expire', c.memberExpire || 0);
    Taro.setStorageSync('kids_spelling_member_order', c.memberOrder || '');
  }
}
