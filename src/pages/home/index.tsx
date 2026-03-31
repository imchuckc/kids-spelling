import { useEffect, useState } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useProgress } from '../../hooks/useProgress';
import { useWordList } from '../../hooks/useWordList';
import ProgressRing from '../../components/ProgressRing';
import './index.scss';

const DAILY_GOAL = 10;

const GAME_MODES = [
  { key: 'learn', icon: '📖', title: '看图认词', subtitle: 'Learn', color: '#6BCB77', path: '/pages/learn/index' },
  { key: 'spell', icon: '🧩', title: '拼一拼', subtitle: 'Spell', color: '#7C5CFC', path: '/pages/spell/index' },
  { key: 'listen', icon: '🎧', title: '听一听', subtitle: 'Listen', color: '#FF6B9D', path: '/pages/listen/index' },
  { key: 'memory', icon: '🃏', title: '翻翻看', subtitle: 'Memory', color: '#FFD93D', path: '/pages/memory/index' },
];

export default function HomePage() {
  const { stars, daily, doCheckIn, refresh } = useProgress();
  const { allCurricula, curriculum, currentLevel, filteredWords, selectCourse } = useWordList();
  const [showPicker, setShowPicker] = useState(false);
  const [pickerTab, setPickerTab] = useState(curriculum.id);

  useEffect(() => { doCheckIn(); refresh(); }, []);

  const goTo = (path: string) => Taro.navigateTo({ url: path });

  const handleSelect = (cId: string, lKey: string) => {
    selectCourse(cId, lKey);
    setShowPicker(false);
    Taro.showToast({ title: '已切换', icon: 'success' });
  };

  const pickerCurr = allCurricula.find(c => c.id === pickerTab) || allCurricula[0];

  return (
    <View className='home'>
      <View className='home__bg-letters'>
        {['A', 'B', 'C', 'D', 'E'].map((letter, i) => (
          <Text key={letter} className='home__bg-letter' style={{ animationDelay: `${i * 0.6}s` }}>{letter}</Text>
        ))}
      </View>

      {/* Course selector bar */}
      <View className='home__course-bar' onClick={() => { setPickerTab(curriculum.id); setShowPicker(true); }}>
        <Text className='home__course-icon'>{curriculum.icon}</Text>
        <View className='home__course-info'>
          <Text className='home__course-label'>{curriculum.name}</Text>
          <Text className='home__course-desc'>
            {currentLevel?.label} · {filteredWords.length}词
          </Text>
        </View>
        <Text className='home__course-arrow'>▼</Text>
      </View>

      <View className='home__header'>
        <View className='home__progress-wrap'>
          <ProgressRing current={daily.wordsCompleted} total={DAILY_GOAL} size={140} label='今日进度' />
        </View>
        <View className='home__star-box'>
          <Text className='home__star-icon'>⭐</Text>
          <Text className='home__star-count'>{stars}</Text>
        </View>
      </View>

      <View className='home__modes'>
        {GAME_MODES.map((mode, idx) => (
          <View
            key={mode.key}
            className='home__mode-card animate-fade-in-up'
            style={{ backgroundColor: mode.color, animationDelay: `${idx * 0.1}s` }}
            onClick={() => goTo(mode.path)}
          >
            <Text className='home__mode-icon'>{mode.icon}</Text>
            <Text className='home__mode-title'>{mode.title}</Text>
            <Text className='home__mode-subtitle'>{mode.subtitle}</Text>
          </View>
        ))}
      </View>

      {/* Floating magic dock */}
      <View className='home__dock'>
        <View className='home__dock-inner'>
          <View className='home__dock-item' onClick={() => goTo('/pages/rewards/index')}>
            <View className='home__dock-bubble home__dock-bubble--amber'>
              <Text className='home__dock-icon'>🏆</Text>
            </View>
            <Text className='home__dock-label'>收藏</Text>
          </View>
          <View className='home__dock-item' onClick={() => goTo('/pages/wordbank/index')}>
            <View className='home__dock-bubble home__dock-bubble--blue'>
              <Text className='home__dock-icon'>📚</Text>
            </View>
            <Text className='home__dock-label'>词库</Text>
          </View>
          <View className='home__dock-item home__dock-item--center' onClick={() => goTo('/pages/membership/index')}>
            <View className='home__dock-crown'>
              <Text className='home__dock-crown-icon'>👑</Text>
            </View>
            <Text className='home__dock-label home__dock-label--gold'>VIP</Text>
          </View>
          <View className='home__dock-item' onClick={() => goTo('/pages/profile/index')}>
            <View className='home__dock-bubble home__dock-bubble--pink'>
              <Text className='home__dock-icon'>🏰</Text>
            </View>
            <Text className='home__dock-label'>我的</Text>
          </View>
        </View>
      </View>

      {/* Curriculum picker modal */}
      {showPicker && (
        <View className='home__picker'>
          <View className='home__picker-overlay' onClick={() => setShowPicker(false)} />
          <View className='home__picker-sheet'>
            <View className='home__picker-handle' />
            <Text className='home__picker-title'>📚 选择教材</Text>

            <ScrollView scrollY className='home__picker-scroll'>
              {/* Curriculum cards */}
              {allCurricula.map(c => {
                const isOpen = pickerTab === c.id;
                return (
                  <View key={c.id} className='home__picker-book'>
                    <View
                      className={`home__picker-book-head ${isOpen ? 'home__picker-book-head--open' : ''}`}
                      onClick={() => setPickerTab(isOpen ? '' : c.id)}
                    >
                      <Text className='home__picker-book-icon'>{c.icon}</Text>
                      <View className='home__picker-book-info'>
                        <Text className='home__picker-book-name'>{c.name}</Text>
                        <Text className='home__picker-book-desc'>{c.desc}</Text>
                      </View>
                      <Text className='home__picker-book-arrow'>{isOpen ? '▲' : '▼'}</Text>
                    </View>

                    {isOpen && (
                      <View className='home__picker-book-levels'>
                        {c.levels.map(level => {
                          const count = c.words.filter(w => w.level === level.key).length;
                          const isActive = curriculum.id === c.id && currentLevel?.key === level.key;
                          return (
                            <View
                              key={level.key}
                              className={`home__picker-level ${isActive ? 'home__picker-level--active' : ''}`}
                              onClick={() => handleSelect(c.id, level.key)}
                            >
                              <View className='home__picker-level-info'>
                                <Text className='home__picker-level-label'>{level.label}</Text>
                                <Text className='home__picker-level-desc'>{level.desc}</Text>
                              </View>
                              <Text className='home__picker-level-count'>{count}词</Text>
                              {isActive && <Text className='home__picker-level-check'>✓</Text>}
                            </View>
                          );
                        })}
                      </View>
                    )}
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
}
