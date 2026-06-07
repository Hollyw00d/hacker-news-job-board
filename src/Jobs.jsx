import { useEffect, useRef } from 'react';

export default function Jobs({ jobs, isLoadMoreClicked, jobsMaxStart }) {
  const lastIdx = jobs.length;
  const firstOfFetchedJobsIdx = lastIdx - jobsMaxStart;
  const firstOfFetchedJobs = useRef(null);

  useEffect(() => {
    firstOfFetchedJobs.current?.focus();
  }, [jobs]);

  return (
    <>
      <div role="status" aria-live="polite" className="sr-only">
        Now showing {jobs.length} total jobs
      </div>

      <ol>
        {jobs.map((job, i) => {
          const date = new Date(job.time * 1000);
          const dateStr = date.toLocaleString();

          const isfirstOfFetchedJobs =
            i === firstOfFetchedJobsIdx && isLoadMoreClicked;

          return (
            <li key={job.id}>
              <h2>
                <a
                  href={job.url}
                  ref={isfirstOfFetchedJobs ? firstOfFetchedJobs : null}
                >
                  {job.title}
                </a>
              </h2>
              <p>
                By {job.by} &bull; {dateStr}
              </p>
            </li>
          );
        })}
      </ol>
    </>
  );
}
