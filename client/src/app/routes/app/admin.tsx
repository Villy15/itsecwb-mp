import { ContentLayout } from '@/components/layouts/content-layout';

import UsersList from '@/features/admin/users-list';

function AdminPage() {
  return (
    <ContentLayout title="Admin">
      <UsersList />
    </ContentLayout>
  );
}

export default AdminPage;
