import { useGetApi } from '@/hooks/home';

function HomePage() {
  const { isPending, isError, data, error } = useGetApi();

  if (isPending) {
    return (
      <div className="p-6">
        <p>Loading...</p>
      </div>
    );
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <div className="p-6">
        <p>{data.message}</p>
      </div>
    </>
  );
}

export default HomePage;
