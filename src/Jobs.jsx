export default function Jobs({ jobs }) {
  const jobsLength = jobs.length;

  return (
    <>
      <div role="alert" aria-live="assertive" className="sr-only">
        Now showing {jobsLength} total jobs
      </div>

      {jobs.map((job) => {
        const date = new Date(job.time * 1000);
        const dateStr = date.toLocaleString();
        return (
          <div key={job.id}>
            <h3>
              <a href={job.url} tabIndex={0}>
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
