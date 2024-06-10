import { RouterProvider } from 'react-router-dom';

import MainLayout from '@/components/layouts/main-layout';
import { TailwindIndicator } from '@/components/tailwind-indicator';

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
        <TailwindIndicator />
      </MainLayout>
    </AppProvider>
  );
}

export default App;
