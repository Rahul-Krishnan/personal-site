import { emailParts, links } from '../content';

export function Links() {
  // Assemble the address at runtime so it is not sitting in the static HTML
  // as plain text for scrapers to grab.
  const email = `${emailParts.user}@${emailParts.domain}`;

  return (
    <nav className="links" aria-label="Contact and profiles">
      <ul className="links__list">
        {links.map((link) =>
          link.kind === 'email' ? (
            <li key={link.label} className="links__item">
              <a className="links__anchor" href={`mailto:${email}`}>
                {link.label}
              </a>
            </li>
          ) : (
            <li key={link.label} className="links__item">
              <a
                className="links__anchor"
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
              >
                {link.label}
              </a>
            </li>
          ),
        )}
      </ul>
    </nav>
  );
}
