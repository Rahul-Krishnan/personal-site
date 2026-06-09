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
      // Appear INSTANTLY at full opacity (transition off), then fade out. If we
      // let the CSS transition animate the jump to opacity:1, that "appear" only
      // gets ~1 frame before we set it back to 0, so the dot never brightens and
      // the trail is invisible. Disable the transition for the appear, force a
      // style commit, then restore the transition for the fade.
      node.style.transition = 'none';
      node.style.left = `${e.clientX}px`;
      node.style.top = `${e.clientY}px`;
      node.style.opacity = '1';
      node.style.transform = 'translate(-50%, -50%) scale(1)';
      void node.offsetWidth; // commit the "appear" state before transitioning out
      node.style.transition = ''; // restore the CSS fade (opacity/transform)
      node.style.opacity = '0';
      node.style.transform = 'translate(-50%, -50%) scale(0.3)';
    };

    window.addEventListener('pointermove', onMove);

    return () => {
      window.removeEventListener('pointermove', onMove);
      layer.remove();
    };
  }, []);

  return null;
}
