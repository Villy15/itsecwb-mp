import { useEffect, useState } from 'react';

import { useCheckAuth } from '@/hooks/auth';

const DashboardContent = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  const {
    isPending: isAuthPending,
    isError: isAuthError,
    data: authResponse,
    error: authError,
  } = useCheckAuth();

  useEffect(() => {
    if (authResponse) {
      if (authResponse.authorized && authResponse.isAdmin) {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    }
  }, [authResponse]);

  const adminpPivileges = [
    'Create discussions',
    'Edit discussions',

    'Delete discussions',
    'Comment on discussions',
    'Delete all comments',
    'View the Admin Page',
  ];

  const guestPrivileges = [
    'View discussions',
    'Comment on discussions',
    'Delete own comments',
  ];

  if (isAuthPending) {
    return <p>Loading...</p>;
  }

  if (isAuthError) {
    return <p>Error: {authError?.message}</p>;
  }

  return (
    <>
      <h1 className="text-xl">
        Welcome <b>{`${authResponse.first_name} ${authResponse.last_name}`}</b>
      </h1>
      <h4 className="my-3">
        Your role is : {isAuthorized ? 'ADMIN' : 'GUEST'}
      </h4>
      <p className="font-medium">In this application you can:</p>
      <ul className="my-4 list-inside list-disc">
        {isAuthorized
          ? adminpPivileges.map(privilege => (
              <li key={privilege} className="mt-2">
                {privilege}
              </li>
            ))
          : guestPrivileges.map(privilege => (
              <li key={privilege} className="mt-2">
                {privilege}
              </li>
            ))}
      </ul>
    </>
  );
};

export default DashboardContent;
