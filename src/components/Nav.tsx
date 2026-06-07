import { useActiveSection } from '../hooks/useActiveSection';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'work', label: 'Work' },
  { id: 'education', label: 'Education' },
  { id: 'path', label: 'The Path' },
] as const;

const SECTION_IDS = NAV_ITEMS.map((i) => i.id);

export function Nav() {
  const active = useActiveSection(SECTION_IDS);

  return (
    <nav className="nav" aria-label="Page sections">
      <p className="nav__title">~ NAVIGATION ~</p>
      <ul className="nav__list">
        {NAV_ITEMS.map((item) => {
          const isActive = item.id === active;
          return (
            <li key={item.id} className="nav__item">
              <a
                href={`#${item.id}`}
                className={`nav__link${isActive ? ' nav__link--active' : ''}`}
                aria-current={isActive ? 'true' : undefined}
              >
                <span className="nav__pointer" aria-hidden="true">
                  {isActive ? '►' : '»'}
                </span>
                {item.label}
                {isActive && (
                  <span className="nav__youarehere" aria-hidden="true">
                    {' '}
                    &larr; YOU ARE HERE
                  </span>
                )}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
