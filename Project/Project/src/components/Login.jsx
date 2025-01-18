// src/components/Login.js

import React, { useState } from 'react';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true); 

        
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

        
        const user = existingUsers.find(user => user.username === username && user.password === password);

        setIsLoading(false); 

        if (user) {
            onLogin(user);
        } else {
            setError("Invalid username or password. Please sign up first.");
        }
    };

    return (
        <div className="container bg-light p-4 rounded shadow mt-5">
            <h2 className="text-center mb-4">Water Intake Tracker Login</h2>
            
            <form onSubmit={handleSubmit}>
                {/* Username Field */}
                <div className="form-group mb-3">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        aria-describedby="usernameHelp"
                    />
                </div>

                {/* Password Field */}
                <div className="form-group mb-3">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        aria-describedby="passwordHelp"
                    />
                </div>

                {/* Error Message */}
                {error && <div className="alert alert-danger mt-3">{error}</div>}

                {/* Submit Button */}
                <button 
                    type="submit" 
                    className="btn btn-primary w-100 mt-3" 
                    disabled={isLoading}
                >
                    {isLoading ? "Logging in..." : "Login"}
                </button>
            </form>

            {/* Sign-Up Link */}
            <p className="mt-3 text-center">
                Don't have an account? <a href="/signup">Sign up here</a>
            </p>
        </div>
    );
};

export default Login;
