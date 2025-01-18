import React, { useState } from 'react';

const Signup = ({ onSignup }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!username || !email || !password || !confirmPassword) {
            setError("All fields are required.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setError('');

        const newUser = { username, email, password };
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

        if (existingUsers.some(user => user.username === username)) {
            setError("Username already exists.");
            return;
        }

        if (existingUsers.some(user => user.email === email)) {
            setError("Email already exists.");
            return;
        }

        existingUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(existingUsers));

        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setSuccessMessage("Sign up successful!");

        onSignup(newUser);
    };

    return (
        <div
            className="container d-flex justify-content-center align-items-center"
            style={{ minHeight: '110vh', position: 'relative' }} 
        >
            <div
                className="card shadow-lg p-3"
                style={{
                    maxWidth: '500px', 
                    width: '100%',
                    backgroundColor: '#f8f9fa',
                    padding: '20px', 
                }}
            >
                <h2 className="text-center mb-3" style={{ color: '#3498db' }}>
                    Sign Up to AquaTracker
                </h2>
                <form onSubmit={handleSubmit}>
                    {/* Username */}
                    <div className="mb-3">
                        <label
                            htmlFor="username"
                            className="form-label"
                            style={{ color: '#3498db' }}
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            style={{ borderColor: '#3498db' }}
                        />
                    </div>

                    {/* Email */}
                    <div className="mb-3">
                        <label
                            htmlFor="email"
                            className="form-label"
                            style={{ color: '#3498db' }}
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ borderColor: '#3498db' }}
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-3">
                        <label
                            htmlFor="password"
                            className="form-label"
                            style={{ color: '#3498db' }}
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ borderColor: '#3498db' }}
                        />
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-3">
                        <label
                            htmlFor="confirmPassword"
                            className="form-label"
                            style={{ color: '#3498db' }}
                        >
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className="form-control"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            style={{ borderColor: '#3498db' }}
                        />
                    </div>

                    {/* Error and Success messages */}
                    {error && <div className="alert alert-danger mt-3">{error}</div>}
                    {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}

                    {/* Submit Button */}
                    <button type="submit" className="btn btn-primary w-100 mt-3">
                        Sign Up
                    </button>
                    <p className="text-center mt-2" style={{ textAlign: 'center' }}>
                        If you already signed up, please{' '}
                        <a href="/login">Login</a> here
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
