import { useState, useEffect } from 'react';

// This hook manages state that automatically syncs with localStorage
export function useLocalStorage<T>(key: string, initialValue: T) {
  // Initialize state by trying to get value from localStorage first
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Try to get item from localStorage
      const item = window.localStorage.getItem(key);
      // Return parsed JSON if it exists, otherwise return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If there's an error reading localStorage, use initialValue
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  });

  // Update localStorage whenever state changes
  useEffect(() => {
    try {
      // Save state to localStorage
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}