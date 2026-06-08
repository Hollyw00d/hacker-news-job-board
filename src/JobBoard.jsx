import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import Jobs from './Jobs';
import ShowMoreBtn from './ShowMoreBtn';
import './JobBoard.css';

export default function JobBoard() {
  const jobsMaxStart = 6;
  const [isLoadMoreClicked, setIsLoadMoreClicked] = useState(false);

  const handleLoadMoreJobs = () => {
    fetchNextPage();
    setIsLoadMoreClicked(true);
  };

  async function fetchJobs({ pageParam = 0 }) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 200));

      const resJobStories = await fetch(
        'https://hacker-news.firebaseio.com/v0/jobstories.json'
      );

      if (!resJobStories.ok) {
        throw new Error('Error: Job stories are not loading.');
      }

      const dataJobStories = await resJobStories.json();
      const jobIds = dataJobStories.slice(pageParam, pageParam + jobsMaxStart);
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

      return {
        jobs: jobsData,
        nextPage: pageParam + jobsMaxStart,
        totalJobs: dataJobStories.length
      };
    } catch (error) {
      // eslint-disable-next-line quotes
      throw new Error("Error: Jobs aren't loading.", { cause: error });
    }
  }

  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error
  } = useInfiniteQuery({
    queryKey: ['jobs'],
    queryFn: fetchJobs,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage < lastPage.totalJobs
        ? lastPage.nextPage
        : undefined;
    }
  });

  const jobs = data?.pages.flatMap((page) => page.jobs) ?? [];

  return (
    <div>
      <h1>Hacker News Job Board</h1>

      {error ? (
        <p>{error.message}</p>
      ) : (
        <div>
          <Jobs
            jobs={jobs}
            isLoadMoreClicked={isLoadMoreClicked}
            jobsMaxStart={jobsMaxStart}
          />

          {isLoading && <p>Loading jobs...</p>}

          {isFetchingNextPage && <p>Loading more jobs...</p>}

          {hasNextPage && !isFetchingNextPage && (
            <ShowMoreBtn handleLoadMoreJobs={handleLoadMoreJobs} />
          )}
        </div>
      )}
    </div>
  );
}
