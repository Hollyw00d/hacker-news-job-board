import { useState, useEffect } from 'react';
import Jobs from './Jobs';
import ShowMoreBtn from './ShowMoreBtn';
import './JobBoard.css';

export default function JobBoard() {
  const jobsMaxStart = 6;

  const [totalJobs, setTotalJobs] = useState(null);
  const [jobsMax, setJobsMax] = useState(jobsMaxStart);
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadMoreClicked, setIsLoadMoreClicked] = useState(false);

  const handleLoadMoreJobs = () => {
    setJobsMax((prev) => prev + jobsMaxStart);
    setIsLoadMoreClicked(true);
  };

  useEffect(() => {
    async function fetchJobs() {
      try {
        setIsLoading(true);
        setError(null);

        // Pause for 200 ms before executing URL fetch below
        await new Promise((resolve) => setTimeout(resolve, 200));

        const resJobStories = await fetch(
          'https://hacker-news.firebaseio.com/v0/jobstories.json'
        );

        if (!resJobStories.ok) {
          throw new Error('Job stories not loading.');
        }

        const dataJobStories = await resJobStories.json();
        setTotalJobs(dataJobStories.length);

        const jobIds = dataJobStories.slice(0, jobsMax);

        const jobsData = await Promise.all(
          jobIds.map(async (jobStory) => {
            const resJob = await fetch(
              `https://hacker-news.firebaseio.com/v0/item/${jobStory}.json`
            );

            if (!resJob.ok) {
              throw new Error('Job not loading.');
            }

            return resJob.json();
          })
        );

        setJobs(jobsData);
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        // eslint-disable-next-line quotes
        setError(`Error: Jobs aren't loading.`);
      } finally {
        setIsLoading(false);
      }
    }

    fetchJobs();
  }, [jobsMax]);

  return (
    <div>
      <h1>Hacker News Job Board</h1>

      {error ? (
        <p>{error}</p>
      ) : (
        <div>
          <Jobs
            jobs={jobs}
            isLoadMoreClicked={isLoadMoreClicked}
            jobsMaxStart={jobsMaxStart}
          />

          {isLoading && <p>Loading jobs...</p>}

          {jobsMax < totalJobs && !isLoading && (
            <ShowMoreBtn handleLoadMoreJobs={handleLoadMoreJobs} />
          )}
        </div>
      )}
    </div>
  );
}
