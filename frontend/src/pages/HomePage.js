import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HomePage() {
  const [apod, setApod] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/apod')
      .then(response => {
        setApod(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching APOD data');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Astronomy Picture of the Day</h1>
      {apod && (
        <div>
          <h2>{apod.title}</h2>
          <img 
            src={apod.url} 
            alt={apod.title} 
            style={{ width: '100%', maxWidth: '800px', borderRadius: '10px' }} 
          />
          <p>{apod.explanation}</p>
        </div>
      )}
    </div>
  );
}

export default HomePage;