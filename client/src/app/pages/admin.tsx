import { useEffect, useState } from 'react';

import { useCheckAuth } from '@/hooks/auth';
import { useGetUsers } from '@/hooks/users';

function AdminPage() {
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

  const {
    isError: isUsersError,
    data: users,
    error: usersError,
  } = useGetUsers();

  if (isAuthPending) {
    return <p>Loading...</p>;
  }

  if (isAuthError || isUsersError) {
    return <p>Error: {authError?.message || usersError?.message}</p>;
  }

  return (
    <div className="p-6">
      {!isAuthorized ? (
        <p>You are not authorized to view this page</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                First Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Last Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Photo URL
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Created At
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Enable
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {users?.map(user => (
              <tr key={user.id}>
                <td className="whitespace-nowrap px-6 py-4">{user.id}</td>
                <td className="whitespace-nowrap px-6 py-4">{user.email}</td>
                <td className="whitespace-nowrap px-6 py-4">{user.role}</td>
                <td className="whitespace-nowrap px-6 py-4">
                  {user.first_name}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {user.last_name}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={user.photo_url || ''}
                    alt={user.photo_url || 'user-photo'}
                  />
                </td>
                <td className="whitespace-nowrap px-6 py-4">{user.phone}</td>
                <td className="whitespace-nowrap px-6 py-4">
                  {user.created_at}
                </td>
                <td className="whitespace-nowrap px-6 py-4">{user.enable}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminPage;
