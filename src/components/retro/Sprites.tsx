// Floating decorative sprites built from emoji + CSS animation (no external
// asset files, no hotlinks). Fixed to the viewport, behind content, hidden in
// modern theme, and frozen under prefers-reduced-motion (see retro.css).
const sprites = [
  { glyph: '⭐', cls: 'sprite--a' },
  { glyph: '💾', cls: 'sprite--b' },
  { glyph: '🔥', cls: 'sprite--c' },
  { glyph: '📟', cls: 'sprite--d' },
  { glyph: '✨', cls: 'sprite--e' },
  { glyph: '📡', cls: 'sprite--f' },
];

export function Sprites() {
  return (
    <div className="sprites" aria-hidden="true">
      {sprites.map((s) => (
        <span key={s.cls} className={`sprite ${s.cls}`}>
          {s.glyph}
        </span>
      ))}
    </div>
  );
}
