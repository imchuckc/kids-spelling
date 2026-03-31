import { useRef, useCallback } from 'react';
import Taro from '@tarojs/taro';

const TTS_BASE = 'https://dict.youdao.com/dictvoice?audio=';

const SFX_URLS: Record<string, string> = {
  ding: 'https://dict.youdao.com/dictvoice?audio=correct&type=2',
  pop: 'https://dict.youdao.com/dictvoice?audio=pop&type=2',
  cheer: 'https://dict.youdao.com/dictvoice?audio=congratulations&type=2',
  wrong: 'https://dict.youdao.com/dictvoice?audio=wrong&type=2',
};

function safeDestroy(ctx: Taro.InnerAudioContext | null) {
  if (!ctx) return;
  try { ctx.stop(); } catch (_) {}
  try { ctx.destroy(); } catch (_) {}
}

function createAndPlay(url: string, onError?: () => void): Taro.InnerAudioContext {
  // useWebAudioImplement improves iOS real-device compatibility (base lib 2.19.0+)
  const ctx = Taro.createInnerAudioContext({
    useWebAudioImplement: true,
  } as any);

  ctx.onEnded(() => safeDestroy(ctx));
  ctx.onError((err) => {
    console.warn('[useAudio] error:', url, err);
    onError?.();
    safeDestroy(ctx);
  });

  ctx.autoplay = true;
  ctx.src = url;
  return ctx;
}

export function useAudio() {
  const ctxRef = useRef<Taro.InnerAudioContext | null>(null);

  const cleanup = useCallback(() => {
    safeDestroy(ctxRef.current);
    ctxRef.current = null;
  }, []);

  const playWord = useCallback((_audioPath: string, word?: string) => {
    if (!word && _audioPath) {
      const parts = _audioPath.split('/');
      word = parts[parts.length - 1];
    }
    if (!word) return;

    cleanup();
    const url = `${TTS_BASE}${encodeURIComponent(word)}&type=2`;
    ctxRef.current = createAndPlay(url, () => {
      try { Taro.vibrateShort({ type: 'light' }); } catch (_) {}
    });
  }, [cleanup]);

  const playSfx = useCallback((sfxName: 'ding' | 'pop' | 'cheer' | 'wrong') => {
    const vibrateType = sfxName === 'wrong' ? 'heavy' : 'light';
    try { Taro.vibrateShort({ type: vibrateType }); } catch (_) {}

    const url = SFX_URLS[sfxName];
    if (url) createAndPlay(url);
  }, []);

  const playAudio = useCallback((src: string) => {
    cleanup();
    ctxRef.current = createAndPlay(src);
  }, [cleanup]);

  // Read a full English sentence via TTS
  const playSentence = useCallback((sentence: string) => {
    if (!sentence) return;
    cleanup();
    const url = `${TTS_BASE}${encodeURIComponent(sentence)}&type=2`;
    ctxRef.current = createAndPlay(url);
  }, [cleanup]);

  const stop = useCallback(() => { cleanup(); }, [cleanup]);

  return { playWord, playSentence, playSfx, playAudio, stop };
}
