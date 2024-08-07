import { PlusIcon, Trash } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

import CreateCommentForm from '@/features/discussions/components/create-comment-form';
import UpdateDiscussion from '@/features/discussions/components/update-discussion';
import ViewDiscussion from '@/features/discussions/components/view-discussion';
import { useGetDiscussion } from '../api/discussions';

const ReadDiscussion = () => {
  const [didCreateComment, setDidCreateComment] = useState(false);

  const { data, isLoading, isError, error } = useGetDiscussion({id: 5});

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div className="flex justify-end">
        <UpdateDiscussion />
      </div>
      <div className="mt-4">
        <h2 className="text-l font-semibold">Discussion Post</h2>
        <div className="mt-4 rounded-lg bg-white shadow">
          <div className="p-4">
            <h3 className="text-xl font-semibold">{data?.discussion_title}</h3>
            <p className="mt-2 text-gray-500">{data?.discussion_body}</p>
          </div>
        </div>
      </div>
      <ViewDiscussion />
      {didCreateComment ? null : (
        <div className="mt-4 flex justify-end">
          <Button
            className="w-[200px]"
            icon={<PlusIcon className="size-4" />}
            onClick={() => setDidCreateComment(true)}
          >
            Create Comment
          </Button>
        </div>
      )}
      {didCreateComment && (
        <>
          <h2 className="text-l mt-4 font-semibold">Creating a Comment</h2>
          <div className="mt-4 flex justify-end">
            <CreateCommentForm setDidCreateComment={setDidCreateComment} />
          </div>
        </>
      )}
    </>
  );
};

export default ReadDiscussion;
