import { PropsWithChildren, useEffect } from 'react';
import Taro from '@tarojs/taro';
import { initCloud, forceSyncToCloud } from './utils/cloud';
import './app.scss';

export default function App({ children }: PropsWithChildren) {
  useEffect(() => {
    initCloud();

    // Flush pending cloud sync when app goes to background
    const onHide = () => { forceSyncToCloud(); };
    Taro.onAppHide?.(onHide);
    return () => { Taro.offAppHide?.(onHide); };
  }, []);

  return <>{children}</>;
}
