import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = ({ token, addToPlaylist, newPlaylistsID }) => {
    const [tracks, setTracks] = useState([]);
    const [searchKey, setSearchKey] = useState('');

    const searchTracks = async (e) => {
        e.preventDefault();
        const { data } = await axios.get('https://api.spotify.com/v1/search', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                q: `track: ${searchKey}`,
                type: 'track',
                limit: 20
            }
        })
        // console.log(data);
        setTracks(data.tracks.items);
        // console.log(tracks.forEach(track => console.log(`The track is ${track.name} and the singer is ${track.artists[0].name} `)))
        // console.log(tracks.forEach(track => console.log(track.name)))
    };

    return (
        <div>
            <form onSubmit={searchTracks}>
                <input type="text" value={searchKey} onChange={event => setSearchKey(event.target.value)} />
                <button>Search track</button>
            </form>
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
                                </ul>
                                <img className='result-part' width={'30%'} src={track.album.images[0].url} />
                            </div>
                        ) : <p>Loading...</p>
                        }
                    </div>
                ))
                }
            </div >
        </div>
    )
};

export default SearchBar;