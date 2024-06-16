type MainLayoutProps = {
  children: React.ReactNode;
};
const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <main className="relative flex min-h-screen flex-col">{children}</main>
  );
};

export default MainLayout;
