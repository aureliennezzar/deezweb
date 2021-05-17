import { FilterContext } from 'context/FilterContext';
import React, { useContext, useEffect } from 'react';
import "./Tabs.scss"
const Tabs = () => {
    const { filter, setFilter } = useContext(FilterContext);
    useEffect(() => {
        console.log(filter);
    }, [filter])
    const filtersLabels = [
        { label: "Titres", id: "TRACK_ASC" },
        { label: "Albums", id: "ALBUM_ASC" },
        { label: "Artistes", id: "ARTIST_ASC" },
        { label: "Popularité", id: "RATING_ASC" },
        { label: "Rang", id: "RANKING" }
    ]
    const handleFilter = (labelId, e) => {
        console.log(labelId);
        // document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
        // e.currentTarget.classList.add('active');
        setFilter(labelId);
    }
    return (
        <div className="tabs col">
            <ul>
                {filtersLabels.map((fil, i) => {
                    return <li key={i} className={`tab${fil.id === filter ? " active" : ""}`} onClick={(e) => { handleFilter(fil.id, e) }}>{fil.label}</li>
                })}
            </ul>
        </div>
    );
}

export default Tabs;