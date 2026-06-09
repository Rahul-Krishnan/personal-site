import { useEffect } from 'react';

const TRAIL_GLYPH = '✦';
const MAX_NODES = 24;

// A sparkle trail that follows the pointer, the way every 90s homepage did via
// a copy-pasted JavaScript snippet. Runs in both themes (CSS colors it per
// theme: loud in 90s, subtle in modern), respects prefers-reduced-motion, and
// is fully cleaned up on unmount.
export function CursorTrail() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const nodes: HTMLSpanElement[] = [];
    let idx = 0;

    const layer = document.createElement('div');
    layer.className = 'cursor-trail-layer';
    document.body.appendChild(layer);

    for (let i = 0; i < MAX_NODES; i += 1) {
      const node = document.createElement('span');
      node.className = 'cursor-trail-dot';
      node.textContent = TRAIL_GLYPH;
      node.style.opacity = '0';
      layer.appendChild(node);
      nodes.push(node);
    }

    const onMove = (e: PointerEvent) => {
      const node = nodes[idx];
      idx = (idx + 1) % nodes.length;
      node.style.left = `${e.clientX}px`;
      node.style.top = `${e.clientY}px`;
      // Cancel any in-flight animation first: element.animate() with
      // fill:forwards otherwise leaves finished Animation objects piling up on
      // the node across the thousands of moves in a session.
      node.getAnimations().forEach((animation) => animation.cancel());
      // Web Animations API: appear instantly at full opacity, then fade and
      // shrink. No forced reflow per move (unlike toggling a CSS transition).
      node.animate(
        [
          { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
          { opacity: 0, transform: 'translate(-50%, -50%) scale(0.3)' },
        ],
        { duration: 650, easing: 'ease', fill: 'forwards' },
      );
    };

    window.addEventListener('pointermove', onMove);

    return () => {
      window.removeEventListener('pointermove', onMove);
      layer.remove();
    };
  }, []);

  return null;
}
