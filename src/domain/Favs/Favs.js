import AudioPlayer from 'components/AudioPlayer/AudioPlayer';
import SearchItem from 'components/SearchItem/SearchItem';
import fetchJsonp from 'fetch-jsonp';
import React, { useEffect, useState } from 'react';
import "./Favs.scss"
const Favs = () => {
    const [favlist, setFavlist] = useState([]);
    const [tracks, setTracks] = useState([]);
    useEffect(() => {
        try {
            JSON.parse(window.localStorage.getItem('favTracks')).forEach(track => {
                fetchJsonp(`https://api.deezer.com/track/${track}&output=jsonp`)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(json => {
                        setFavlist((oldArr) => [...oldArr, json]);
                        setTracks((oldArr) => [
                            ...oldArr,
                            {
                                artist: json.artist.name,
                                title: json.title,
                                src: json.preview
                            }])
                    })
                    .catch(function (error) { console.log(error); });
            })
        } catch (error) {
        }
    }, [])
    return (
        <section className="page favs">
            <div className="search-output col">
                {favlist.length ? <h2 className="best">Vos favoris : </h2> : <h2 className="best">Vous n'avez aucun favori.</h2>}
                {favlist.map((track, i) => {
                    return <SearchItem
                        key={i}
                        title={track.title}
                        artist={track.artist.name}
                        album={track.album.title}
                        albumID={track.album.id}
                        time={track.duration}
                        artistID={track.artist.id}
                        imageSrc={track.album.cover_medium}
                        trackID={track.id} />
                })}
            </div>
            <AudioPlayer audio={tracks} type={1} />
        </section>
    );
}

export default Favs;