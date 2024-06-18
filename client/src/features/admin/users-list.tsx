import { Trash } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { useGetUsers } from '@/features/admin/get-users';
import { useCheckAuth } from '@/hooks/auth';
import { formatDate } from '@/utils/date-format';

const UsersList = () => {
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
    <>
      <div className="p-6">
        {!isAuthorized ? (
          <p>You are not authorized to view this page</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>

                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>First Name</TableHead>
                <TableHead>Last Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users?.map(user => (
                <TableRow key={user.id}>
                  <TableCell>
                    <img
                      className="h-10 w-10 rounded-full"
                      src={user.photo_url || ''}
                      alt={user.photo_url || 'user-photo'}
                    />
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.first_name}</TableCell>
                  <TableCell>{user.last_name}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{formatDate(user.created_at)}</TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      icon={<Trash className="size-4" />}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </>
  );
};

export default UsersList;
