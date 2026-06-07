import { jobs } from '../content';
import { JobEntry } from '../components/JobEntry';

export function Work() {
  return (
    <section id="work" className="section section--work" aria-labelledby="work-heading">
      <h2 id="work-heading" className="section__heading">
        Work
      </h2>
      <div className="entry-list">
        {jobs.map((job) => (
          <JobEntry key={`${job.company}-${job.dates}`} job={job} />
        ))}
      </div>
    </section>
  );
}
