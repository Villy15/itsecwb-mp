import { createBrowserRouter } from 'react-router-dom';

import AuthLayout from '@/components/layouts/auth-layout';
import RootLayout from '@/components/layouts/root-layout';

import AddDisucussionPage from './app/add-discussion-page';
import ReadDiscussionPage from './app/read-discussion-page';
import AdminPage from '@/app/routes/app/admin-page';
import HomePage from '@/app/routes/app/dashboard-page';
import DiscussionsPage from '@/app/routes/app/discussions-page';
import LoginPage from '@/app/routes/auth/login-page';
import RegisterPage from '@/app/routes/auth/register-page';
import NotFoundPage from '@/app/routes/not-found';
import ProtectedRoute from '@/app/routes/protected-route';

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <RootLayout />
      </ProtectedRoute>
    ),
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'discussions',
        children: [
          {
            path: '',
            element: <DiscussionsPage />,
          },
          {
            path: ':discussionId',
            element: <ReadDiscussionPage />,
          },
          {
            path: 'add',
            element: <AddDisucussionPage />,
          },
        ],
      },
      {
        path: 'admin',
        element: <AdminPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
