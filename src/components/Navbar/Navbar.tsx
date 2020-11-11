import React from 'react';

import { NavLink } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <NavLink
                exact
                activeClassName="navbar__link--active"
                className="navbar__link"
                to="/"
            >
                List
            </NavLink>
            <NavLink
                activeClassName="navbar__link--active"
                className="navbar__link"
                to="/new"
            >
                New
            </NavLink>
        </nav>
    );
}

export default Navbar;
