import { Sprite } from './Sprite';
import type { SpriteName } from './Sprite';

// Floating decorative sprites (inline SVG, no external assets). Fixed to the
// viewport, behind content, hidden in modern theme, frozen under
// prefers-reduced-motion (see retro.css).
const sprites: Array<{ name: SpriteName; cls: string }> = [
  { name: 'star', cls: 'sprite--a' },
  { name: 'floppy', cls: 'sprite--b' },
  { name: 'flame', cls: 'sprite--c' },
  { name: 'monitor', cls: 'sprite--d' },
  { name: 'sparkle', cls: 'sprite--e' },
  { name: 'globe', cls: 'sprite--f' },
];

export function Sprites() {
  return (
    <div className="sprites" aria-hidden="true">
      {sprites.map((s) => (
        <span key={s.cls} className={`sprite ${s.cls}`}>
          <Sprite name={s.name} size={36} />
        </span>
      ))}
    </div>
  );
}
