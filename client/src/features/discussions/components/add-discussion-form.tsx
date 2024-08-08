import { useAddDiscussion } from '../api/discussions';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

import { useCheckAuth } from '@/hooks/auth';

const AddDisucssionForm = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const addDiscussionMutation = useAddDiscussion();

  // Auth
  const [isAuthorized, setIsAuthorized] = useState(false);

  const {
    isPending: isAuthPending,
    isError: isAuthError,
    data: authResponse,
    error: authError,
  } = useCheckAuth();

  useEffect(() => {
    if (authResponse) {
      if (authResponse.authorized) {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    }
  }, [authResponse]);

  if (isAuthPending) {
    return <p>Loading...</p>;
  }

  if (isAuthError) {
    return <p>Error: {authError?.message}</p>;
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title || !body) {
      toast.error('Please fill out all fields');
      return;
    }

    console.log(isAuthorized);

    if (!isAuthorized) {
      toast.error('You are not authorized to create a discussion');
      return;
    }

    addDiscussionMutation.mutate({
      discussion_title: title,
      discussion_body: body,
      author_id: authResponse.id,
    });
  };

  return (
    <>
      <form
        className="mb-4 flex w-6/12 flex-col space-y-4"
        onSubmit={handleSubmit}
      >
        <label htmlFor="discussion_title">Title</label>
        <input
          type="text"
          placeholder="Enter Title"
          className="rounded border border-gray-200 p-2"
          value={title}
          onChange={e => setTitle(e.target.value)}
          name="discussion_title"
        />
        <p className="text-sm text-gray-500">
          Create a title for your discussione
        </p>

        <label htmlFor="discussion_body">Body</label>
        <textarea
          placeholder="Enter Content"
          className="rounded border border-gray-200 p-2"
          value={body}
          rows={10}
          onChange={e => setBody(e.target.value)}
          name="discussion_body"
        />
        <p className="text-sm text-gray-500">
          Write a detailed description of your discussion
        </p>
        <Button type="submit" className="w-1/4 min-w-min max-w-max">
          Create Discussion
        </Button>
      </form>
    </>
  );
};

export default AddDisucssionForm;
