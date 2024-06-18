import { PlusIcon, Trash } from 'lucide-react';

import { ContentLayout } from '@/components/layouts/content-layout';
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

import { useGetDiscussions } from '@/hooks/discussions';
import { formatDate } from '@/utils/date-format';

const CreateDiscussion = () => {
  return (
    <Button icon={<PlusIcon />} onClick={() => {}}>
      Create Discussion
    </Button>
  );
};

const DiscussionsList = () => {
  const { data, isLoading, isError, error } = useGetDiscussions();

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
            onClick={() => {
              console.log('hi');
            }}
            className="cursor-pointer hover:bg-gray-100"
          >
            <TableCell className="font-medium">{data.title}</TableCell>
            <TableCell>{data.description}</TableCell>
            <TableCell>{formatDate(data.created_at)}</TableCell>
            <TableCell>{data.author_id}</TableCell>
            <TableCell>
              <Button variant="destructive" icon={<Trash className="size-4" />}>
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

function DiscussionsPage() {
  return (
    <ContentLayout title="Discussions">
      <div className="flex justify-end">
        <CreateDiscussion />
      </div>
      <div className="mt-4">
        <DiscussionsList />
      </div>
    </ContentLayout>
  );
}

export default DiscussionsPage;
