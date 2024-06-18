import { createBrowserRouter } from 'react-router-dom';

import AuthLayout from '@/components/layouts/auth-layout';
import RootLayout from '@/components/layouts/root-layout';

import AdminPage from '@/app/pages/admin';
import DiscussionsPage from '@/app/pages/discussions';
import HomePage from '@/app/pages/home';
import LoginPage from '@/app/pages/login';
import RegisterPage from '@/app/pages/register';
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
        element: <DiscussionsPage />,
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
