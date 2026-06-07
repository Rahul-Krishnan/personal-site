import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { ThemeContext } from './context';
import { DEFAULT_THEME, THEME_STORAGE_KEY } from './types';
import type { Theme } from './types';

function readInitialTheme(): Theme {
  // The inline script in index.html has already set <html data-theme> before
  // first paint. Trust that attribute so React state matches the DOM with no
  // flash and no hydration mismatch.
  if (typeof document !== 'undefined') {
    const attr = document.documentElement.dataset.theme;
    if (attr === '90s' || attr === 'modern') {
      return attr;
    }
  }
  return DEFAULT_THEME;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(readInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Private mode or storage disabled: theme still works for this session.
    }
  }, [theme]);

  const setTheme = useCallback((next: Theme) => setThemeState(next), []);
  const toggle = useCallback(
    () => setThemeState((t) => (t === '90s' ? 'modern' : '90s')),
    [],
  );

  const value = useMemo(
    () => ({ theme, toggle, setTheme }),
    [theme, toggle, setTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
