import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [token, setToken] = useState('');

  useEffect(() => {
    const clientId = "8e4f4998d37544d896788cd73160b147";
    const clientSecret = "d6f5d1f2b50e46adba03b7aa756243c5";

    fetch(
      "https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response data
        console.log(data);
        setToken(data.access_token);
        console.log(token);
      })
      .catch(error => {
        // Handle errors
        console.error('Error:', error);
      });
  }, []);

  return (
    <div className="App">
      <div>
        <h1>Spotify React</h1>
        <h2>Token Data: {token}</h2>
      </div>
    </div>
  );
}

export default App;
