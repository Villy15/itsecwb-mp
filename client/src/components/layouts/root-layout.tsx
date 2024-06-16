import Header from '../header';
import Sidebar from '../sidebar';
import { Outlet } from 'react-router-dom';

import MainLayout from './main-layout';

const RootLayout = () => {
  return (
    <MainLayout>
      <div className="flex min-h-screen w-full">
        <Sidebar />
        <div className="flex w-full flex-col md:ml-[220px] lg:ml-[280px]">
          <Header />

          <Outlet />
        </div>
      </div>
    </MainLayout>
  );
};

export default RootLayout;
