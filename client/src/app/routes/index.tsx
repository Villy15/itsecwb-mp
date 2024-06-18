import { createBrowserRouter } from 'react-router-dom';

import AuthLayout from '@/components/layouts/auth-layout';
import RootLayout from '@/components/layouts/root-layout';

import AdminPage from '@/app/routes/app/admin';
import DiscussionsPage from '@/app/routes/app/discussions';
import HomePage from '@/app/routes/app/home';
import LoginPage from '@/app/routes/auth/login';
import RegisterPage from '@/app/routes/auth/register';
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
            path: 'add',
            element: <div>Add Discussion</div>,
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
