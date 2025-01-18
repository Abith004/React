import React, { useState } from 'react';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');  // Renamed from 'username' to 'email'
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
        const user = existingUsers.find(
            (user) => user.email === email && user.password === password  // Check email instead of username
        );

        setIsLoading(false);

        if (user) {
            onLogin(user);
        } else {
            setError("Invalid email or password. Please sign up first.");
        }
    };

    return (
        <div
            className="container d-flex justify-content-center align-items-start"
            style={{ minHeight: '100vh', position: 'relative' }}
        >
            <div
                className="card shadow-lg p-4"
                style={{
                    maxWidth: '500px', // Adjusted width
                    width: '100%',
                    position: 'absolute',
                    top: '20px',
                    backgroundColor: '#f8f9fa',
                }}
            >
                <h2 className="text-center mb-4" style={{ color: '#3498db' }}>
                    Welcome Back!
                </h2>
                <p className="text-center mb-4" style={{ color: '#555' }}>
                    Log in to Aquatracker to track your hydration goals.
                </p>

                <form onSubmit={handleSubmit}>
                    {/* Email Field */}
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
                            value={email}  // Using 'email' here
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ borderColor: '#3498db' }}
                        />
                    </div>

                    {/* Password Field */}
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

                    {/* Error Message */}
                    {error && <div className="alert alert-danger">{error}</div>}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                {/* Sign-Up Link */}
                <p className="text-center mt-3" style={{ color: 'black' }}>
                    Don't have an account?{' '}
                    <a href="/signup" style={{ color: '' }}>
                        Sign up
                    </a>{' '}
                    here!
                </p>
            </div>
        </div>
    );
};

export default Login;
