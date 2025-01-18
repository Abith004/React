// src/router.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import AddWaterIntake from './components/AddWaterIntake'; // Updated import
import WaterIntakeList from './components/WaterIntakeList'; // Updated import
import Home from './components/Home'; // Import Home component

const RouterComponent = ({ user, onSignup, onLogin, onAddWater, waterIntakes, onEdit, onDelete }) => {
    return (
        <Routes>
            <Route path="/" element={<Home user={user} />} /> {/* Pass user prop to Home */}
            {!user && (
                <>
                    <Route path="/signup" element={<Signup onSignup={onSignup} />} />
                    <Route path="/login" element={<Login onLogin={onLogin} />} />
                </>
            )}
            {user && (
                <>
                    <Route path="/add-water-intake" element={<AddWaterIntake onAddWater={onAddWater} />} /> {/* Updated route */}
                    <Route path="/water-intake-list" element={<WaterIntakeList waterIntakes={waterIntakes} onEdit={onEdit} onDelete={onDelete} />} /> {/* Pass onEdit and onDelete */}
                </>
            )}
        </Routes>
    );
};

export default RouterComponent;
