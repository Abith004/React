// src/components/Signup.js

import React, { useState } from 'react';

const Signup = ({ onSignup }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!username || !password || !confirmPassword) {
            setError("All fields are required.");
            return;
        }
        
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        
        setError('');

        
        const newUser = { username, password };
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
        
       
        if (existingUsers.some(user => user.username === username)) {
            setError("Username already exists.");
            return;
        }
        
        existingUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(existingUsers));

        
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setSuccessMessage("Sign up successful!");

      
        onSignup(newUser);
    };

    return (
        <div className="container bg-light justify-content-center p-4 rounded shadow">
            <h2 className="text-center mb-4">Sign Up for Water Intake Tracker</h2>
            <form onSubmit={handleSubmit}>
                {/* Username */}
                <div className="form-group mb-3">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                {/* Password */}
                <div className="form-group mb-3">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {/* Confirm Password */}
                <div className="form-group mb-3">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        className="form-control"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>

                {/* Error and Success messages */}
                {error && <div className="alert alert-danger mt-3">{error}</div>}
                {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary w-100 mt-3">
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default Signup;
