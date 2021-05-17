import fetchJsonp from 'fetch-jsonp';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { secToDigit } from 'utils/utils';
import deezer from 'assets/img/deezer.png'
import './Album.scss'
const Album = () => {
    let { id } = useParams();
    const [album, setAlbum] = useState(null)
    useEffect(() => {
        fetch(`https://api.deezer.com/album/${id}`)
            .then(data => data.json())
            .then(data => { setAlbum(data); console.log(data) })
    }, [])
    return (
        <section className="page album">
            {album ?
                <>
                    <div className="album-hero">
                        <h1>{album.title} <Link className="artist-link" to={`/artiste/${album.artist.id}`}>{album.artist.name}</Link></h1>
                        <div className="album-image">
                            <img className="cover" src={album.cover_big} alt="Cover de l'album" />
                        </div>
                    </div>
                    <div className="rating"> {"★".repeat(album.rating)} <span className="rating-empty">{"★".repeat(5 - album.rating)}</span></div>
                    <ul className="tracklist col">
                        {album.tracks.data.map((track, i) => {
                            return <li key={i}> <Link className="track-link" to={`/musique/${track.id}`}>
                                <span className="index">{i + 1}.</span>{track.title}<span className="duration">
                                    {secToDigit(track.duration)}</span>
                            </Link></li>
                        })}
                    </ul>
                    <div className="deezer"> <a href={album.link} target="_blank" rel="noopener"><img className="deezer-image" src={deezer} /></a></div>
                </>
                : <>Chargement ...</>
            }
        </section>
    );
}

export default Album;