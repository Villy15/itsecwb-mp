import { ContentLayout } from '@/components/layouts/content-layout';

import DashboardContent from '@/features/dashboard/dashboard-content';

function DashboardPage() {
  return (
    <ContentLayout title="Dashboard">
      <DashboardContent />
    </ContentLayout>
  );
}

export default DashboardPage;
