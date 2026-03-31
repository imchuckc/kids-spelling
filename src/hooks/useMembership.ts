import { useState, useEffect, useCallback } from 'react';
import { isMemberActive, getRemainingDays, getMemberInfo, type MemberInfo } from '../utils/membership';

export function useMembership() {
  const [isVip, setIsVip] = useState(false);
  const [remaining, setRemaining] = useState(0);
  const [memberInfo, setMemberInfo] = useState<MemberInfo | null>(null);

  const refresh = useCallback(() => {
    setIsVip(isMemberActive());
    setRemaining(getRemainingDays());
    setMemberInfo(getMemberInfo());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { isVip, remaining, memberInfo, refresh };
}
