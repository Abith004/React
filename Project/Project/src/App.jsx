

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import RouterComponent from './router'; 

const App = () => {
    const [user, setUser] = useState(() => {
        const savedUser = JSON.parse(localStorage.getItem('user'));
        return savedUser || null;
    });

    const [waterIntakes, setWaterIntakes] = useState(() => {
        const savedWaterIntakes = JSON.parse(localStorage.getItem('waterIntakes'));
        return Array.isArray(savedWaterIntakes) ? savedWaterIntakes : []; 
    });

    // Effect to manage user state in local storage
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    // Effect to manage water intakes state in local storage
    useEffect(() => {
        localStorage.setItem('waterIntakes', JSON.stringify(waterIntakes));
    }, [waterIntakes]);

    const handleSignup = (newUser) => {
        setUser(newUser);
        window.location.href = '/'; // Redirect to home after signup
    };

    const handleLogin = (loggedInUser) => {
        setUser(loggedInUser);
        window.location.href = '/'; // Redirect to home after login
    };

    const handleLogout = () => {
        setUser(null);
        window.location.href = '/login'; // Redirect to login page after logout
    };

    const addWaterIntake = (waterEntry) => {
        if (!user) return;

        const today = new Date();
        const dateString = today.toLocaleDateString();
        const timeString = today.toLocaleTimeString(); // Get current time as a string
        const userWaterIntakes = waterIntakes.filter(w => w.username === user.username); // Get water intakes for the logged-in user
        
        // Check if a water intake entry for today already exists
        const existingEntryIndex = userWaterIntakes.findIndex(w => w.date === dateString);

        if (existingEntryIndex === -1) {
            // Add new water intake entry with date and time
            setWaterIntakes(prevWaterIntakes => [
                ...prevWaterIntakes,
                { ...waterEntry, date: dateString, time: timeString, username: user.username } // Include date and time
            ]);
        } else {
            alert("You can only add one water intake entry per day.");
        }
    };

    const editWaterIntake = (updatedWaterIntake) => {
        if (!user) return;

        setWaterIntakes(prevWaterIntakes => 
            prevWaterIntakes.map(w =>
                w.date === updatedWaterIntake.date && w.username === user.username ? updatedWaterIntake : w
            )
        );
    };

    const deleteWaterIntake = (waterToDelete) => {
        if (!user) return;

        setWaterIntakes(prevWaterIntakes => 
            prevWaterIntakes.filter(w =>
                !(w.date === waterToDelete.date && w.volume === waterToDelete.volume && w.username === user.username)
            )
        );
    };

    return (
        <div>
            <Navbar 
                isLoggedIn={!!user} 
                onLogout={handleLogout} 
                username={user ? user.username : ''} 
            />
            <div className="container mt-4">
                <RouterComponent 
                    user={user} 
                    onSignup={handleSignup} 
                    onLogin={handleLogin} 
                    onAddWater={addWaterIntake}
                    waterIntakes={waterIntakes.filter(w => w.username === user?.username)} // Filter water intakes by username
                    onEdit={editWaterIntake}
                    onDelete={deleteWaterIntake}
                />
            </div>
        </div>
    );
};

export default App;
