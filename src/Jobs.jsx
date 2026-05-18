export default function Jobs({ jobs }) {
  return (
    <>
      {jobs.map((job) => {
        const date = new Date(job.time * 1000);
        const dateStr = date.toLocaleString();
        return (
          <div key={job.id}>
            <h3>
              <a href={job.url}>{job.title}</a>
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
