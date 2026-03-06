import React, { createContext, useContext, useState } from 'react';

const CompareContext = createContext();

const MAX_COMPARE = 3;

export function CompareProvider({ children }) {
  const [compareIds, setCompareIds] = useState([]);

  const addToCompare = (id) => {
    setCompareIds(prev => {
      if (prev.includes(id) || prev.length >= MAX_COMPARE) return prev;
      return [...prev, id];
    });
  };

  const removeFromCompare = (id) => {
    setCompareIds(prev => prev.filter(x => x !== id));
  };

  const clearCompare = () => {
    setCompareIds([]);
  };

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
