import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

type CreateCommentFormProps = {
  setDidCreateComment: React.Dispatch<React.SetStateAction<boolean>>;
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

    toast.success('Comment added sucessfully', {
      dismissible: true,
      cancel: {
        label: 'Close',
        onClick: () => {},
      },
      duration: 3000,
      position: 'top-right',
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

export default CreateCommentForm;
