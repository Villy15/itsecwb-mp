import { useGetDiscussions } from '../api/discussions';
import { Trash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

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

import { formatDate } from '@/utils/date-format';
import { useDeleteDiscussion } from './delete-discussion';

const DiscussionsList = () => {
  const deleteDiscussionMutation = useDeleteDiscussion();

  const { data, isLoading, isError, error } = useGetDiscussions();

  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  if (!data)
    return (
      <div className="flex h-80 flex-col items-center justify-center bg-slate-100 text-gray-500">
        <p className="text-lg">No discussions found.</p>
        <p className="text-sm">Create a new discussion to get started.</p>
      </div>
    );

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
                  deleteDiscussionMutation.mutate({ id: id });
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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Body</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Created By</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map(data => (
          <TableRow
            key={data.id}
            className="cursor-pointer hover:bg-gray-100"
          >
            <TableCell className="font-medium" 
              onClick={() => {
              navigate(`/discussions/${data.id}`);
            }}
            >{data.discussion_title}</TableCell>
            <TableCell>{data.discussion_body}</TableCell>
            <TableCell>{formatDate(data.created_at)}</TableCell>
            <TableCell>{data.author_id}</TableCell>
            <TableCell>
              <AlertDialogDeleteUser id={data.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DiscussionsList;
