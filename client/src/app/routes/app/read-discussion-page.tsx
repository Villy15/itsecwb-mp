import { PlusIcon, Trash } from 'lucide-react';
import { useState } from 'react';

import { ContentLayout } from '@/components/layouts/content-layout';
import { Button } from '@/components/ui/button';

import CreateCommentForm from '@/features/discussions/components/create-comment-form';
import UpdateDiscussion from '@/features/discussions/components/update-discussion';

function ReadDiscussionPage() {
  const [didCreateComment, setDidCreateComment] = useState(false);

  const comments = [
    {
      id: 1,
      body: 'I love sir mantua! he the best!',
      createdAt: 'June 18, 2024 5:27 PM',
      createdBy: 'Adrian Villanueva',
    },
    {
      id: 2,
      body: 'I love sir mantua! he the best!',
      createdAt: 'June 18, 2024 5:27 PM',
      createdBy: 'Adrian Villanueva',
    },
    {
      id: 3,
      body: 'I love sir mantua! he the best!',
      createdAt: 'June 18, 2024 5:27 PM',
      createdBy: 'Adrian Villanueva',
    },
    {
      id: 4,
      body: 'I love sir mantua! he the best!',
      createdAt: 'June 18, 2024 5:27 PM',
      createdBy: 'Adrian Villanueva',
    },
  ];

  return (
    <ContentLayout title="Sample Discussion 1">
      <div>June 18, 2024 5:27 PM by Adrian Villanueva</div>
      <div className="flex justify-end">
        <UpdateDiscussion />
      </div>
      <div className="mt-4">
        <h2 className="text-l font-semibold">Discussion Body</h2>
        <div className="mt-4 rounded-lg bg-white shadow">
          <div className="p-6">I love sir mantua! he the best!</div>
        </div>
      </div>
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
      {didCreateComment ? null : (
        <div className="mt-4">
          <h2 className="text-l font-semibold">Comments</h2>
          {comments.map(comment => (
            <div key={comment.id} className="mt-4 rounded-lg bg-white shadow">
              <div className="flex justify-between p-6">
                <div>
                  <div>{comment.body}</div>
                  <div className="mt-2 text-sm text-gray-500">
                    {comment.createdAt} by {comment.createdBy}
                  </div>
                </div>
                <Button size="icon" variant="destructive">
                  <Trash className="size-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </ContentLayout>
  );
}

export default ReadDiscussionPage;
