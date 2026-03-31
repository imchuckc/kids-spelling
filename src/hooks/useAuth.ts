import { useState, useEffect, useCallback } from 'react';
import { getUser, isLoggedIn, login, logout, type UserInfo } from '../utils/auth';
import Taro from '@tarojs/taro';

export function useAuth() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [logged, setLogged] = useState(false);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(() => {
    setUser(getUser());
    setLogged(isLoggedIn());
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const doLogin = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const info = await login();
      setUser(info);
      setLogged(true);
      Taro.showToast({ title: '登录成功', icon: 'success' });
    } catch {
      Taro.showToast({ title: '登录失败', icon: 'none' });
    } finally {
      setLoading(false);
    }
  }, [loading]);

  const doLogout = useCallback(() => {
    logout();
    setUser(null);
    setLogged(false);
    Taro.showToast({ title: '已退出', icon: 'none' });
  }, []);

  return { user, logged, loading, doLogin, doLogout, refresh };
}
