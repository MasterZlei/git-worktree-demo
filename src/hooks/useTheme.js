import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'salespilot-theme';

function getSystemTheme() {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return 'dark';
  }
  return window.matchMedia('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark';
}

function getInitialTheme() {
  if (typeof window === 'undefined') {
    return 'dark';
  }
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
  } catch {
    // ignore storage errors
  }
  return getSystemTheme();
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

/**
 * Theme toggle hook: persists preference, respects system scheme,
 * and syncs `data-theme` on the document root.
 */
export function useTheme() {
  const [theme, setThemeState] = useState(getInitialTheme);

  useEffect(() => {
    applyTheme(theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // ignore storage errors
    }
  }, [theme]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: light)');
    const onChange = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored !== 'light' && stored !== 'dark') {
          setThemeState(getSystemTheme());
        }
      } catch {
        setThemeState(getSystemTheme());
      }
    };

    if (media.addEventListener) {
      media.addEventListener('change', onChange);
      return () => media.removeEventListener('change', onChange);
    }
    media.addListener(onChange);
    return () => media.removeListener(onChange);
  }, []);

  const setTheme = useCallback((next) => {
    setThemeState(next === 'light' ? 'light' : 'dark');
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return { theme, setTheme, toggleTheme };
}

export { STORAGE_KEY, getSystemTheme, getInitialTheme, applyTheme };
