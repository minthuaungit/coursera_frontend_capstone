import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ cssName }) => {
    return (
        <nav className={cssName}>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/">Menu</Link>
            <Link to="/reservation">Reservation</Link>
            <Link to="/">Order Online</Link>
            <Link to="/">Login</Link>
        </nav>
    );
};

export default Nav;