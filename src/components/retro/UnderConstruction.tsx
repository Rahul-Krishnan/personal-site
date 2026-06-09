import { Sprite } from './Sprite';

// The eternal promise of the 90s web. CSS-drawn caution bars plus SVG cones,
// no GIF or emoji needed.
export function UnderConstruction() {
  return (
    <div className="construction" role="presentation">
      <span className="construction__bar" aria-hidden="true" />
      <span className="construction__sign">
        <span className="construction__hat" aria-hidden="true">
          <Sprite name="cone" size={18} />
        </span>
        UNDER CONSTRUCTION
        <span className="construction__hat" aria-hidden="true">
          <Sprite name="cone" size={18} />
        </span>
      </span>
      <span className="construction__bar" aria-hidden="true" />
    </div>
  );
}
