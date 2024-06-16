import { Outlet } from 'react-router-dom';

import MainLayout from './main-layout';

const AuthLayout = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export default AuthLayout;
