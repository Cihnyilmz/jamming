import React, { useState } from 'react';

const Playlist = ({ token }) => {
    const [playlists, setPlaylists] = useState([]);

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
    };

    return (
        <div>
            <button onClick={getPlaylist}>Your Spotify Playlists</button>
            <div className='render-container'>
                <h2>Your Spotify Playlist's</h2>
                {playlists.map(playlist => (
                    <div key={playlist.id} className='playlist-result'>
                        {playlist.name.length ? (
                            <ul className='result-part'>
                                <li >{playlist.name}</li>
                            </ul>
                        ) : <p>Loading...</p>
                        }
                    </div>
                ))}
            </div>
        </div>
    )
};

export default Playlist;