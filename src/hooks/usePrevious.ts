import { useEffect, useRef } from 'react';

export function usePrevious<T>(value: T): T | undefined {
  const valueRef = useRef<typeof value>();
  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  return valueRef.current;
}
