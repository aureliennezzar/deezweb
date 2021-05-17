import SearchItem from 'components/SearchItem/SearchItem';
import Tabs from 'components/Tabs/Tabs';
import { FilterContext } from 'context/FilterContext';
import fetchJsonp from 'fetch-jsonp';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router';
import { useQuery } from 'utils/hooks';
import './Home.scss'
const Home = () => {
    const [searchInput, setSearchInput,] = useState('')
    const [searchData, setSearchData] = useState([])
    const [isEmpty, setIsEmpty] = useState(false)
    const { filter } = useContext(FilterContext);
    let query = useQuery();
    const path = useLocation().pathname.split("/").join('')
    const history = useHistory()
    const queryname = "recherche"
    useEffect(() => {
        handleSubmit("", searchInput);
    }, [filter])
    useEffect(() => {
        if (query.get(queryname)) {
            setSearchInput(query.get(queryname));
            handleSubmit("", query.get(queryname));
        }
    }, [])
    const handleSubmit = (e, data) => {
        try {
            e.preventDefault()
        } catch (error) {
        }
        if (!data.length) return
        fetchJsonp(`https://api.deezer.com/search?q=${data}&order=${filter}&output=jsonp`)
            .then(function (response) {
                return response.json();
            })
            .then(json => {
                setSearchData(json.data);
                history.push(`/${path}?${queryname}=${data}`)
                !json.data.length ? setIsEmpty(true) : setIsEmpty(false);
                console.log(json.data);
            })
            .catch(function (error) { console.log(error); });
    }
    const handleInput = (e) => {
        setSearchInput(e.currentTarget.value);
    }
    return (
        <section className="page home">
            <form className="actions col" onSubmit={(e) => handleSubmit(e, searchInput)}>
                <input type="text" placeholder="Rechercher..." onInput={handleInput} value={searchInput} />
            </form>
            <Tabs />
            <div className="search-output col">
                {isEmpty ? <h2 className="error">Aucun resultat trouvé</h2> : ""}
                {searchData.length ? <h2 className="best">Meilleur resultats : </h2> : ""}
                {searchData.map((track, i) => {
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
        </section>
    );
}

export default Home;