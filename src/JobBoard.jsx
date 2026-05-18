import { useState, useEffect } from 'react';
import Jobs from './Jobs';
import ShowMoreBtn from './ShowMoreBtn';

export default function JobBoard() {
  const jobsMaxStart = 6;
  const [totalJobs, setTotalJobs] = useState(null);
  const [jobsMax, setJobsMax] = useState(jobsMaxStart);
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const handlerLoadMoreJobs = () => {
    setJobsMax((prev) => prev + jobsMaxStart);
  };

  useEffect(() => {
    async function fetchJobs() {
      try {
        const resJobStories = await fetch(
          'https://hacker-news.firebaseio.com/v0/jobstories.json'
        );
        const dataJobStories = await resJobStories.json();
        setTotalJobs(dataJobStories.length);

        const jobIds = dataJobStories.slice(0, jobsMax);

        const jobsData = await Promise.all(
          jobIds.map(async (jobStory) => {
            const resJob = await fetch(
              `https://hacker-news.firebaseio.com/v0/item/${jobStory}.json`
            );
            return resJob.json();
          })
        );

        setJobs(jobsData);
      } catch (error) {
        // eslint-disable-line
        setError(`Error: Jobs aren't loading.`);
      }
    }

    fetchJobs();
  }, [jobsMax]);

  return (
    <div>
      <h2>Hacker News Job Board</h2>

      {error ? (
        <p>{error}</p>
      ) : (
        <div>
          <Jobs jobs={jobs} />
          {jobsMax < totalJobs && (
            <ShowMoreBtn handlerLoadMoreJobs={handlerLoadMoreJobs} />
          )}
        </div>
      )}
    </div>
  );
}
