import { useEffect, useRef, useState } from 'react';

export function useCallbackDelay<T extends string | number>(
  callback: (value: T) => unknown,
  delay: number,
  initialValue: T,
): [T, (nextValue: T) => void] {
  const [currentValue, setCurrentValue] = useState<T>(initialValue);
  const { current } = useRef<{
    timer: ReturnType<typeof setTimeout> | null,
    value: T,
  }>({ timer: null, value: currentValue });
  current.value = currentValue;

  useEffect(() => {
    if (current.value !== initialValue && current.timer) {
      clearTimeout(current.timer);
      current.timer = null;
    }
  }, [initialValue, current]);

  useEffect(() => {
    if (current.timer === null) {
      current.timer = setTimeout(() => {
        callback(current.value);
        current.timer = null;
      }, delay);
    }
  }, [currentValue, delay, callback, current]);

  return ([currentValue, setCurrentValue]);
}
