// The Dancing Baby (1996): the web's first viral star, rendered in Autodesk
// Character Studio and passed hand-to-hand over 56k modems. A 90s-only
// flourish, pinned to the bottom-right above the status bar. The GIF carries
// its own animation, so width/height reserve layout and prefers-reduced-motion
// hides it (a GIF can't be paused from CSS the way the other retro animations
// can).
export function DancingBaby() {
  return (
    <div className="dancing-baby" aria-hidden="true">
      <img
        className="dancing-baby__gif"
        src="/dancing-baby.gif"
        alt=""
        width={109}
        height={140}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}
