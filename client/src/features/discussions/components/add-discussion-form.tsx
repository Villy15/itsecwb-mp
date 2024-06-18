import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';

const AddDisucssionForm = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission here
    console.log('Title:', title);
    console.log('Body:', body);

    // Redirect to discussions page
    navigate('/discussions');
  };

  return (
    <>
      <form
        className="mb-4 flex w-6/12 flex-col space-y-4"
        onSubmit={handleSubmit}
      >
        <label htmlFor="title">Title</label>
        <input
          type="text"
          placeholder="Sir mantua is the best!!"
          className="rounded border border-gray-200 p-2"
          value={title}
          onChange={e => setTitle(e.target.value)}
          name="title"
        />
        <p className="text-sm text-gray-500">
          Create a title for your discussione
        </p>

        <label htmlFor="body">Body</label>
        <textarea
          placeholder="Best professor ever woooho!"
          className="rounded border border-gray-200 p-2"
          value={body}
          rows={10}
          onChange={e => setBody(e.target.value)}
          name="body"
        />
        <p className="text-sm text-gray-500">
          Write a detailed description of your discussion
        </p>
        <Button className="w-1/4 min-w-min max-w-max">Create Discussion</Button>
      </form>
    </>
  );
};

export default AddDisucssionForm;
