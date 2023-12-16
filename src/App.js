import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    setToken("")
    window.localStorage.removeItem("token")
  };

  const searchTracks = async (e) => {
    e.preventDefault();
    const { data } = await axios.get('https://api.spotify.com/v1/search', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: `track: ${searchKey}`,
        type: 'track',
        limit: 6
      }
    })
    // console.log(data);
    setTracks(data.tracks.items);
    // console.log(tracks.forEach(track => console.log(`The track is ${track.name} and the singer is ${track.artists[0].name} `)))
    console.log(tracks.forEach(track => console.log(track.name)))
  };

  const addToPlaylist = (track) => {
    setNewPlaylistTrack((prevTracks) => [...prevTracks, track]);
    console.log(newPlaylistTrack.map(track => track.name));
  };

  const SearchResults = () => {
    return (
      <div className='render-container'>
        {tracks.map(track => (
          <div key={track.id} className='search-results'>
            {track.artists.length ? (
              <div className='result-main'>
                <ul className='result-part'>
                  {/* <li>ID: {track.id}</li> */}
                  <li>{track.artists[0].name} - {track.name} </li>
                  <li>Album: {track.album.name}</li>
                  <button onClick={() => {
                    addToPlaylist(track);
                  }}>Add to Playlist</button>
                </ul>
                <img className='result-part' width={'30%'} src={track.album.images[0].url} />
              </div>
            ) : <p>Loading...</p>
            }
          </div>
        ))
        }
      </div >
    )
  };

  const getPlaylist = () => {
    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        setPlaylists(data.items);
        // console.log(playlists.forEach(playlist => console.log(playlist.name))) => due to not async function it is not
        // console.log(data.items);
      })
      .catch(error => {
        console.error('Error fetching playlists:', error);
      });
  };

  const renderPlaylist = () => {
    return (
      <div>
        {playlists.map(playlist => (
          <div key={playlist.id} className='playlist-result'>
            {playlist.name.length ? (
              <ul>
                <li>{playlist.name}</li>
              </ul>
            ) : <p>Loading...</p>
            }
          </div>
        ))}
      </div>
    )
  };

  return (
    <div className="App">
      <div className='Form'>
        <h1>Spotify React</h1>
        <div>{!token ?
          <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
            to Spotify</a>
          : <button onClick={logout} className='logout'>Logout</button>}</div>
        <div>{token ? (
          <div>
            <form onSubmit={searchTracks}>
              <input type="text" value={searchKey} onChange={event => setSearchKey(event.target.value)} />
              <button>Search track</button>
            </form>
            <form>
              <button onClick={getPlaylist}>Your Spotify Playlists</button>
            </form>
          </div>
        ) : (
          <p>Loading...</p>
        )}</div>
      </div>
      <div className='tables'>
        <div className='right-table table'>
          <h2>Your Spotify Playlist's</h2>
          {playlists.length > 0 && renderPlaylist()}
        </div>
        <div className='middle-table table'>
          <SearchResults />
        </div>
        <div className='left-table table'>
        </div>
      </div>
    </div>
  );
}

export default App;
