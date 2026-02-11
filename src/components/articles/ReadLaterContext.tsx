'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface ReadLaterContextType {
  readLaterIds: string[];
  addToReadLater: (id: string) => void;
  removeFromReadLater: (id: string) => void;
  isInReadLater: (id: string) => boolean;
  toggleReadLater: (id: string) => void;
}

const ReadLaterContext = createContext<ReadLaterContextType | undefined>(undefined);

export function ReadLaterProvider({ children }: { children: React.ReactNode }) {
  const [readLaterIds, setReadLaterIds] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('tomas-articles-read-later');
    if (saved) {
      try {
        setReadLaterIds(JSON.parse(saved));
      } catch {
        setReadLaterIds([]);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('tomas-articles-read-later', JSON.stringify(readLaterIds));
    }
  }, [readLaterIds, isLoaded]);

  const addToReadLater = (id: string) => {
    setReadLaterIds(prev => [...prev, id]);
  };

  const removeFromReadLater = (id: string) => {
    setReadLaterIds(prev => prev.filter(itemId => itemId !== id));
  };

  const isInReadLater = (id: string) => {
    return readLaterIds.includes(id);
  };

  const toggleReadLater = (id: string) => {
    if (isInReadLater(id)) {
      removeFromReadLater(id);
    } else {
      addToReadLater(id);
    }
  };

  return (
    <ReadLaterContext.Provider value={{
      readLaterIds,
      addToReadLater,
      removeFromReadLater,
      isInReadLater,
      toggleReadLater
    }}>
      {children}
    </ReadLaterContext.Provider>
  );
}

export function useReadLater() {
  const context = useContext(ReadLaterContext);
  if (context === undefined) {
    throw new Error('useReadLater must be used within a ReadLaterProvider');
  }
  return context;
}
