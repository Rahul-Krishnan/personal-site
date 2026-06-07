import { profile } from '../content';
import { Links } from '../components/Links';
import { SkillWall } from '../components/SkillWall';

export function Hero() {
  return (
    <section id="home" className="section section--hero" aria-labelledby="home-heading">
      <h2 id="home-heading" className="section__heading">
        About
      </h2>
      <p className="hero__location">
        <span className="hero__blink" aria-hidden="true">
          NEW!
        </span>{' '}
        {profile.name} &middot; {profile.location}
      </p>
      <p className="hero__summary">{profile.summary}</p>
      <p className="hero__emailme">
        <span className="hero__envelope" aria-hidden="true">
          ✉️
        </span>{' '}
        Find me here:
      </p>
      <Links />
      <p className="hero__skills-label">Skills</p>
      <SkillWall />
    </section>
  );
}
