// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, render, waitFor } from '@testing-library/react';
import { HitCounter } from './HitCounter';

const COUNTER_KEY = 'visitor-count';
const SEED = 13337;

function displayedDigits(container: HTMLElement): string {
  return container.querySelector('.hitcounter__digits')?.textContent ?? '';
}

describe('HitCounter', () => {
  beforeEach(() => localStorage.clear());
  afterEach(cleanup);

  it('seeds the count on the first visit and persists it', async () => {
    const { container } = render(<HitCounter />);
    await waitFor(() =>
      expect(localStorage.getItem(COUNTER_KEY)).toBe(String(SEED + 1)),
    );
    expect(displayedDigits(container)).toBe('013338');
  });

  it('increments a stored count by one', async () => {
    localStorage.setItem(COUNTER_KEY, '100');
    const { container } = render(<HitCounter />);
    await waitFor(() => expect(localStorage.getItem(COUNTER_KEY)).toBe('101'));
    expect(displayedDigits(container)).toBe('000101');
  });

  it('falls back to the seed when the stored value is not a number', async () => {
    localStorage.setItem(COUNTER_KEY, 'not-a-number');
    const { container } = render(<HitCounter />);
    await waitFor(() =>
      expect(localStorage.getItem(COUNTER_KEY)).toBe(String(SEED + 1)),
    );
    expect(displayedDigits(container)).toBe('013338');
  });

  it('always renders exactly six digits', async () => {
    localStorage.setItem(COUNTER_KEY, '7');
    const { container } = render(<HitCounter />);
    await waitFor(() => expect(displayedDigits(container)).toHaveLength(6));
    expect(displayedDigits(container)).toBe('000008');
  });
});
