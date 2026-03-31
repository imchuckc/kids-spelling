import { useState } from 'react';
import { View, Text } from '@tarojs/components';
import Taro, { useDidShow } from '@tarojs/taro';
import { useAuth } from '../../hooks/useAuth';
import { useMembership } from '../../hooks/useMembership';
import { useProgress } from '../../hooks/useProgress';
import './index.scss';

function getMonthDays(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function formatDate(y: number, m: number, d: number): string {
  return `${y}-${m + 1}-${d}`;
}

const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六'];

export default function ProfilePage() {
  const { user, logged, loading, doLogin, doLogout } = useAuth();
  const { isVip, remaining } = useMembership();
  const { stars, mastered, checkInDays, daily, refresh: refreshProgress } = useProgress();

  const now = new Date();
  const [calYear, setCalYear] = useState(now.getFullYear());
  const [calMonth, setCalMonth] = useState(now.getMonth());

  useDidShow(() => { refreshProgress(); });

  const totalDays = getMonthDays(calYear, calMonth);
  const firstDay = getFirstDayOfWeek(calYear, calMonth);

  const prevMonth = () => {
    if (calMonth === 0) { setCalYear(calYear - 1); setCalMonth(11); }
    else setCalMonth(calMonth - 1);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalYear(calYear + 1); setCalMonth(0); }
    else setCalMonth(calMonth + 1);
  };

  const todayStr = formatDate(now.getFullYear(), now.getMonth(), now.getDate());
  const streak = calcStreak(checkInDays);

  return (
    <View className='profile'>
      {/* Magical background decorations */}
      <View className='profile__bg'>
        <Text className='profile__sparkle profile__sparkle--1'>✨</Text>
        <Text className='profile__sparkle profile__sparkle--2'>⭐</Text>
        <Text className='profile__sparkle profile__sparkle--3'>✨</Text>
        <Text className='profile__sparkle profile__sparkle--4'>🌟</Text>
      </View>

      {/* Hero card */}
      <View className='profile__hero'>
        {logged && user ? (
          <>
            <View className='profile__avatar'>
              <Text className='profile__avatar-face'>🧒</Text>
              <View className='profile__avatar-ring' />
            </View>
            <Text className='profile__name'>{user.nickName}</Text>
            {isVip ? (
              <View className='profile__badge profile__badge--vip'>
                <Text className='profile__badge-text'>👑 VIP · 剩余{remaining}天</Text>
              </View>
            ) : (
              <View className='profile__badge' onClick={() => Taro.navigateTo({ url: '/pages/membership/index' })}>
                <Text className='profile__badge-text'>点击开通 VIP</Text>
              </View>
            )}
          </>
        ) : (
          <>
            <View className='profile__avatar profile__avatar--guest'>
              <Text className='profile__avatar-face'>🏰</Text>
            </View>
            <View
              className={`profile__login-btn ${loading ? 'profile__login-btn--loading' : ''}`}
              onClick={doLogin}
            >
              <Text className='profile__login-icon'>✨</Text>
              <Text className='profile__login-text'>{loading ? '魔法连接中...' : '微信登录'}</Text>
            </View>
            <Text className='profile__login-hint'>登录后可记录学习进度</Text>
          </>
        )}
      </View>

      {/* Stats - treasure chest style */}
      <View className='profile__stats'>
        <View className='profile__stat'>
          <Text className='profile__stat-icon'>⭐</Text>
          <Text className='profile__stat-num'>{stars}</Text>
          <Text className='profile__stat-label'>星星</Text>
        </View>
        <View className='profile__stat'>
          <Text className='profile__stat-icon'>📖</Text>
          <Text className='profile__stat-num'>{mastered.length}</Text>
          <Text className='profile__stat-label'>已掌握</Text>
        </View>
        <View className='profile__stat'>
          <Text className='profile__stat-icon'>🔥</Text>
          <Text className='profile__stat-num'>{streak}</Text>
          <Text className='profile__stat-label'>连续打卡</Text>
        </View>
        <View className='profile__stat'>
          <Text className='profile__stat-icon'>📅</Text>
          <Text className='profile__stat-num'>{checkInDays.length}</Text>
          <Text className='profile__stat-label'>总打卡</Text>
        </View>
      </View>

      {/* Today's adventure */}
      <View className='profile__today'>
        <View className='profile__section-head'>
          <Text className='profile__section-icon'>🗺️</Text>
          <Text className='profile__section-title'>今日冒险</Text>
        </View>
        <View className='profile__today-cards'>
          <View className='profile__today-card profile__today-card--words'>
            <Text className='profile__today-emoji'>📝</Text>
            <Text className='profile__today-num'>{daily.wordsCompleted}</Text>
            <Text className='profile__today-label'>学习单词</Text>
          </View>
          <View className='profile__today-card profile__today-card--games'>
            <Text className='profile__today-emoji'>🎮</Text>
            <Text className='profile__today-num'>{daily.gamesPlayed}</Text>
            <Text className='profile__today-label'>游戏场次</Text>
          </View>
        </View>
      </View>

      {/* Check-in calendar - magic scroll style */}
      <View className='profile__calendar'>
        <View className='profile__section-head'>
          <Text className='profile__section-icon'>📜</Text>
          <Text className='profile__section-title'>打卡魔法书</Text>
        </View>

        <View className='profile__cal-nav'>
          <Text className='profile__cal-arrow' onClick={prevMonth}>◀</Text>
          <Text className='profile__cal-month'>{calYear}年{calMonth + 1}月</Text>
          <Text className='profile__cal-arrow' onClick={nextMonth}>▶</Text>
        </View>

        <View className='profile__cal-weekdays'>
          {WEEKDAYS.map(d => (
            <Text key={d} className='profile__cal-wd'>{d}</Text>
          ))}
        </View>

        <View className='profile__cal-grid'>
          {Array.from({ length: firstDay }).map((_, i) => (
            <View key={`e-${i}`} className='profile__cal-cell profile__cal-cell--empty' />
          ))}
          {Array.from({ length: totalDays }).map((_, i) => {
            const day = i + 1;
            const dateStr = formatDate(calYear, calMonth, day);
            const checked = checkInDays.includes(dateStr);
            const isToday = dateStr === todayStr;
            return (
              <View
                key={day}
                className={`profile__cal-cell ${checked ? 'profile__cal-cell--checked' : ''} ${isToday ? 'profile__cal-cell--today' : ''}`}
              >
                <Text className='profile__cal-num'>{day}</Text>
                {checked && <Text className='profile__cal-star'>⭐</Text>}
              </View>
            );
          })}
        </View>
      </View>

      {/* Menu items */}
      <View className='profile__menu'>
        <View className='profile__menu-item' onClick={() => Taro.navigateTo({ url: '/pages/membership/index' })}>
          <Text className='profile__menu-icon'>👑</Text>
          <Text className='profile__menu-text'>{isVip ? '会员管理' : '开通会员'}</Text>
          {isVip && <Text className='profile__menu-hint'>剩余{remaining}天</Text>}
          <Text className='profile__menu-arrow'>›</Text>
        </View>
        {logged && (
          <View className='profile__menu-item profile__menu-item--logout' onClick={doLogout}>
            <Text className='profile__menu-icon'>🚪</Text>
            <Text className='profile__menu-text'>退出登录</Text>
            <Text className='profile__menu-arrow'>›</Text>
          </View>
        )}
      </View>

      <View className='profile__mock'>
        <Text className='profile__mock-text'>🧪 测试模式</Text>
      </View>
    </View>
  );
}

function calcStreak(days: string[]): number {
  if (!days.length) return 0;

  const sorted = [...days].sort((a, b) => {
    const da = new Date(a).getTime();
    const db = new Date(b).getTime();
    return db - da;
  });

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
  const yesterdayStr = `${yesterday.getFullYear()}-${yesterday.getMonth() + 1}-${yesterday.getDate()}`;

  if (sorted[0] !== todayStr && sorted[0] !== yesterdayStr) return 0;

  let streak = 1;
  for (let i = 1; i < sorted.length; i++) {
    const curr = new Date(sorted[i - 1]);
    const prev = new Date(sorted[i]);
    const diff = (curr.getTime() - prev.getTime()) / (24 * 60 * 60 * 1000);
    if (Math.abs(diff - 1) < 0.5) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}
