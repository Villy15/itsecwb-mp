import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';

import Header from '@/components/header';

import API_URL from '@/config';

interface AuthResponse {
  authorized: boolean;
}

async function checkAuthorization(): Promise<AuthResponse> {
  try {
    const { data } = await axios.post(`${API_URL}/api/auth/checkAuth`, null, {
      withCredentials: true,
    });

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function fetchData(): Promise<{ message: string }> {
  try {
    const { data } = await axios.get(`${API_URL}/api`, {
      withCredentials: true,
    });

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function HomePage() {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  const {
    isPending: isAuthPending,
    isError: isAuthError,
    data: authResponse,
    error: authError,
  } = useQuery({
    queryKey: ['auth'],
    queryFn: checkAuthorization,
  });

  useEffect(() => {
    if (authResponse && authResponse.authorized) {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
  }, [authResponse]);

  const {
    isPending: isDataPending,
    isError: isDataError,
    data: backendData,
    error: dataError,
  } = useQuery({
    queryKey: ['data'],
    queryFn: fetchData,
    enabled: !!isAuthorized,
  });

  if (isAuthPending || isDataPending) {
    return <p>Loading...</p>;
  }

  if (isAuthError || isDataError) {
    return <p>Error: {authError?.message || dataError?.message}</p>;
  }

  return (
    <>
      <Header isAuthorized={isAuthorized} />
      <div className="p-6">
        <p>{backendData?.message}</p>
      </div>
    </>
  );
}

export default HomePage;
