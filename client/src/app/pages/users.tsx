import { useEffect, useState } from 'react';

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

function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/users')
      .then(response => response.json())
      .then(data => setUsers(data));
  }, []);

  return (
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
            <td className="whitespace-nowrap px-6 py-4">{user.first_name}</td>
            <td className="whitespace-nowrap px-6 py-4">{user.last_name}</td>
            <td className="whitespace-nowrap px-6 py-4">
              <img
                className="h-10 w-10 rounded-full"
                src={user.photo_url || ''}
                alt={user.photo_url || 'user-photo'}
              />
            </td>
            <td className="whitespace-nowrap px-6 py-4">{user.phone}</td>
            <td className="whitespace-nowrap px-6 py-4">{user.created_at}</td>
            <td className="whitespace-nowrap px-6 py-4">{user.enable}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UsersPage;
