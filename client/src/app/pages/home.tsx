import { useEffect, useState } from 'react';

function HomePage() {
  const [backendMessage, setBackendMessage] = useState<string>('Loading');

  useEffect(() => {
    fetch('http://localhost:8000/api')
      .then(response => response.json())
      .then(data => setBackendMessage(data.message));
  }, []);

  return (
    <div>
      <p>{backendMessage}</p>
    </div>
  );
}

export default HomePage;
