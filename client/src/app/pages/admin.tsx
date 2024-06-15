import { useEffect, useState } from 'react';

import API_URL from '@/config';

interface User {
  id: number;
  email: string;
  password: string;
  role: string;
  first_name: string | null;
  last_name: string | null;
  photo_url: string | null;
  phone: string | null;
  created_at: string;
  enable: number;
}

function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkAuthorization() {
      try {
        const response = await fetch(
          'http://localhost:8000/api/auth/checkAuth',
          {
            credentials: 'include',
            method: 'POST',
          }
        );
        const data = await response.json();
        if (response.status === 200 && data.authorized && data.isAdmin) {
          setIsAuthorized(true);
          fetchUsers();
        } else {
          setIsAuthorized(false);
        }
      } catch (error) {
        console.error('Failed to check authorization:', error);
      }
    }

    checkAuthorization();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/api/users`, {
        credentials: 'include',
        method: 'GET',
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

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
            {users.map(user => (
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
