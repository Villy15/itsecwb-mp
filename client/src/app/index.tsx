import { RouterProvider } from 'react-router-dom';

import MainLayout from '@/components/layouts/main-layout';

import AppProvider from './main-provider';
import { router } from './routes';

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

function App() {
  return (
    <AppProvider>
      <MainLayout>
        <AppRouter />
      </MainLayout>
    </AppProvider>
  );
}

export default App;
