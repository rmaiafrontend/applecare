import React, { createContext, useContext, useState, useCallback } from 'react';

const CompareContext = createContext();

const MAX_COMPARE = 3;
const STORAGE_KEY = 'compare_ids';

function loadFromSession() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (_) {}
  return [];
}

function saveToSession(ids) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch (_) {}
}

export function CompareProvider({ children }) {
  const [compareIds, setCompareIds] = useState(loadFromSession);

  const addToCompare = useCallback((id) => {
    setCompareIds(prev => {
      if (prev.includes(id) || prev.length >= MAX_COMPARE) return prev;
      const next = [...prev, id];
      saveToSession(next);
      return next;
    });
  }, []);

  const removeFromCompare = useCallback((id) => {
    setCompareIds(prev => {
      const next = prev.filter(x => x !== id);
      saveToSession(next);
      return next;
    });
  }, []);

  const clearCompare = useCallback(() => {
    setCompareIds([]);
    try { sessionStorage.removeItem(STORAGE_KEY); } catch (_) {}
  }, []);

  const isInCompare = (id) => compareIds.includes(id);

  const isFull = compareIds.length >= MAX_COMPARE;

  return (
    <CompareContext.Provider value={{ compareIds, addToCompare, removeFromCompare, clearCompare, isInCompare, isFull }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error('useCompare must be used within CompareProvider');
  return ctx;
}
