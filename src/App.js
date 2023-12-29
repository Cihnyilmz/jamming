import './App.css';
import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import Playlist from './Playlist';
import Tracklist from './Tracklist';

function App() {
  const CLIENT_ID = "8e4f4998d37544d896788cd73160b147";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState('');
  const [searchKey, setSearchKey] = useState('');
  const [tracks, setTracks] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistTrack, setNewPlaylistTrack] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [newPlaylistsID, setNewPlaylistsID] = useState('');

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");
    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
      window.location.hash = ""
      window.localStorage.setItem("token", token)
    }
    setToken(token);
    // console.log(token)
  }, []);

  const logout = () => {
    setToken('');
    setSearchKey('');
    setTracks([]);
    setPlaylists([]);
    setNewPlaylistTrack([]);
    setNewPlaylistName('');
    setNewPlaylistsID('');
    window.localStorage.removeItem('token');
  };

  return (
    <div className="App">
      <div className='Form'>
        <h1>Spotify App based on React and Spotify API</h1>
        <div>{!token ?
          <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&scope=playlist-modify-private&redirect_uri=${REDIRECT_URI}`}>Login to Spotify</a>
          : <button onClick={logout} className='logout'>Logout</button>}
        </div>
        <div>
          {token ? (
            <div>
              <Tracklist token={token} />
              <SearchBar token={token} newPlaylistsID={newPlaylistsID} />
              <Playlist token={token} />
            </div>
          ) : (
            <p>Loading...</p>
          )}</div>
      </div>
    </div>
  );
}

export default App;
