import { useCallback, useEffect, useState } from 'react';

// import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [backendMessage, setBackendMessage] = useState<string>('Loading');

  // const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:8000/api', {
        credentials: 'include',
      });
      const data = await response.json();

      // // if Unauthorized
      // if (response.status === 401) {
      //   return navigate('/login');
      // }

      setBackendMessage(data.message);
    } catch (error) {
      console.error('Failed to fetch message:', error);
      setBackendMessage('Failed to fetch message');
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      <p>{backendMessage}</p>
    </div>
  );
}

export default HomePage;
