import React from 'react';
import { useState } from 'react';

const SearchResults = ({ newPlaylistsID, tracks, token }) => {
    const [newPlaylistTrack, setNewPlaylistTrack] = useState([]);

    const addToPlaylist = (track) => {
        const endpoint = `https://api.spotify.com/v1/playlists/${newPlaylistsID}/tracks`;
        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                uris: [track.uri],
            }),
        })
            .then(response => response.json())
            .then(data => {
                setNewPlaylistTrack(prevTracks => [...prevTracks, data])
                console.log('Added to playlist:', newPlaylistTrack);
            })
    };

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
                                {!newPlaylistsID == '' ? (<button onClick={() => {
                                    addToPlaylist(track);
                                }}>Add to Playlist</button>) : <button className='non-clickable-button'>Add to Playlist</button>}
                                {/* <button onClick={() => {
                                    addToPlaylist(track);
                                }}>Add to playlist</button> */}
                            </ul>
                            <img className='result-part' width={'30%'} src={track.album.images[0].url} alt='' />
                        </div>
                    ) : <p>Loading...</p>
                    }
                </div>
            ))
            }
        </div >
    )
};

export default SearchResults;