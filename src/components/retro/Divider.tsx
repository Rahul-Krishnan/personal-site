// Animated section divider: a marching row of flames/skulls/sparkles, the
// spiritual successor to the spinning-flame-bar <hr>. Pure emoji, no GIFs.
const PATTERNS = ['🔥', '💀', '🔥', '⚡', '🔥', '💀', '🔥', '⚡'];

export function Divider({ variant = 'flame' }: { variant?: 'flame' | 'star' }) {
  const glyphs = variant === 'star' ? ['✨', '⭐', '🌟', '💫'] : PATTERNS;
  // Repeat enough to span wide content wells.
  const row = Array.from({ length: 16 }, (_, i) => glyphs[i % glyphs.length]);
  return (
    <div className={`divider divider--${variant}`} aria-hidden="true">
      {row.map((g, i) => (
        <span key={i} className="divider__glyph">
          {g}
        </span>
      ))}
    </div>
  );
}
