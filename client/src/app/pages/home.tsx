import { useEffect, useState } from 'react';

// import { useNavigate } from 'react-router-dom';

function HomePage() {
  console.log('Rendering HomePage');
  const [backendMessage, setBackendMessage] = useState<string>('Loading');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api', {
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch message');
        }

        console.log(response);

        const data = await response.json();

        console.log(data);
      } catch (error) {
        console.error('Failed to fetch message:', error);
        setBackendMessage('Failed to fetch message');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <p>{backendMessage}</p>
    </div>
  );
}

export default HomePage;
