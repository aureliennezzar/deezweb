import SearchItem from 'components/SearchItem/SearchItem';
import fetchJsonp from 'fetch-jsonp';
import React, { useEffect, useState } from 'react';
import "./Suggestions.scss"
const Suggestions = ({ apiSearch, title }) => {
    const [tracklist, setTrackList] = useState([]);
    useEffect(() => {
        fetch(apiSearch)
            .then(data => data.json())
            .then(data => { setTrackList(data.data); console.log(data) })
    }, [])
    return (<section className="col suggestion">
        <h2 className="title">{title} : </h2>
        <div className="sugg-list">
            {tracklist.map((track, i) => {
                return <SearchItem
                    key={i}
                    title={track.title}
                    artist={track.artist.name}
                    album={track.album.title}
                    time={track.duration}
                    artistID={track.artist.id}
                    imageSrc={track.album.cover_medium}
                    trackID={track.id}
                    albumID={track.album.id} />
            })}
        </div>
    </section>);
}

export default Suggestions;