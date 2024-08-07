import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

const AddDisucssionForm = () => {
  const [discussion_title, setTitle] = useState('');
  const [discussion_body, setBody] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    
    // Handle form submission here
    console.log('Title:', discussion_title);
    console.log('Body:', discussion_body);

    toast.success('Discussion added sucessfully', {
      dismissible: true,
      cancel: {
        label: 'Close',
        onClick: () => {},
      },
      duration: 3000,
      position: 'top-right',
    });

    // Redirect to discussions page
    navigate('/discussions');
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
          value={discussion_title}
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
          value={discussion_body}
          rows={10}
          onChange={e => setBody(e.target.value)}
          name="discussion_body"
        />
        <p className="text-sm text-gray-500">
          Write a detailed description of your discussion
        </p>
        <Button type="submit" className="w-1/4 min-w-min max-w-max">Create Discussion</Button>
      </form>
    </>
  );
};

export default AddDisucssionForm;
