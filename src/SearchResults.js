import React from 'react';

const SearchResults = ({ newPlaylistsID, addToPlaylist, tracks }) => {
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

export default SearchResults;