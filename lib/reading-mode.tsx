"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/**
 * Reading mode hides the sidebar and table-of-contents to give a
 * distraction-free, centered reading column. The preference persists
 * across sessions via localStorage.
 */
type ReadingModeContextValue = {
  readingMode: boolean;
  toggleReadingMode: () => void;
  setReadingMode: (value: boolean) => void;
};

const ReadingModeContext = createContext<ReadingModeContextValue | null>(null);

const STORAGE_KEY = "ccg:reading-mode";

export function ReadingModeProvider({ children }: { children: ReactNode }) {
  const [readingMode, setReadingModeState] = useState(false);

  // Hydrate from localStorage after mount (avoids SSR mismatch).
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "true") setReadingModeState(true);
  }, []);

  const setReadingMode = useCallback((value: boolean) => {
    setReadingModeState(value);
    window.localStorage.setItem(STORAGE_KEY, String(value));
  }, []);

  const toggleReadingMode = useCallback(() => {
    setReadingModeState((prev) => {
      const next = !prev;
      window.localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ readingMode, toggleReadingMode, setReadingMode }),
    [readingMode, toggleReadingMode, setReadingMode],
  );

  return (
    <ReadingModeContext.Provider value={value}>
      {children}
    </ReadingModeContext.Provider>
  );
}

export function useReadingMode() {
  const ctx = useContext(ReadingModeContext);
  if (!ctx) {
    throw new Error("useReadingMode must be used within a ReadingModeProvider");
  }
  return ctx;
}
