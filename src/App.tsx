import { useTheme } from './theme/useTheme';
import { useTitleMarquee } from './hooks/useTitleMarquee';
import { TopBar } from './components/TopBar';
import { SiteHeader } from './components/SiteHeader';
import { Sidebar } from './components/Sidebar';
import { Hero } from './sections/Hero';
import { Work } from './sections/Work';
import { Education } from './sections/Education';
import { LifeStory } from './sections/LifeStory';
import { Sprites } from './components/retro/Sprites';
import { CursorTrail } from './components/retro/CursorTrail';
import { Divider } from './components/retro/Divider';
import { UnderConstruction } from './components/retro/UnderConstruction';
import { GuestbookDecoration } from './components/retro/GuestbookDecoration';
import { PoweredBy } from './components/retro/PoweredBy';
import { StatusBar } from './components/retro/StatusBar';
import { Analytics } from '@vercel/analytics/next';

function App() {
  const { theme } = useTheme();
  useTitleMarquee(theme === '90s');

  return (
    <>
      {/* Viewport-fixed decorations (hidden in modern theme via CSS). */}
      <Sprites />
      {/* Cursor trail is a 90s-only flourish; unmount it in modern. */}
      {theme === '90s' && <CursorTrail />}

      {/* Prominent top bar with the theme toggle (both themes). */}
      <TopBar />

      <div className="page">
        <SiteHeader />

        {/* Fake "frames": sticky sidebar nav + content well. */}
        <div className="frame">
          <Sidebar />

          <main className="content">
            <Hero />
            <Divider variant="flame" />
            <Work />
            <Divider variant="star" />
            <Education />
            <Divider variant="flame" />
            <LifeStory />

            <footer className="footer">
              <UnderConstruction />
              <GuestbookDecoration />
              <PoweredBy />
              <p className="footer__sig">
                &copy; {new Date().getFullYear()} Rahul Krishnan &middot; San Francisco
              </p>
            </footer>
          </main>
        </div>

        <StatusBar />
      </div>
      <Analytics />
    </>
  );
}

export default App;
