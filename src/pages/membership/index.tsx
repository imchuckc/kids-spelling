import { useState } from 'react';
import { View, Text } from '@tarojs/components';
import Taro, { useDidShow } from '@tarojs/taro';
import { PLAN_CONFIG, requestPayment, type PlanType } from '../../utils/membership';
import { useMembership } from '../../hooks/useMembership';
import './index.scss';

const PLANS: { key: PlanType; recommend?: boolean }[] = [
  { key: 'monthly' },
  { key: 'yearly', recommend: true },
];

const BENEFITS = [
  { icon: '📚', text: '全部词库无限学' },
  { icon: '🎮', text: '4种游戏模式畅玩' },
  { icon: '📊', text: '学习报告与统计' },
  { icon: '🔄', text: '持续更新新词库' },
];

export default function MembershipPage() {
  const [selected, setSelected] = useState<PlanType>('yearly');
  const [loading, setLoading] = useState(false);
  const { isVip, remaining, refresh } = useMembership();

  useDidShow(() => { refresh(); });

  const handlePay = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const success = await requestPayment(selected);
      if (success) {
        refresh();
        Taro.showToast({ title: '开通成功！', icon: 'success', duration: 2000 });
      }
    } catch (err: any) {
      const msg = err?.errMsg?.includes('cancel') ? '已取消' : '支付失败，请重试';
      Taro.showToast({ title: msg, icon: 'none' });
    } finally {
      setLoading(false);
    }
  };

  const config = PLAN_CONFIG[selected];

  return (
    <View className='member'>
      {/* Header */}
      <View className='member__header'>
        <Text className='member__crown'>👑</Text>
        <Text className='member__title'>VIP 会员</Text>
        {isVip ? (
          <Text className='member__status member__status--active'>
            会员生效中 · 剩余 {remaining} 天
          </Text>
        ) : (
          <Text className='member__status'>解锁全部内容，助力宝宝学习</Text>
        )}
      </View>

      {/* Benefits */}
      <View className='member__benefits'>
        {BENEFITS.map(b => (
          <View key={b.text} className='member__benefit'>
            <Text className='member__benefit-icon'>{b.icon}</Text>
            <Text className='member__benefit-text'>{b.text}</Text>
          </View>
        ))}
      </View>

      {/* Plan cards */}
      <View className='member__plans'>
        {PLANS.map(({ key, recommend }) => {
          const cfg = PLAN_CONFIG[key];
          const active = selected === key;
          return (
            <View
              key={key}
              className={`member__plan ${active ? 'member__plan--active' : ''}`}
              onClick={() => setSelected(key)}
            >
              {cfg.tag ? <Text className='member__plan-tag'>{cfg.tag}</Text> : null}
              {recommend && <Text className='member__plan-badge'>推荐</Text>}
              <Text className='member__plan-label'>{cfg.label}</Text>
              <View className='member__plan-price-row'>
                <Text className='member__plan-currency'>¥</Text>
                <Text className='member__plan-price'>{cfg.price}</Text>
              </View>
              <Text className='member__plan-unit'>{cfg.unit}</Text>
            </View>
          );
        })}
      </View>

      {/* Pay button */}
      <View
        className={`member__pay-btn ${loading ? 'member__pay-btn--loading' : ''}`}
        onClick={handlePay}
      >
        <Text className='member__pay-btn-text'>
          {loading ? '处理中...' : isVip ? `续费 ¥${config.price}` : `立即开通 ¥${config.price}`}
        </Text>
      </View>

      {/* Mock badge — remove in production */}
      <View className='member__mock-badge'>
        <Text className='member__mock-text'>🧪 测试模式 · 不会真实扣费</Text>
      </View>

      {/* Footer */}
      <Text className='member__footer'>
        开通即同意《会员服务协议》· 到期后不自动续费
      </Text>
    </View>
  );
}
