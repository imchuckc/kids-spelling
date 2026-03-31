import Taro from '@tarojs/taro';

const KEYS = {
  MEMBER_PLAN: 'kids_spelling_member_plan',
  MEMBER_EXPIRE: 'kids_spelling_member_expire',
  MEMBER_ORDER: 'kids_spelling_member_order',
} as const;

export type PlanType = 'monthly' | 'yearly';

export interface MemberInfo {
  plan: PlanType;
  expireAt: number;
  orderId: string;
}

export const PLAN_CONFIG = {
  monthly: { price: 9.9, priceCent: 990, days: 30, label: '包月', unit: '元/月', tag: '' },
  yearly: { price: 68, priceCent: 6800, days: 365, label: '包年', unit: '元/年', tag: '省50元' },
} as const;

// Toggle this to switch between mock and real payment
const IS_MOCK = true;

export function getMemberInfo(): MemberInfo | null {
  const plan = Taro.getStorageSync(KEYS.MEMBER_PLAN) as PlanType | '';
  const expireAt = Taro.getStorageSync(KEYS.MEMBER_EXPIRE) as number | '';
  const orderId = Taro.getStorageSync(KEYS.MEMBER_ORDER) as string | '';
  if (!plan || !expireAt) return null;
  return { plan, expireAt: Number(expireAt), orderId: orderId || '' };
}

export function isMemberActive(): boolean {
  const info = getMemberInfo();
  return !!info && Date.now() < info.expireAt;
}

export function getRemainingDays(): number {
  const info = getMemberInfo();
  if (!info) return 0;
  const diff = info.expireAt - Date.now();
  return Math.max(0, Math.ceil(diff / (24 * 60 * 60 * 1000)));
}

function activateMember(plan: PlanType, orderId: string): void {
  const days = PLAN_CONFIG[plan].days;
  const current = getMemberInfo();
  // If already active, extend from current expiry; otherwise from now
  const base = current && Date.now() < current.expireAt ? current.expireAt : Date.now();
  const expireAt = base + days * 24 * 60 * 60 * 1000;

  Taro.setStorageSync(KEYS.MEMBER_PLAN, plan);
  Taro.setStorageSync(KEYS.MEMBER_EXPIRE, expireAt);
  Taro.setStorageSync(KEYS.MEMBER_ORDER, orderId);
}

/**
 * Request payment — uses mock in dev, real WeChat Pay in production.
 * Returns true if payment succeeded.
 */
export async function requestPayment(plan: PlanType): Promise<boolean> {
  if (IS_MOCK) {
    return mockPayment(plan);
  }
  return realPayment(plan);
}

async function mockPayment(plan: PlanType): Promise<boolean> {
  // Simulate network + payment UI delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  const orderId = `mock_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  activateMember(plan, orderId);
  return true;
}

async function realPayment(_plan: PlanType): Promise<boolean> {
  // TODO: Replace with real cloud function call when merchant account is ready
  //
  // const { result } = await Taro.cloud.callFunction({
  //   name: 'pay',
  //   data: { plan },
  // });
  // await Taro.requestPayment({ ...result.payment });
  // return true;
  //
  throw new Error('Real payment not configured yet. Set IS_MOCK = true to use mock.');
}

export function clearMembership(): void {
  Taro.removeStorageSync(KEYS.MEMBER_PLAN);
  Taro.removeStorageSync(KEYS.MEMBER_EXPIRE);
  Taro.removeStorageSync(KEYS.MEMBER_ORDER);
}
