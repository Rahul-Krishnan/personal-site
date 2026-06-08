// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from './ThemeProvider';
import { useTheme } from './useTheme';

const THEME_KEY = 'site-theme';

function Probe() {
  const { theme, toggle, setTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggle}>toggle</button>
      <button onClick={() => setTheme('90s')}>set-90s</button>
    </div>
  );
}

function renderWithProvider() {
  return render(
    <ThemeProvider>
      <Probe />
    </ThemeProvider>,
  );
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });
  afterEach(cleanup);

  it('defaults to the modern theme when nothing is set', () => {
    renderWithProvider();
    expect(screen.getByTestId('theme')).toHaveTextContent('modern');
  });

  it('adopts the theme already on <html> (set by the FOUC guard)', () => {
    document.documentElement.dataset.theme = '90s';
    renderWithProvider();
    expect(screen.getByTestId('theme')).toHaveTextContent('90s');
  });

  it('toggles between themes and persists the choice', () => {
    renderWithProvider();
    fireEvent.click(screen.getByText('toggle'));
    expect(screen.getByTestId('theme')).toHaveTextContent('90s');
    expect(localStorage.getItem(THEME_KEY)).toBe('90s');
    expect(document.documentElement.dataset.theme).toBe('90s');

    fireEvent.click(screen.getByText('toggle'));
    expect(screen.getByTestId('theme')).toHaveTextContent('modern');
    expect(localStorage.getItem(THEME_KEY)).toBe('modern');
  });

  it('setTheme writes the attribute and storage', () => {
    renderWithProvider();
    fireEvent.click(screen.getByText('set-90s'));
    expect(document.documentElement.dataset.theme).toBe('90s');
    expect(localStorage.getItem(THEME_KEY)).toBe('90s');
  });

  it('throws if useTheme is used outside a provider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<Probe />)).toThrow(/within a ThemeProvider/);
    spy.mockRestore();
  });
});
