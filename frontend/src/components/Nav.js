import React, { useEffect, useState } from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Nav = () => {
        const [authenticated, setAuthenticated] = useState(false);

        //will run once when the page has loaded
        useEffect(() => {

                const checkAuth = async () => {
                        const response = await axios.get('/isAuthd')
                        console.log(response)
                        setAuthenticated(response.data.authenticated);
        
                }

                checkAuth();
        }, []);

        if(authenticated){
                return(
                        <nav>
                        <ul>
                                <li>
                                        {/* link allows us to move between pages without losing states / reloading page */}
                                        <Link to="/" >Home</Link>
                                </li>
                                <li>
                                        <Link to="/quizsetup" >Quiz Setup</Link>
                                </li>
                                <li>
                                        <Link to="/leaderboard">Leaderboard</Link>
                                </li>
                                <li>
                                        <Link to="/logout">Logout</Link>
                                </li>
                        </ul>
                </nav>
                )
        }else{

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
                                        <Link to="/quizsetup" >Quiz Setup</Link>
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
        }
};

export default Nav;