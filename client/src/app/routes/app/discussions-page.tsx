import { ContentLayout } from '@/components/layouts/content-layout';

import CreateDiscussion from '@/features/discussions/components/create-discussion';
import DiscussionsList from '@/features/discussions/components/discussions-list';

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
