import React, { useState } from 'react';
import axios from 'axios';
import SearchResults from './SearchResults';

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
            <SearchResults newPlaylistsID={newPlaylistsID} addToPlaylist={addToPlaylist} tracks={tracks} />
        </div>
    )
};

export default SearchBar;