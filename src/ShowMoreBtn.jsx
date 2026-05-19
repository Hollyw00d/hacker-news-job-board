export default function ShowMoreBtn({ handleLoadMoreJobs }) {
  return (
    <p>
      <button onClick={handleLoadMoreJobs} tabIndex={0}>
        Load more jobs
      </button>
    </p>
  );
}
