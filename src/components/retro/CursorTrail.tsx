import { useEffect } from 'react';
import { useTheme } from '../../theme/useTheme';

const TRAIL_GLYPH = '✦';
const MAX_NODES = 18;

// A sparkle trail that follows the pointer, the way every 90s homepage did via
// a copy-pasted JavaScript snippet. Active only in the 90s theme, disabled
// under prefers-reduced-motion, and fully cleaned up on unmount/theme change.
export function CursorTrail() {
  const { theme } = useTheme();

  useEffect(() => {
    if (theme !== '90s') return;
    if (typeof window === 'undefined') return;
    const reduce = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (reduce) return;

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
      node.style.opacity = '1';
      node.style.transform = `translate(-50%, -50%) scale(1)`;
      // Fade on the next frame so the transition runs.
      requestAnimationFrame(() => {
        node.style.opacity = '0';
        node.style.transform = `translate(-50%, -50%) scale(0.3)`;
      });
    };

    window.addEventListener('pointermove', onMove);

    return () => {
      window.removeEventListener('pointermove', onMove);
      layer.remove();
    };
  }, [theme]);

  return null;
}
