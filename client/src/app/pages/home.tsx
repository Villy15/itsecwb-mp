import { useEffect, useState } from 'react';

import Header from '@/components/header';

import API_URL from '@/config';

// import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  const [backendMessage, setBackendMessage] = useState<string>('Loading');

  useEffect(() => {
    async function checkAuthorization() {
      try {
        const response = await fetch(`${API_URL}/api/auth/checkAuth`, {
          credentials: 'include',
          method: 'POST',
        });
        const data = await response.json();
        if (response.status === 200 && data.authorized) {
          setIsAuthorized(true);
          fetchData();
        } else {
          setIsAuthorized(false);
        }
      } catch (error) {
        console.error('Failed to check authorization:', error);
      }
    }

    checkAuthorization();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL}/api`, {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch message');
      }

      const data = await response.json();
      setBackendMessage(data.message);
    } catch (error) {
      console.error('Failed to fetch message:', error);
      setBackendMessage('Failed to fetch message');
    }
  };

  return (
    <>
      <Header isAuthorized={isAuthorized} />
      <div className="p-6">
        <p>{backendMessage}</p>
      </div>
    </>
  );
}

export default HomePage;
