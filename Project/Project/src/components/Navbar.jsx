// src/components/Navbar.js

import React from 'react';
import { Link, NavLink } from 'react-router-dom'; 
import PropTypes from 'prop-types'; 
import './Navbar.css'; 

const Navbar = ({ isLoggedIn, onLogout, username }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Water Intake Tracker</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/" end>Home</NavLink>
                        </li>
                        {!isLoggedIn && ( 
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/signup">Sign Up</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/login">Login</NavLink>
                                </li>
                            </>
                        )}
                    </ul>

                    {isLoggedIn && ( 
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <span className="navbar-text me-2">Hello, {username}</span>
                            </li>
                            <li className="nav-item">
                                <button onClick={onLogout} className="btn btn-link nav-link">Logout</button>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </nav>
    );
};


Navbar.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired,
    username: PropTypes.string,
};

export default Navbar;
