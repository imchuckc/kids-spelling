import { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import FlipCard from '../../components/FlipCard';
import GameHeader from '../../components/GameHeader';
import ResultModal from '../../components/ResultModal';
import { useWordList, type WordItem } from '../../hooks/useWordList';
import { useAudio } from '../../hooks/useAudio';
import { useProgress } from '../../hooks/useProgress';
import { getEmojiForWord } from '../../utils/emoji';
import { recordPractice } from '../../utils/learningEngine';
import './index.scss';

const PAIRS = 4;

interface Card {
  id: string;
  pairId: string;
  type: 'emoji' | 'word';
  content: string;
  label?: string;
}

function calcStars(moves: number, pairs: number): number {
  const ratio = moves / pairs;
  if (ratio <= 2) return 3;
  if (ratio <= 3) return 2;
  return 1;
}

export default function MemoryPage() {
  const { getSmartWordsForMode, shuffle } = useWordList();
  const { playSfx } = useAudio();
  const { stars, earnStars, completeGame } = useProgress();

  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIds, setFlippedIds] = useState<string[]>([]);
  const [matchedPairIds, setMatchedPairIds] = useState<Set<string>>(new Set());
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [locked, setLocked] = useState(false);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    startNewGame();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const startNewGame = useCallback(() => {
    const words = getSmartWordsForMode(PAIRS, 'memory');
    const cardPairs: Card[] = [];

    words.forEach(w => {
      cardPairs.push({
        id: `emoji-${w.id}`,
        pairId: w.id,
        type: 'emoji',
        content: getEmojiForWord(w.id),
        label: w.zh,
      });
      cardPairs.push({
        id: `word-${w.id}`,
        pairId: w.id,
        type: 'word',
        content: w.word.toUpperCase(),
      });
    });

    setCards(shuffle(cardPairs));
    setFlippedIds([]);
    setMatchedPairIds(new Set());
    setMoves(0);
    setTimer(0);
    setGameOver(false);
    setLocked(false);

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
  }, [getSmartWordsForMode, shuffle]);

  const handleCardTap = useCallback((card: Card) => {
    if (locked || matchedPairIds.has(card.pairId) || flippedIds.includes(card.id)) return;

    const newFlipped = [...flippedIds, card.id];
    setFlippedIds(newFlipped);

    if (newFlipped.length === 2) {
      setLocked(true);
      setMoves(prev => prev + 1);

      const first = cards.find(c => c.id === newFlipped[0])!;
      const second = cards.find(c => c.id === newFlipped[1])!;

      if (first.pairId === second.pairId && first.type !== second.type) {
        playSfx('ding');
        recordPractice(first.pairId, 'memory', true);
        setTimeout(() => {
          setMatchedPairIds(prev => {
            const next = new Set(prev);
            next.add(first.pairId);

            if (next.size === PAIRS) {
              if (timerRef.current) clearInterval(timerRef.current);
              setTimeout(() => {
                playSfx('cheer');
                setGameOver(true);
              }, 500);
            }
            return next;
          });
          setFlippedIds([]);
          setLocked(false);
        }, 600);
      } else {
        // No match
        playSfx('wrong');
        setTimeout(() => {
          setFlippedIds([]);
          setLocked(false);
        }, 1000);
      }
    }
  }, [locked, matchedPairIds, flippedIds, cards, playSfx]);

  const starsEarned = calcStars(moves, PAIRS);

  const handlePlayAgain = () => {
    earnStars(starsEarned);
    completeGame(PAIRS);
    startNewGame();
  };

  const handleGoHome = () => {
    earnStars(starsEarned);
    completeGame(PAIRS);
    Taro.navigateBack();
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <View className='memory'>
      <GameHeader
        stars={stars}
        currentWord={matchedPairIds.size}
        totalWords={PAIRS}
        title='翻翻看'
      />

      <View className='memory__info'>
        <View className='memory__info-item'>
          <Text className='memory__info-label'>⏱️</Text>
          <Text className='memory__info-value'>{formatTime(timer)}</Text>
        </View>
        <View className='memory__info-item'>
          <Text className='memory__info-label'>👆</Text>
          <Text className='memory__info-value'>{moves} 步</Text>
        </View>
      </View>

      <View className='memory__grid'>
        {cards.map(card => (
          <View key={card.id} className='memory__grid-item'>
            <FlipCard
              frontContent={card.content}
              frontLabel={card.label}
              isFlipped={flippedIds.includes(card.id) || matchedPairIds.has(card.pairId)}
              isMatched={matchedPairIds.has(card.pairId)}
              onTap={() => handleCardTap(card)}
            />
          </View>
        ))}
      </View>

      <ResultModal
        visible={gameOver}
        starsEarned={starsEarned}
        correctCount={PAIRS}
        totalWords={PAIRS}
        onPlayAgain={handlePlayAgain}
        onGoHome={handleGoHome}
      />
    </View>
  );
}
