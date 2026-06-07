import type { SchoolEntry as SchoolEntryData } from '../content';

export function SchoolEntry({ school }: { school: SchoolEntryData }) {
  return (
    <article className="entry">
      <header className="entry__head">
        <h3 className="entry__title">
          <span className="entry__org">{school.school}</span>
          <span className="entry__role">{school.degree}</span>
        </h3>
        <p className="entry__meta">
          <span className="entry__location">{school.location}</span>
          {school.year && <span className="entry__dates">{school.year}</span>}
        </p>
      </header>
    </article>
  );
}
