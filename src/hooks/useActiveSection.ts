import { useEffect, useState } from 'react';
import { selectActiveSection } from './selectActiveSection';

// Tracks which section is currently in view so the sidebar nav can show a
// "you are here" marker, the way 90s site maps pretended to.
//
// Scroll-position based rather than IntersectionObserver: a fixed IO band could
// never reach the last section on tall viewports, leaving the nav stuck on the
// wrong entry at the bottom of the page. selectActiveSection holds the (tested)
// decision logic; this hook just feeds it the live scroll state.
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? '');

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const rects = ids
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null)
        .map((el) => {
          const r = el.getBoundingClientRect();
          return { id: el.id, top: r.top, bottom: r.bottom };
        });
      const next = selectActiveSection(rects, {
        innerHeight: window.innerHeight,
        scrollY: window.scrollY,
        scrollHeight: document.documentElement.scrollHeight,
      });
      if (next) setActive(next);
    };

    // Coalesce scroll/resize bursts into one measurement per animation frame.
    const onChange = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update(); // set the initial state on mount
    window.addEventListener('scroll', onChange, { passive: true });
    window.addEventListener('resize', onChange);
    return () => {
      window.removeEventListener('scroll', onChange);
      window.removeEventListener('resize', onChange);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ids]);

  return active;
}
