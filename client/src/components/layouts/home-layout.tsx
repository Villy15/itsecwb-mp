import Sidebar from '../sidebar';

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <div className="flex w-full flex-col md:ml-[220px] lg:ml-[280px]">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
