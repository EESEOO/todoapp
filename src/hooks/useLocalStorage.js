import { useState, useEffect } from 'react';

/**
 * 로컬 스토리지와 동기화되는 상태를 관리하는 커스텀 훅
 * @param {string} key - 로컬 스토리지 키
 * @param {*} initialValue - 초기값
 * @returns {[value, setValue]} - 상태와 상태 업데이트 함수
 */
export const useLocalStorage = (key, initialValue) => {
  // 로컬 스토리지에서 초기값 가져오기
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
      return initialValue;
    }
  });

  // 상태가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};
