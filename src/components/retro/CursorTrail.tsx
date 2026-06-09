import { useEffect } from 'react';

const TRAIL_GLYPH = '✦';
const MAX_NODES = 24;

// A sparkle trail that follows the pointer, the way every 90s homepage did via
// a copy-pasted JavaScript snippet. Runs in both themes (CSS colors it per
// theme: loud in 90s, subtle in modern), and is fully cleaned up on unmount.
//
// Intentionally NOT gated by prefers-reduced-motion: the trail is purely
// pointer-driven (it only moves when the user moves the cursor), the gentlest
// category of motion, and it is a deliberate, requested feature of the page.
export function CursorTrail() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

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
      node.style.transform = 'translate(-50%, -50%) scale(1)';
      // Fade on the next frame so the transition runs.
      requestAnimationFrame(() => {
        node.style.opacity = '0';
        node.style.transform = 'translate(-50%, -50%) scale(0.3)';
      });
    };

    window.addEventListener('pointermove', onMove);

    return () => {
      window.removeEventListener('pointermove', onMove);
      layer.remove();
    };
  }, []);

  return null;
}
