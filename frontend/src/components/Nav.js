import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav>
            <ul>
                <li>
                    {/* link allows us to move between pages without losing states / reloading page */}
                    <Link to="/" >Home</Link>
            </li>
            <li>
                    <Link to="/login" >Login</Link>
            </li>
                <li>
                    <Link to="/register">Register</Link>
            </li>
            <li>
                    <Link to="/leaderboard">Leaderboard</Link>
            </li>
            </ul>
        </nav>
  );
};

export default Nav;