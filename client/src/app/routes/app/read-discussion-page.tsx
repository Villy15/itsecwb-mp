import { ContentLayout } from '@/components/layouts/content-layout';
import ReadDiscussion from '@/features/discussions/components/read-discussion';

function ReadDiscussionPage() {
  return (
    // <ContentLayout title="Sample Discussion 1">
    <ContentLayout title="View Discussion and Comments">
      <ReadDiscussion />
    </ContentLayout>
  );
}

export default ReadDiscussionPage;
