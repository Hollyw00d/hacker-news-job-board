export default function ShowMoreBtn({ handlerLoadMoreJobs }) {
  return (
    <p>
      <button onClick={handlerLoadMoreJobs}>Load more jobs</button>
    </p>
  );
}
