import { useRef, useEffect } from 'react';

export const useValueRef = function <T>(value: T) {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref;
};
