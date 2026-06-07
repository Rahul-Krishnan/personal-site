import type { JobEntry as JobEntryData } from '../content';

export function JobEntry({ job }: { job: JobEntryData }) {
  return (
    <article className="entry">
      <header className="entry__head">
        <h3 className="entry__title">
          <span className="entry__org">{job.company}</span>
          <span className="entry__role">{job.title}</span>
        </h3>
        <p className="entry__meta">
          <span className="entry__location">{job.location}</span>
          <span className="entry__dates">{job.dates}</span>
        </p>
      </header>
      <ul className="entry__bullets">
        {job.blurbs.map((blurb, i) => (
          <li key={i} className="entry__bullet">
            {blurb}
          </li>
        ))}
      </ul>
    </article>
  );
}
