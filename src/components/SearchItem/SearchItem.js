import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { secToDigit } from 'utils/utils';
import './SearchItem.scss'
const SearchItem = ({ title, artist, album, time, imageSrc, artistID, trackID, albumID }) => {
    const [hovered, setHovered] = useState(false);
    const [isFav, setIsFav] = useState(false);
    const digit = secToDigit(time);
    const storage = window.localStorage;
    useEffect(() => {
        try {
            if (JSON.parse(storage.getItem('favTracks')).indexOf(trackID) >= 0) {
                setIsFav(true);
            }
        } catch (error) {
        }

    }, [])
    const handleFav = () => {
        if (isFav) {
            const result = JSON.parse(storage.getItem('favTracks')).filter(track => track !== trackID);
            storage.setItem("favTracks", JSON.stringify(result))
            setIsFav(false);
        } else {
            try {
                storage.setItem("favTracks", JSON.stringify([...JSON.parse(storage.getItem('favTracks')), trackID]))
            } catch (error) {
                storage.setItem("favTracks", JSON.stringify([trackID]))
            }
            setIsFav(true);
        }
    }
    return (
        <article className={`search-item ${hovered ? 'active' : ''}`} >
            <div className="image" onMouseOver={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
                <Link className="track-link" to={`/musique/${trackID}`} onClick={() => window.location.href = `/musique/${trackID}`}> <img className="cover" src={imageSrc} />
                </Link>
                <div className="actions">
                    <span onClick={handleFav} className={`hearth-btn ${isFav ? "icon-full-hearth" : "icon-empty-hearth"} action`}></span>
                </div>
                <span className="meta-time">{digit}</span>
            </div>
            <div className="infos">
                <h3 className="title">{title} <Link className="album-link" to={`/album/${albumID}`}>{album}</Link></h3>
                <p className="artist">
                    par <Link className="artist-link" to={`/artiste/${artistID}`} >{artist}</Link>
                </p>
            </div>
        </article>
    );
}

export default SearchItem;