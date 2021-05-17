import SearchItem from 'components/SearchItem/SearchItem';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './NotFound.scss'

const NotFound = () => {
    const [title, setTitle] = useState("")
    const handleBing = ()=>{
        console.log("01001100 01100101 00100000 01101101 01101111 01101110 01100100 01100101 00100000 01100101 01110011 01110100 00100000 01110101 01101110 00100000 01110011 01110000 01100101 01100011 01110100 01100001 01100011 01101100 01100101 00101100 00100000 01101100 01100001 00100000 01110110 01101001 01100101 00100000 01110101 01101110 00100000 01110000 01100001 01110011 01110011 01100001 01100111 01100101 00100000 00111011 00100000 01110100 01110101 00100000 01100101 01110011 00100000 01110110 01100101 01101110 01110101 00101100 00100000 01110100 01110101 00100000 01100001 01110011 00100000 01110110 01110101 00101100 00100000 01110000 01110101 01101001 01110011 00100000 01110100 01110101 00100000 01110100 00100111 01100101 01110011 00100000 01100101 01101110 00100000 01100001 01101100 01101100 11000011 10101001 00101110 00100000");
    }
    useEffect(() => {
        const arr = [
            "Mince ! Vous n'êtes pas au bonne endroit !",
            "Mais comment tu as fais pour arriver la ?",
            "404 Error ¯\\_(ツ)_/¯",
            "Il n'y a rien a voir ici !",
            "L'arrière boutique est fermée !",
            "Il n'y a rien a ecouter ici 🎧",
            <><SearchItem title={"????"} artist={"????"} album={"????"} time={"????"} imageSrc={"https://i.ytimg.com/vi/RHGWrQq6iTI/hqdefault.jpg"} artistID={288166} trackID={166878002} albumID={15579230}/></>,
            "Chargement... (404 secondes restantes)",
            "Cette page est introuvable",
            <>Crée par <a href="https://www.aurelien-nezzar.com" target="_blank" rel="noopener">Aurélien Nezzar</a></> ,
            <>Tu es perdu ? C'est pas grave clique <Link to="/accueil">ici</Link></> 
        ]
        const te = Math.floor(Math.random() * (20 - 0 + 1)) + 0;
        const te2 = Math.floor(Math.random() * (20 - 0 + 1)) + 0;
        console.log(te,te2);
        if(te === te2){
            setTitle(<>
            <h1>vous avez trouvé la page secrete de Deez'web</h1>
            <button onClick={handleBing}>???</button>
            </>)
        } else {
            const i = Math.floor(Math.random() * arr.length);
            setTitle(<h1 className="title">{arr[i]}</h1>)
        }
    }, [])
    return (
        <section className="page notfound">
            <span className="icon-volume"></span>
            {title}
        </section>
    );
}

export default NotFound;