import { describe, expect, it } from 'vitest';
import { selectActiveSection } from './selectActiveSection';

// `rects` are viewport-relative (as from getBoundingClientRect): top/bottom are
// pixels from the top of the viewport, negative when scrolled above it.

describe('selectActiveSection', () => {
  it('returns null when there are no sections', () => {
    expect(
      selectActiveSection([], { innerHeight: 800, scrollY: 0, scrollHeight: 2000 }),
    ).toBeNull();
  });

  it('activates the first section at the top of the page', () => {
    const rects = [
      { id: 'home', top: 0, bottom: 467 },
      { id: 'work', top: 587, bottom: 2072 },
      { id: 'education', top: 2104, bottom: 2272 },
      { id: 'path', top: 2304, bottom: 2769 },
    ];
    expect(
      selectActiveSection(rects, { innerHeight: 816, scrollY: 0, scrollHeight: 3165 }),
    ).toBe('home');
  });

  it('activates the section whose top has crossed the activation line', () => {
    // Scrolled so work has passed the 35%-of-viewport line, education has not.
    const rects = [
      { id: 'home', top: -800, bottom: -333 },
      { id: 'work', top: -213, bottom: 1272 },
      { id: 'education', top: 1304, bottom: 1472 },
      { id: 'path', top: 1504, bottom: 1969 },
    ];
    expect(
      selectActiveSection(rects, { innerHeight: 816, scrollY: 800, scrollHeight: 3165 }),
    ).toBe('work');
  });

  it('keeps the last-passed section when the line sits in a between-section gap', () => {
    // The 35% line (≈286px) falls in the divider gap between education and path:
    // education ends at 240, path starts at 360. No section contains the line.
    const rects = [
      { id: 'home', top: -2000, bottom: -1533 },
      { id: 'work', top: -1400, bottom: -100 },
      { id: 'education', top: 72, bottom: 240 },
      { id: 'path', top: 360, bottom: 825 },
    ];
    expect(
      selectActiveSection(rects, { innerHeight: 816, scrollY: 1400, scrollHeight: 3165 }),
    ).toBe('education');
  });

  // Regression: the original IntersectionObserver band (30-40% from top) could
  // not reach the last section on tall viewports, so the nav highlighted the
  // wrong section at the bottom of the page. Numbers are the exact values
  // Playwright measured when the bug reproduced (vh=1300).
  it('activates the last section at the bottom of a TALL viewport (regression)', () => {
    const rects = [
      { id: 'home', top: -1591, bottom: -1124 },
      { id: 'work', top: -1092, bottom: 393 },
      { id: 'education', top: 425, bottom: 593 },
      { id: 'path', top: 625, bottom: 1090 }, // below the 30-40% band
    ];
    expect(
      selectActiveSection(rects, {
        innerHeight: 1300,
        scrollY: 1866,
        scrollHeight: 3165,
      }),
    ).toBe('path');
  });

  it('activates the last section at the bottom of a short viewport', () => {
    const rects = [
      { id: 'home', top: -2075, bottom: -1608 },
      { id: 'work', top: -1576, bottom: -91 },
      { id: 'education', top: -59, bottom: 109 },
      { id: 'path', top: 141, bottom: 606 },
    ];
    expect(
      selectActiveSection(rects, {
        innerHeight: 816,
        scrollY: 2349,
        scrollHeight: 3165,
      }),
    ).toBe('path');
  });
});
