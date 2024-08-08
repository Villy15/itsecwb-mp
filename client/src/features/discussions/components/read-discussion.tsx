import { Edit, PlusIcon, Trash } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

import { useAddComment, useDeleteComment, useGetComments, useGetDiscussion, useUpdateDiscussion } from '../api/discussions';
import { useParams } from 'react-router-dom';
import { queryClient } from '@/lib/react-query';
import { useCheckAuth } from '@/hooks/auth';
import { Spinner } from '@/components/ui/spinner';
import { formatDate } from '@/utils/date-format';

type CreateCommentFormProps = {
  setDidCreateComment: React.Dispatch<React.SetStateAction<boolean>>;
};

const ReadDiscussion = () => {
  const { discussionId } = useParams<{ discussionId: string }>();
  const [didCreateComment, setDidCreateComment] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedBody, setEditedBody] = useState('');

  const useDeleteMutation = useDeleteComment();


  const updateDiscussionMutation = useUpdateDiscussion();
  console.log("Extracted discussionId from URL: ", discussionId);

  const { data, isLoading, isError, error } = useGetDiscussion({ id: Number(discussionId) });

  const {
    isPending: isAuthPending,
    isError: isAuthError,
    data: authResponse,
    error: authError,
  } = useCheckAuth();

  
  
  const addCommentMutation = useAddComment();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (isAuthPending) {
    return <div>Loading...</div>;
  }

  if (isAuthError) {
    return <div>Error: {authError?.message}</div>;
  }

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedTitle(data?.discussion_title || '');
    setEditedBody(data?.discussion_body || '');
  };

  const handleSaveClick = () => {
    // Add your save logic here
    setIsEditing(false);

    console.log('id: ', authResponse?.id);

    updateDiscussionMutation.mutate({
      author_id: Number(discussionId),
      discussion_title: editedTitle,
      discussion_body: editedBody,
    });

    queryClient.invalidateQueries({
      queryKey: ['discussion', Number(discussionId)],
    });

  };
  

  const UpdateDiscussion = () => {
    return (
      <Button
        className="w-[200px]"
        icon={<Edit className="size-4" />}
        onClick={handleEditClick}
      >
        Update Discussion
      </Button>
    );
  };


  const ViewDiscussion = () => {
    const { data, isLoading, isError, error } = useGetComments({ id: Number(discussionId) });
    
  
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
          <p className="text-lg">No comments loaded.</p>
        </div>
      );
  
    return (
      <div className="mt-4">
        <h2 className="text-l font-semibold">Comments</h2>
  
        {data.map(data => (
          <div key={data.id} className="mt-4 rounded-lg bg-white shadow">
            <div className="flex justify-between p-6">
              <div>
                <div>{data.comment_body}</div>
                <div className="mt-2 text-sm text-gray-500">
                  {formatDate(data.created_date)} by {data.author_id}
                </div>
              </div>
              <Button size="icon" variant="destructive" onClick={() => useDeleteMutation.mutate(data.id)}>
                <Trash className="size-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const CreateCommentForm = ({ setDidCreateComment }: CreateCommentFormProps) => {
    const [comment, setComment] = useState('');
  
    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      // Handle form submission here
      console.log('Comment:', comment);
  
      // Reset comment
      setComment('');
  
      // Redirect to discussions page
      setDidCreateComment(false);
  
      addCommentMutation.mutate({
        author_id: authResponse?.id,
        discussion_id: Number(discussionId),
        comment_body: comment,
      });
    };
  
    return (
      <form
        className="mb-4 flex w-full flex-col space-y-4"
        onSubmit={handleSubmit}
      >
        <textarea
          placeholder="Best professor ever woooho!"
          className="rounded border border-gray-200 p-2"
          value={comment}
          rows={10}
          onChange={e => setComment(e.target.value)}
          name="body"
        />
        <div className="flex justify-between">
          <Button className="w-1/4 min-w-min max-w-max">Submit Comment</Button>
          <Button
            onClick={() => setDidCreateComment(false)}
            variant="destructive"
            className="w-1/4 min-w-min max-w-max"
          >
            Cancel
          </Button>
        </div>
      </form>
    );
  };

  return (
    <>
      <div className="flex justify-end">
        {isEditing ? (
          <Button
            className="w-[200px]"
            onClick={handleSaveClick}
          >
            Save
          </Button>
        ) : (
          <UpdateDiscussion />
        )}
      </div>
      <div className="mt-4">
        <h2 className="text-l font-semibold">Discussion Post</h2>
        <div className="mt-4 rounded-lg bg-white shadow">
          <div className="p-4">
            {isEditing ? (
              <>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
                <textarea
                  className="w-full p-2 mt-2 border border-gray-300 rounded"
                  value={editedBody}
                  onChange={(e) => setEditedBody(e.target.value)}
                />
              </>
            ) : (
              <>
                <h3 className="text-xl font-semibold">{data?.discussion_title}</h3>
                <p className="mt-2 text-gray-500">{data?.discussion_body}</p>
              </>
            )}
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
