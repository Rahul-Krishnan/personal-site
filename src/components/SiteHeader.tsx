import { profile } from '../content';
import { Marquee } from './retro/Marquee';

// The header band: big WordArt-style name, a scrolling tagline, and the
// obligatory "best viewed" / "Netscape Now" / last-updated chrome.
export function SiteHeader() {
  return (
    <header className="siteheader">
      <Marquee text="WELCOME TO RAHUL'S CORNER OF THE WEB ::: PLEASE SIGN MY GUESTBOOK ::: ADD ME ON ICQ AND mIRC ::: BOOKMARK IN NETSCAPE ::: THIS SITE IS UNDER ETERNAL CONSTRUCTION ::: TELL YOUR FRIENDS" />
      <h1 className="siteheader__name" data-text={profile.name}>
        {profile.name}
      </h1>
      <p className="siteheader__tagline">{profile.tagline}</p>
      <div className="siteheader__chrome">
        <span className="siteheader__badge-text">Best viewed at 800&times;600</span>
        <span className="siteheader__badge-text">Netscape Now!</span>
        <span className="siteheader__badge-text">
          Last updated: {new Date().toLocaleDateString()}
        </span>
      </div>
    </header>
  );
}
