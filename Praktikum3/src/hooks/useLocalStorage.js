import { useState, useCallback } from 'react';

export default function useLocalStorage(key, initial = []) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch {
      return initial;
    }
  });

  const setAndStore = useCallback((value) => {
    try {
      const next = typeof value === 'function' ? value(state) : value;
      setState(next);
      localStorage.setItem(key, JSON.stringify(next));
    } catch (e) {
      console.error('LocalStorage error', e);
    }
  }, [key, state]);

  return [state, setAndStore];
}
