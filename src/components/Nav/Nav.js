import React from 'react';
import brand from 'assets/img/brand.svg'
import "./Nav.scss"
import { Link } from 'react-router-dom';
const Nav = () => {
    return (
        <nav className="nav col">
            <Link to="/accueil"><img className="brand" src={brand} /></Link>

            <ul className="menu">
                <li className="menu-item"><Link to="/favoris">Favoris</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Nav;