import { Sprite } from './Sprite';
import type { SpriteName } from './Sprite';

// Animated section divider: a marching row of SVG sprites, the spiritual
// successor to the spinning-flame-bar <hr>. No emoji, no GIFs.
const PATTERNS: SpriteName[] = [
  'flame', 'skull', 'flame', 'bolt', 'flame', 'skull', 'flame', 'bolt',
];
const STARS: SpriteName[] = ['sparkle', 'star', 'diamond', 'sparkle'];

export function Divider({ variant = 'flame' }: { variant?: 'flame' | 'star' }) {
  const glyphs = variant === 'star' ? STARS : PATTERNS;
  // Repeat enough to span wide content wells.
  const row = Array.from({ length: 16 }, (_, i) => glyphs[i % glyphs.length]);
  return (
    <div className={`divider divider--${variant}`} aria-hidden="true">
      {row.map((name, i) => (
        <span key={i} className="divider__glyph">
          <Sprite name={name} size={20} />
        </span>
      ))}
    </div>
  );
}
