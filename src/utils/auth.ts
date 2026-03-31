import Taro from '@tarojs/taro';
import { isCloudReady, callCloudFunction, pullFromCloud, scheduleSyncToCloud } from './cloud';

const KEYS = {
  USER_INFO: 'kids_spelling_user',
  LOGIN_TIME: 'kids_spelling_login_time',
} as const;

export interface UserInfo {
  nickName: string;
  avatarUrl: string;
  openId: string;
}

const MOCK_AVATARS = [
  'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI9FhqR65iaEzPKoKp6',
];

// ── Read ─────────────────────────────────────────────────────

export function getUser(): UserInfo | null {
  const info = Taro.getStorageSync(KEYS.USER_INFO) as UserInfo | '';
  return info || null;
}

export function isLoggedIn(): boolean {
  return !!getUser();
}

// ── Login — picks cloud or mock automatically ────────────────

export async function login(): Promise<UserInfo> {
  if (isCloudReady()) {
    return cloudLogin();
  }
  return mockLogin();
}

async function mockLogin(): Promise<UserInfo> {
  await new Promise(r => setTimeout(r, 800));

  const user: UserInfo = {
    nickName: '小小学霸',
    avatarUrl: MOCK_AVATARS[0],
    openId: `mock_${Date.now()}`,
  };

  Taro.setStorageSync(KEYS.USER_INFO, user);
  Taro.setStorageSync(KEYS.LOGIN_TIME, Date.now());
  return user;
}

async function cloudLogin(): Promise<UserInfo> {
  const result = await callCloudFunction<{
    openId: string;
    isNew: boolean;
    user?: { nickName: string; avatarUrl: string };
  }>('login');

  if (!result?.openId) {
    throw new Error('Cloud login failed');
  }

  const user: UserInfo = {
    nickName: result.user?.nickName || '小朋友',
    avatarUrl: result.user?.avatarUrl || '',
    openId: result.openId,
  };

  Taro.setStorageSync(KEYS.USER_INFO, user);
  Taro.setStorageSync(KEYS.LOGIN_TIME, Date.now());

  // Pull remote data and merge with local on first login
  await pullFromCloud();

  return user;
}

// ── Logout ───────────────────────────────────────────────────

export function logout(): void {
  Taro.removeStorageSync(KEYS.USER_INFO);
  Taro.removeStorageSync(KEYS.LOGIN_TIME);
}

// ── Profile updates — sync to cloud when available ───────────

export function updateNickName(name: string): void {
  const user = getUser();
  if (user) {
    user.nickName = name;
    Taro.setStorageSync(KEYS.USER_INFO, user);
    if (isCloudReady()) {
      callCloudFunction('login', { nickName: name });
    }
  }
}

export function updateAvatar(url: string): void {
  const user = getUser();
  if (user) {
    user.avatarUrl = url;
    Taro.setStorageSync(KEYS.USER_INFO, user);
    if (isCloudReady()) {
      callCloudFunction('login', { avatarUrl: url });
    }
  }
}
