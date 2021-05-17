import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import deezer from 'assets/img/deezer.png'
import './Artist.scss'
import Suggestions from 'components/Suggestions/Suggestions';
const Artist = () => {
    let { id } = useParams();
    const [artist, setArtist] = useState(null)
    useEffect(() => {
        fetch(`https://api.deezer.com/artist/${id}`)
            .then(data => data.json())
            .then(data => { setArtist(data); console.log(data) })
    }, [])
    return (
        <section className="page artist">
            {artist ?
                <>
                    <div className="artist-wrapper col">
                        <div className="artist-image">
                            <img className="cover" src={artist.picture_medium} />
                        </div>
                        <div className="infos">
                            <h1 className="artist-name">{artist.name}</h1>
                            <p>{artist.nb_fan} fans</p>
                            <p>{artist.nb_album} albums</p>
                            <a href={artist.link} target="_blank" rel="noopener"><img className="deezer-image" src={deezer} /></a>
                        </div>
                    </div>
                    <Suggestions apiSearch={artist.tracklist} title={`Decouvrir ${artist.name}`} />
                </>
                : <>Chargement ...</>
            }
        </section>
    );
}

export default Artist;