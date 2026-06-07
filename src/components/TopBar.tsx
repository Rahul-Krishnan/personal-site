import { useTheme } from '../theme/useTheme';

// Fixed, impossible-to-miss bar at the very top. Houses the prominent theme
// toggle. Present in both themes; each theme restyles it.
export function TopBar() {
  const { theme, toggle } = useTheme();
  const isRetro = theme === '90s';

  return (
    <div className="topbar">
      <span className="topbar__blurb" aria-hidden="true">
        {isRetro ? '<< THIS PAGE IS BEST EXPERIENCED LOUD >>' : 'Rahul Krishnan'}
      </span>
      <button
        type="button"
        className="topbar__toggle"
        onClick={toggle}
        aria-pressed={!isRetro}
        aria-label={isRetro ? 'Switch to modern theme' : 'Switch to 1990s theme'}
      >
        <span className="topbar__toggle-retro" aria-hidden="true">
          {/* Same glyph both sides; the right pair is mirrored via CSS so the
              two ends are guaranteed identical width. */}
          <span className="topbar__arrows">&#9654;&#9654;</span> GO MODERN{' '}
          <span className="topbar__arrows topbar__arrows--flip">
            &#9654;&#9654;
          </span>
        </span>
        <span className="topbar__toggle-modern" aria-hidden="true">
          Time-travel to 1996
        </span>
      </button>
    </div>
  );
}
