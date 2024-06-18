import { useState } from 'react';

const DashboardContent = () => {
  const [isAdmin] = useState(true);

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

  return (
    <>
      <h1 className="text-xl">
        Welcome <b>{`Adrian Villanueva  `}</b>
      </h1>
      <h4 className="my-3">Your role is : {isAdmin ? 'ADMIN' : 'GUEST'}</h4>
      <p className="font-medium">In this application you can:</p>
      <ul className="my-4 list-inside list-disc">
        {isAdmin
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
