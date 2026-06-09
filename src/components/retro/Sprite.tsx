// Hand-drawn inline-SVG "sprites" that stand in for the animated GIFs a real
// 90s page would hotlink. No modern emoji, no external assets: chunky clipart
// drawn with basic shapes, self-contained and theme-agnostic.

export type SpriteName =
  | 'star'
  | 'floppy'
  | 'flame'
  | 'envelope'
  | 'monitor'
  | 'globe'
  | 'sparkle'
  | 'bolt'
  | 'cd'
  | 'skull'
  | 'diamond'
  | 'cone';

const SHAPES: Record<SpriteName, React.ReactNode> = {
  star: (
    <polygon
      points="12,1 15,9 23,9 16.5,14 19,22 12,17 5,22 7.5,14 1,9 9,9"
      fill="#ffd000"
      stroke="#000"
      strokeWidth="1"
    />
  ),
  floppy: (
    <g shapeRendering="crispEdges">
      <rect x="3" y="3" width="18" height="18" fill="#2b4cff" stroke="#000" />
      <rect x="7" y="3" width="9" height="6" fill="#cfd8ff" />
      <rect x="12" y="4" width="3" height="4" fill="#444" />
      <rect x="6" y="12" width="12" height="7" fill="#fff" stroke="#000" />
      <rect x="8" y="14" width="8" height="1.4" fill="#2b4cff" />
      <rect x="8" y="16.4" width="8" height="1.4" fill="#2b4cff" />
    </g>
  ),
  flame: (
    <g>
      <path
        d="M12 2 C 15 7, 18 9, 16 14 C 20 13, 19 20, 12 22 C 5 20, 4 13, 8 14 C 6 9, 9 7, 12 2 Z"
        fill="#ff5a00"
        stroke="#000"
        strokeWidth="1"
      />
      <path d="M12 9 C 14 12, 14 16, 12 19 C 10 16, 10 12, 12 9 Z" fill="#ffd000" />
    </g>
  ),
  envelope: (
    <g shapeRendering="crispEdges">
      <rect x="2" y="5" width="20" height="14" fill="#fff" stroke="#000" />
      <polyline
        points="2,5 12,13 22,5"
        fill="none"
        stroke="#000"
        strokeWidth="1.5"
      />
    </g>
  ),
  monitor: (
    <g shapeRendering="crispEdges">
      <rect x="2" y="3" width="20" height="14" fill="#c0c0c0" stroke="#000" />
      <rect x="4" y="5" width="16" height="10" fill="#0a2a6b" />
      <rect x="6" y="7" width="7" height="1.4" fill="#39ff14" />
      <rect x="6" y="9.4" width="10" height="1.4" fill="#39ff14" />
      <rect x="9" y="17" width="6" height="3" fill="#c0c0c0" stroke="#000" />
      <rect x="6" y="20" width="12" height="2" fill="#888" stroke="#000" />
    </g>
  ),
  globe: (
    <g>
      <circle cx="12" cy="12" r="10" fill="#1e90ff" stroke="#000" />
      <ellipse cx="12" cy="12" rx="4" ry="10" fill="none" stroke="#fff" />
      <line x1="2" y1="12" x2="22" y2="12" stroke="#fff" />
      <path d="M4 7 H20 M4 17 H20" stroke="#fff" strokeWidth="0.8" fill="none" />
    </g>
  ),
  sparkle: (
    <path
      d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z"
      fill="#fff"
      stroke="#00ffff"
      strokeWidth="0.8"
    />
  ),
  bolt: (
    <polygon
      points="13,2 4,14 11,14 9,22 20,9 13,9"
      fill="#ffd000"
      stroke="#000"
    />
  ),
  cd: (
    <g>
      <circle cx="12" cy="12" r="10" fill="#cfd8ff" stroke="#000" />
      <circle cx="12" cy="12" r="9" fill="none" stroke="#9fb0ff" />
      <circle cx="12" cy="12" r="3" fill="#fff" stroke="#000" />
      <circle cx="12" cy="12" r="1" fill="#888" />
    </g>
  ),
  skull: (
    <g shapeRendering="crispEdges">
      <rect x="5" y="4" width="14" height="12" rx="3" fill="#f0f0f0" stroke="#000" />
      <rect x="7" y="9" width="3" height="3" fill="#000" />
      <rect x="14" y="9" width="3" height="3" fill="#000" />
      <rect x="8" y="16" width="8" height="3" fill="#f0f0f0" stroke="#000" />
      <rect x="10" y="16" width="1" height="3" fill="#000" />
      <rect x="13" y="16" width="1" height="3" fill="#000" />
    </g>
  ),
  diamond: (
    <g>
      <polygon points="12,2 22,12 12,22 2,12" fill="#ff00ff" stroke="#000" />
      <polygon points="12,2 16,8 12,12 8,8" fill="#ff8cf3" />
    </g>
  ),
  cone: (
    <g shapeRendering="crispEdges">
      <polygon points="12,3 18,19 6,19" fill="#ff6a00" stroke="#000" />
      <rect x="8.5" y="10.5" width="7" height="2.4" fill="#fff" />
      <rect x="4" y="19" width="16" height="2.6" fill="#ff6a00" stroke="#000" />
    </g>
  ),
};

export function Sprite({
  name,
  size = 24,
  className,
}: {
  name: SpriteName;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      {SHAPES[name]}
    </svg>
  );
}
