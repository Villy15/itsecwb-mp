import { useGetDiscussions } from '../api/discussions';
import { Spinner } from '@/components/ui/spinner';

import { formatDate } from '@/utils/date-format';

const SelectedDiscussion = () => {
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
        <p className="text-lg">No discussion loaded.</p>
      </div>
    );

  return (
    <div className="mt-4">
      <h2 className="text-l font-semibold">Discussion Post</h2>

      {data.map(data => (
        <div key={data.id} className="mt-4">
          <div className="flex justify-between p-6">
            <div>
              <div style={{ fontWeight: 'bold' }}>{data.discussion_title}</div>
              <div>{data.discussion_body}</div>
              <div className="mt-2 text-sm text-gray-500">
                {formatDate(data.created_at)} by {data.author_id}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SelectedDiscussion;
