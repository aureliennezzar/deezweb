import AudioPlayer from 'components/AudioPlayer/AudioPlayer';
import fetchJsonp from 'fetch-jsonp';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import deezer from 'assets/img/deezer.png'
import './TrackPage.scss'
import Suggestions from 'components/Suggestions/Suggestions';
const TrackPage = () => {
    let { id } = useParams();
    id = parseInt(id)
    const [track, setTrack] = useState(null)
    const [isFav, setIsFav] = useState(false);
    const storage = window.localStorage;
    useEffect(() => {
        try {
            if (JSON.parse(storage.getItem('favTracks')).indexOf(id) >= 0) {
                setIsFav(true);
            }
        } catch (error) {
        }
        fetch(`https://api.deezer.com/track/${id}`)
            .then(data => data.json())
            .then(data => { setTrack(data); console.log(data) })
    }, [])

    useEffect(()=>{
    },[id])
    const handleFav = () => {
        if (isFav) {
            const result = JSON.parse(storage.getItem('favTracks')).filter(song => song !== id);
            storage.setItem("favTracks", JSON.stringify(result))
            setIsFav(false);
        } else {
            try {
                storage.setItem("favTracks", JSON.stringify([...JSON.parse(storage.getItem('favTracks')), id]))
            } catch (error) {
                storage.setItem("favTracks", JSON.stringify([id]))
            }
            setIsFav(true);
        }
    }
    return (
        <section className="page trackpage">
            {track ?
                <>
                    <div className="trackinfos col">
                        <div className="image">
                            <img className="cover" src={track.album.cover_medium} />
                            <div className="actions">
                                <span onClick={handleFav} className={`hearth-btn ${isFav ? "icon-full-hearth" : "icon-empty-hearth"} action`}></span>
                            </div>
                        </div>
                        <div className="infos">
                            <h1 className="title">{track.title} <Link className="album-link" to={`/album/${track.album.id}`}>{track.album.title}</Link></h1>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <p className="artist">
                                    <img src={track.artist.picture_small} className="cover" /><Link className="artist-link" to={`/artiste/${track.artist.id}`}>{track.artist.name}</Link>
                                </p>
                                <a href={track.link} target="_blank" rel="noopener"><img className="deezer-image" src={deezer} /></a>
                            </div>
                            <p className="release">{track.release_date}</p>
                            <AudioPlayer audio={track.preview} />
                        </div>
                    </div>
                    <Suggestions apiSearch={track.artist.tracklist} title={"Du même artiste"}/>
                </>
                : <>Chargement ...</>
            }
        </section>
    );
}

export default TrackPage;