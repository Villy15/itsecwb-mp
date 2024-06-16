import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import API_URL from '@/lib/config';

async function fetchData(): Promise<{ message: string }> {
  try {
    const { data } = await axios.get(`${API_URL}/api`);

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function HomePage() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['data'],
    queryFn: fetchData,
  });

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
