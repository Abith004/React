import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = ({ isLoggedIn, onLogout, username }) => {
    return (
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#3498db', color: '#fff' }}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/" style={{ color: '#fff' }}>AquaTracker</Link>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav" 
                    aria-controls="navbarNav" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" style={{ color: '#fff' }}></span>
                    
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {!isLoggedIn && (
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/signup" style={{ color: '#fff' }}>Sign Up</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/login" style={{ color: '#fff' }}>Login</NavLink>
                                </li>
                            </>
                        )}
                        {isLoggedIn && (
                            <>
                                <li className="nav-item">
                                    <span className="navbar-text me-3" style={{ color: '#fff' }}>Welcome, {username}</span>
                                </li>
                                <li className="nav-item">
                                    <button 
                                        onClick={onLogout} 
                                        className="btn btn-link nav-link logout-button" 
                                        style={{ color: '#fff' }}
                                    >
                                       <button className='btn btn-danger'>Logout</button> 
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
