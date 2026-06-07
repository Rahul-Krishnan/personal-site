export type Theme = '90s' | 'modern';

export const THEME_STORAGE_KEY = 'site-theme';
export const DEFAULT_THEME: Theme = 'modern';

export type ThemeContextValue = {
  theme: Theme;
  toggle: () => void;
  setTheme: (theme: Theme) => void;
};
