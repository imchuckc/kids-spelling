import Taro from '@tarojs/taro';

const KEYS = {
  USER_INFO: 'kids_spelling_user',
  LOGIN_TIME: 'kids_spelling_login_time',
} as const;

export interface UserInfo {
  nickName: string;
  avatarUrl: string;
  openId: string;
}

const IS_MOCK = true;

const MOCK_AVATARS = [
  'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI9FhqR65iaEzPKoKp6',
];

export function getUser(): UserInfo | null {
  const info = Taro.getStorageSync(KEYS.USER_INFO) as UserInfo | '';
  return info || null;
}

export function isLoggedIn(): boolean {
  return !!getUser();
}

export async function login(): Promise<UserInfo> {
  if (IS_MOCK) {
    return mockLogin();
  }
  return wxLogin();
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

async function wxLogin(): Promise<UserInfo> {
  // TODO: Real WeChat login flow
  //
  // 1. wx.login() to get code
  // 2. Send code to backend to exchange for openid/session_key
  // 3. wx.getUserProfile() to get user info (requires user tap)
  // 4. Save to backend + local storage
  //
  // const { code } = await Taro.login();
  // const res = await Taro.request({
  //   url: 'https://your-server/api/login',
  //   method: 'POST',
  //   data: { code },
  // });
  // const { openId, sessionKey } = res.data;
  // const { userInfo } = await Taro.getUserProfile({ desc: '用于个人中心展示' });
  //
  throw new Error('Real login not configured. Set IS_MOCK = true.');
}

export function logout(): void {
  Taro.removeStorageSync(KEYS.USER_INFO);
  Taro.removeStorageSync(KEYS.LOGIN_TIME);
}

export function updateNickName(name: string): void {
  const user = getUser();
  if (user) {
    user.nickName = name;
    Taro.setStorageSync(KEYS.USER_INFO, user);
  }
}

export function updateAvatar(url: string): void {
  const user = getUser();
  if (user) {
    user.avatarUrl = url;
    Taro.setStorageSync(KEYS.USER_INFO, user);
  }
}
