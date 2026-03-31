import { useEffect } from 'react';
import { View, Text } from '@tarojs/components';
import { useProgress } from '../../hooks/useProgress';
import { useWordList } from '../../hooks/useWordList';
import { getEmojiForWord } from '../../utils/emoji';
import './index.scss';

// Level thresholds
function getLevel(masteredCount: number): { name: string; icon: string; next: number } {
  if (masteredCount >= 60) return { name: '单词大师', icon: '👑', next: 80 };
  if (masteredCount >= 30) return { name: '探索达人', icon: '🚀', next: 60 };
  if (masteredCount >= 10) return { name: '学习之星', icon: '⭐', next: 30 };
  return { name: '小小学徒', icon: '🌱', next: 10 };
}

// Build last-7-days date strings
function getLast7Days(): string[] {
  const days: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`);
  }
  return days;
}

const WEEKDAY_LABELS = ['日', '一', '二', '三', '四', '五', '六'];

export default function RewardsPage() {
  const { stars, mastered, checkInDays, doCheckIn, refresh } = useProgress();
  const { filteredWords: allWords } = useWordList();

  useEffect(() => {
    doCheckIn();
    refresh();
  }, []);

  const level = getLevel(mastered.length);
  const last7 = getLast7Days();
  const masteredSet = new Set(mastered);

  // Group words by category for the collection album
  const categories = [
    { key: 'animals', label: '动物' },
    { key: 'food', label: '食物' },
    { key: 'colors', label: '颜色' },
    { key: 'body', label: '身体' },
    { key: 'numbers', label: '数字' },
    { key: 'family', label: '家庭' },
    { key: 'school', label: '学校' },
    { key: 'clothes', label: '服装' },
    { key: 'places', label: '地点' },
    { key: 'things', label: '物品' },
    { key: 'nature', label: '自然' },
    { key: 'sports', label: '运动' },
  ];

  return (
    <View className='rewards'>
      {/* Star count + Level */}
      <View className='rewards__header'>
        <View className='rewards__stars-box'>
          <Text className='rewards__star-big'>⭐</Text>
          <Text className='rewards__star-total'>{stars}</Text>
        </View>
        <View className='rewards__level-box'>
          <Text className='rewards__level-icon'>{level.icon}</Text>
          <Text className='rewards__level-name'>{level.name}</Text>
          <Text className='rewards__level-progress'>
            已掌握 {mastered.length} / {level.next} 个
          </Text>
        </View>
      </View>

      {/* Check-in streak */}
      <View className='rewards__section'>
        <Text className='rewards__section-title'>每日打卡</Text>
        <View className='rewards__checkin-row'>
          {last7.map((dateStr, i) => {
            const d = new Date();
            d.setDate(d.getDate() - (6 - i));
            const dayLabel = WEEKDAY_LABELS[d.getDay()];
            const checked = checkInDays.includes(dateStr);

            return (
              <View
                key={dateStr}
                className={`rewards__checkin-day ${checked ? 'rewards__checkin-day--done' : ''}`}
              >
                <Text className='rewards__checkin-label'>{dayLabel}</Text>
                <Text className='rewards__checkin-icon'>
                  {checked ? '✅' : '⬜'}
                </Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Collection album */}
      <View className='rewards__section'>
        <Text className='rewards__section-title'>
          单词收集册 ({mastered.length}/{allWords.length})
        </Text>

        {categories.map(cat => {
          const catWords = allWords.filter(w => w.category === cat.key);
          const catMastered = catWords.filter(w => masteredSet.has(w.id));

          return (
            <View key={cat.key} className='rewards__cat'>
              <Text className='rewards__cat-title'>
                {cat.label} ({catMastered.length}/{catWords.length})
              </Text>
              <View className='rewards__cat-grid'>
                {catWords.map(w => {
                  const unlocked = masteredSet.has(w.id);
                  return (
                    <View
                      key={w.id}
                      className={`rewards__sticker ${unlocked ? 'rewards__sticker--unlocked' : ''}`}
                    >
                      <Text className='rewards__sticker-emoji'>
                        {unlocked ? getEmojiForWord(w.id) : '🔒'}
                      </Text>
                      <Text className='rewards__sticker-word'>
                        {unlocked ? w.word : '???'}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}
