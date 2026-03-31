import { View, Text } from '@tarojs/components';
import './index.scss';

interface Props {
  current: number;
  total: number;
  size?: number;
  label?: string;
}

/**
 * CSS-only progress ring using two rotating half-circles.
 * Compatible with WeChat Mini Program (no SVG needed).
 */
export default function ProgressRing({ current, total, size = 140, label }: Props) {
  const percent = total > 0 ? Math.min(current / total, 1) : 0;
  const deg = percent * 360;

  // For the two-half approach:
  // - If <= 180deg, only rotate the right half
  // - If > 180deg, the right half is fully shown and the left half rotates
  const rightDeg = Math.min(deg, 180);
  const leftDeg = Math.max(deg - 180, 0);

  return (
    <View className='p-ring' style={{ width: `${size}rpx`, height: `${size}rpx` }}>
      {/* Background circle (gray track) */}
      <View className='p-ring__track' />

      {/* Right half (0-180 deg) */}
      <View className='p-ring__half p-ring__half--right'>
        <View
          className='p-ring__fill'
          style={{ transform: `rotate(${rightDeg}deg)` }}
        />
      </View>

      {/* Left half (180-360 deg) */}
      <View className='p-ring__half p-ring__half--left'>
        <View
          className='p-ring__fill'
          style={{ transform: `rotate(${leftDeg}deg)` }}
        />
      </View>

      {/* Inner circle (white center) + text */}
      <View className='p-ring__center'>
        <Text className='p-ring__number'>{current}/{total}</Text>
        {label && <Text className='p-ring__label'>{label}</Text>}
      </View>
    </View>
  );
}
