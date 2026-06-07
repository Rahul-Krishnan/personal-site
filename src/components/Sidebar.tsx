import { useTheme } from '../theme/useTheme';
import { Nav } from './Nav';
import { MidiPlayer } from './retro/MidiPlayer';
import { HitCounter } from './retro/HitCounter';
import { BadgeWall } from './retro/BadgeWall';
import { WebRing } from './retro/WebRing';
import { VisitorSignIn } from './retro/VisitorSignIn';

// The "fake frame" left rail: real same-page nav plus a stack of 90s sidebar
// ephemera. In the modern theme, CSS hides the ornaments; the MIDI player is
// unmounted entirely so any looping audio stops when you leave the 90s theme.
export function Sidebar() {
  const { theme } = useTheme();
  return (
    <aside className="sidebar">
      <Nav />
      <div className="sidebar__ornaments">
        {theme === '90s' && <MidiPlayer />}
        <HitCounter />
        <BadgeWall />
        <WebRing />
        <VisitorSignIn />
      </div>
    </aside>
  );
}
