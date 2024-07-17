import { Trash } from 'lucide-react';
import { useEffect, useState } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { useDeleteUser } from './delete-user';
import { useGetUsers } from '@/features/admin/get-users';
import { useCheckAuth } from '@/hooks/auth';
import { formatDate } from '@/utils/date-format';

const UsersList = () => {
  const deleteUserMutation = useDeleteUser();
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

  const AlertDialogDeleteUser = ({ id }: { id: string }) => {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" icon={<Trash className="size-4" />}>
            Delete
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              user.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                deleteUserMutation.mutate({ id: id });
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

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
              {users?.map(user => {
                return (
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
                      {authResponse.email !== user.email && (
                        <AlertDialogDeleteUser id={user.id} />
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </div>
    </>
  );
};

export default UsersList;
