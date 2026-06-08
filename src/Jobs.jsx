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
          const { id, url, title, by, time } = job;

          // if (id && url && title && by && time) {
          const date = new Date(time * 1000);
          const dateStr = date.toLocaleString();

          const isfirstOfFetchedJobs =
            i === firstOfFetchedJobsIdx && isLoadMoreClicked;

          return (
            <li key={id}>
              <h2>
                <a
                  href={url}
                  ref={isfirstOfFetchedJobs ? firstOfFetchedJobs : null}
                >
                  {title}
                </a>
              </h2>
              <p>
                By {by} &bull; {dateStr}
              </p>
            </li>
          );
          // }
        })}
      </ol>
    </>
  );
}
