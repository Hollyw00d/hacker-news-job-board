export default function ShowMoreBtn({ handleLoadMoreJobs }) {
  return (
    <p>
      <button onClick={handleLoadMoreJobs}>Load more jobs</button>
    </p>
  );
}
