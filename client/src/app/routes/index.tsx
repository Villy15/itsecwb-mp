import HomePage from '../pages/home';
import LoginPage from '../pages/login';
import RegisterPage from '../pages/register';
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
