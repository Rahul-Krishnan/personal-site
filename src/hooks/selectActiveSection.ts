export interface SectionRect {
  id: string;
  top: number;
  bottom: number;
}

export interface ViewportState {
  innerHeight: number;
  scrollY: number;
  scrollHeight: number;
}

// The activation line: a fixed distance (px) below the top of the viewport, a
// little under the fixed top bar. A section becomes active once its top scrolls
// above this line. It is intentionally a FIXED pixel value, not a fraction of
// viewport height: section heights are content-fixed, so a fractional line
// drifts down past short sections (Education) on tall viewports and lights up
// the *next* section instead. On very short viewports it is capped to a
// fraction so it never sits past the usable area.
const ACTIVATION_PX = 160;
const ACTIVATION_MAX_FRACTION = 0.4;

// Within this many pixels of the bottom we treat the page as fully scrolled.
const BOTTOM_EPSILON = 2;

// Decide which section the nav should mark as active, given each section's
// viewport-relative rect and the current scroll state. Pure and deterministic
// so it can be unit-tested without a browser.
//
// Two rules:
//   1. If the page is scrolled to the bottom, the last section wins. It may be
//      too short (or the viewport too tall) to ever reach the activation line,
//      so without this it could never light up. This was the bug.
//   2. Otherwise, the active section is the last one whose top has crossed the
//      activation line. Monotonic, so it never flickers to "nothing" in the
//      gaps between sections.
export function selectActiveSection(
  rects: SectionRect[],
  viewport: ViewportState,
): string | null {
  if (rects.length === 0) return null;

  const atBottom =
    viewport.innerHeight + viewport.scrollY >=
    viewport.scrollHeight - BOTTOM_EPSILON;
  if (atBottom) return rects[rects.length - 1].id;

  const line = Math.min(
    ACTIVATION_PX,
    viewport.innerHeight * ACTIVATION_MAX_FRACTION,
  );
  let active = rects[0].id;
  for (const rect of rects) {
    if (rect.top <= line) active = rect.id;
  }
  return active;
}
