import { Link } from 'react-router-dom';

import MainLayout from '@/components/layouts/main-layout';
import { Button } from '@/components/ui/button';

function NotFoundPage() {
  return (
    <MainLayout>
      <div className="flex grow flex-col items-center justify-center bg-gray-100 px-4 dark:bg-gray-950">
        <div className="container mx-auto max-w-md space-y-6 text-center">
          <div className="text-9xl font-bold text-gray-900 dark:text-gray-50">
            404
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Oops, the page you were looking for doesn&apos;t exist.
            </h1>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              We couldn&apos;t find the page you were looking for. Please check
              the URL or return to the homepage.
            </p>
          </div>
          <Link className="flex items-center justify-center" to="/">
            <Button>Return to Homepage</Button>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}

export default NotFoundPage;
