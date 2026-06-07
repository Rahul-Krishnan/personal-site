import { schools } from '../content';
import { SchoolEntry } from '../components/SchoolEntry';

export function Education() {
  return (
    <section
      id="education"
      className="section section--education"
      aria-labelledby="education-heading"
    >
      <h2 id="education-heading" className="section__heading">
        Education
      </h2>
      <div className="entry-list">
        {schools.map((school) => (
          <SchoolEntry key={school.school} school={school} />
        ))}
      </div>
    </section>
  );
}
