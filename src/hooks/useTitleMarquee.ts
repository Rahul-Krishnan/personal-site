import { useEffect } from 'react';

// Scrolls the document.title like a 1998 homepage hijacking your tab bar.
// Active only when enabled (90s theme) and respects reduced-motion. Restores
// the original title on cleanup.
export function useTitleMarquee(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    if (typeof window === 'undefined') return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const original = document.title;
    const banner = `★ ${original} ★ welcome to my homepage!! ★   `;
    let text = banner;
    const id = window.setInterval(() => {
      text = text.slice(1) + text.charAt(0);
      document.title = text;
    }, 220);

    return () => {
      window.clearInterval(id);
      document.title = original;
    };
  }, [enabled]);
}
