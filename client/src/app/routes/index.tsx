import HomePage from '../pages/home';
import LoginPage from '../pages/login';
import RegisterPage from '../pages/register';
import UsersPage from '../pages/users';
import { createBrowserRouter } from 'react-router-dom';

import HomeLayout from '@/components/layouts/home-layout';

import NotFoundPage from './not-found';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <HomeLayout>
        <HomePage />
      </HomeLayout>
    ),
  },
  {
    path: '/users',
    element: (
      <HomeLayout>
        <UsersPage />
      </HomeLayout>
    ),
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
