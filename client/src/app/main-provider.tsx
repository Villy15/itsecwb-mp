import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type AppProviderProps = {
  children: React.ReactNode;
};

// Create a client
const queryClient = new QueryClient();

const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default AppProvider;
