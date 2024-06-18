import { Navigate, useLocation } from 'react-router-dom';

import { useCheckAuth } from '@/hooks/auth';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { data: auth, isLoading } = useCheckAuth();

  const location = useLocation();

  if (isLoading) {
    return null;
  }

  if (!auth) {
    return (
      <Navigate
        to={`/login?redirectTo=${encodeURIComponent(location.pathname)}`}
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoute;
