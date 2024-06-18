import { ContentLayout } from '@/components/layouts/content-layout';

import { useGetApi } from '@/hooks/home';

function HomePage() {
  const { isPending, isError, error } = useGetApi();

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
    <ContentLayout title="Dashboard">
      <h1 className="text-xl">
        Welcome <b>{`Adrian Villanueva  `}</b>
      </h1>
      <h4 className="my-3">
        Your role is : <b>ADMIN</b>
      </h4>
      <p className="font-medium">In this application you can:</p>
      <ul className="my-4 list-inside list-disc">
        <li>Create discussions</li>
        <li>Edit discussions</li>
        <li>Delete discussions</li>
        <li>Comment on discussions</li>
        <li>Delete all comments</li>
      </ul>
    </ContentLayout>
  );
}

export default HomePage;
