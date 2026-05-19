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
      <div role="alert" aria-live="assertive" className="sr-only">
        Now showing {jobs.length} total jobs
      </div>

      {jobs.map((job, i) => {
        const date = new Date(job.time * 1000);
        const dateStr = date.toLocaleString();

        const isfirstOfFetchedJobs =
          i === firstOfFetchedJobsIdx && isLoadMoreClicked;

        return (
          <div key={job.id}>
            <h3>
              <a
                href={job.url}
                tabIndex={0}
                ref={isfirstOfFetchedJobs ? firstOfFetchedJobs : null}
              >
                {job.title}
              </a>
            </h3>
            <p>
              By {job.by} &bull; {dateStr}
            </p>
          </div>
        );
      })}
    </>
  );
}
