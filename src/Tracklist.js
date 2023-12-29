import React, { useState } from 'react';

const Tracklist = ({ token }) => {
    const [newPlaylistName, setNewPlaylistName] = useState('');
    const [newPlaylistsID, setNewPlaylistsID] = useState('');

    const createNewPlaylist = () => {
        const url = 'https://api.spotify.com/v1/me/playlists';

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({
                'name': newPlaylistName,
                'description': "Via API created playlist",
                'public': false
            })
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => {
                setNewPlaylistsID(data.id);  // Set the playlist ID directly
                console.log('Playlist ID created:', data.id);
            })
    };

    return (
        <form onSubmit={createNewPlaylist}>
            <input type='text' value={newPlaylistName} onChange={event => setNewPlaylistName(event.target.value)} placeholder="Enter your new playlist's name" />
            {newPlaylistsID === '' ? <button>Create your playlist</button> : <button className='non-clickable-button'>Create your playlist</button>}
        </form>
    )
};

export default Tracklist;