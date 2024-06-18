import { ContentLayout } from '@/components/layouts/content-layout';

import AddDisucssionForm from '@/features/discussions/components/add-discussion-form';

function AddDisucussionPage() {
  return (
    <ContentLayout title="Add Discussion">
      <div className="mt-4">
        <AddDisucssionForm />
      </div>
    </ContentLayout>
  );
}

export default AddDisucussionPage;
