import { useState, useEffect } from 'react';
import { View, Text, Input } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useWordList, type WordItem } from '../../hooks/useWordList';
import { getCustomWords, setCustomWords } from '../../utils/storage';
import './index.scss';

const CATEGORY_LABELS: Record<string, string> = {
  animals: '动物', food: '食物', colors: '颜色',
  body: '身体', numbers: '数字', family: '家庭',
  school: '学校', clothes: '服装', places: '地点',
  things: '物品', nature: '自然', sports: '运动',
  sight: '高频词', custom: '自定义',
};

export default function WordBankPage() {
  const { filteredWords, curriculum, currentLevel } = useWordList();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [customWords, setLocalCustom] = useState<WordItem[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newWord, setNewWord] = useState('');
  const [newZh, setNewZh] = useState('');

  useEffect(() => { setLocalCustom(getCustomWords()); }, []);

  const allWords = filteredWords;
  const categories = [...new Set(allWords.map(w => w.category))];

  const displayWords = activeTab === 'all'
    ? [...allWords, ...customWords]
    : activeTab === 'custom'
      ? customWords
      : allWords.filter(w => w.category === activeTab);

  const handleAddWord = () => {
    if (!newWord.trim() || !newZh.trim()) {
      Taro.showToast({ title: '请填写完整', icon: 'none' });
      return;
    }
    const word: WordItem = {
      id: `custom-${Date.now()}`,
      word: newWord.trim().toLowerCase(),
      zh: newZh.trim(),
      img: '', audio: '',
      category: 'custom',
      level: '',
    };
    const updated = [...customWords, word];
    setLocalCustom(updated);
    setCustomWords(updated);
    setNewWord(''); setNewZh('');
    setShowAdd(false);
    Taro.showToast({ title: '添加成功', icon: 'success' });
  };

  const handleDeleteCustom = (id: string) => {
    Taro.showModal({
      title: '确认删除', content: '确定要删除这个单词吗？',
      success: (res) => {
        if (res.confirm) {
          const updated = customWords.filter(w => w.id !== id);
          setLocalCustom(updated);
          setCustomWords(updated);
        }
      },
    });
  };

  return (
    <View className='wordbank'>
      {/* Header */}
      <Text className='wordbank__header'>
        {curriculum.icon} {curriculum.name} · {currentLevel?.label}
      </Text>

      {/* Tabs */}
      <View className='wordbank__tabs'>
        <View className={`wordbank__tab ${activeTab === 'all' ? 'wordbank__tab--active' : ''}`} onClick={() => setActiveTab('all')}>
          <Text className='wordbank__tab-text'>全部</Text>
        </View>
        {categories.map(cat => (
          <View key={cat} className={`wordbank__tab ${activeTab === cat ? 'wordbank__tab--active' : ''}`} onClick={() => setActiveTab(cat)}>
            <Text className='wordbank__tab-text'>{CATEGORY_LABELS[cat] || cat}</Text>
          </View>
        ))}
        <View className={`wordbank__tab ${activeTab === 'custom' ? 'wordbank__tab--active' : ''}`} onClick={() => setActiveTab('custom')}>
          <Text className='wordbank__tab-text'>自定义</Text>
        </View>
      </View>

      <Text className='wordbank__count'>共 {displayWords.length} 个单词</Text>

      <View className='wordbank__list'>
        {displayWords.map(w => (
          <View key={w.id} className='wordbank__item'>
            <View className='wordbank__item-info'>
              <Text className='wordbank__item-word'>{w.word}</Text>
              <Text className='wordbank__item-zh'>{w.zh}</Text>
            </View>
            <View className='wordbank__item-meta'>
              <Text className='wordbank__item-cat'>{CATEGORY_LABELS[w.category] || w.category}</Text>
              {w.id.startsWith('custom-') && (
                <View className='wordbank__item-delete' onClick={() => handleDeleteCustom(w.id)}>
                  <Text className='wordbank__item-delete-text'>删除</Text>
                </View>
              )}
            </View>
          </View>
        ))}
      </View>

      <View className='wordbank__add-btn' onClick={() => setShowAdd(true)}>
        <Text className='wordbank__add-btn-text'>+ 添加自定义单词</Text>
      </View>

      {showAdd && (
        <View className='wordbank__modal'>
          <View className='wordbank__modal-overlay' onClick={() => setShowAdd(false)} />
          <View className='wordbank__modal-card'>
            <Text className='wordbank__modal-title'>添加新单词</Text>
            <View className='wordbank__modal-field'>
              <Text className='wordbank__modal-label'>英文单词</Text>
              <Input className='wordbank__modal-input' value={newWord} onInput={(e) => setNewWord(e.detail.value)} placeholder='例如: elephant' />
            </View>
            <View className='wordbank__modal-field'>
              <Text className='wordbank__modal-label'>中文意思</Text>
              <Input className='wordbank__modal-input' value={newZh} onInput={(e) => setNewZh(e.detail.value)} placeholder='例如: 大象' />
            </View>
            <View className='wordbank__modal-actions'>
              <View className='wordbank__modal-btn wordbank__modal-btn--cancel' onClick={() => setShowAdd(false)}>
                <Text className='wordbank__modal-btn-text'>取消</Text>
              </View>
              <View className='wordbank__modal-btn wordbank__modal-btn--confirm' onClick={handleAddWord}>
                <Text className='wordbank__modal-btn-text wordbank__modal-btn-text--white'>确定</Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
