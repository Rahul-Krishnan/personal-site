// The eternal promise of the 90s web. CSS-drawn caution bars, no GIF needed.
export function UnderConstruction() {
  return (
    <div className="construction" role="presentation">
      <span className="construction__bar" aria-hidden="true" />
      <span className="construction__sign">
        <span className="construction__hat" aria-hidden="true">
          🚧
        </span>
        UNDER CONSTRUCTION
        <span className="construction__hat" aria-hidden="true">
          🚧
        </span>
      </span>
      <span className="construction__bar" aria-hidden="true" />
    </div>
  );
}
