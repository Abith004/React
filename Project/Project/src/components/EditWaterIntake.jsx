// src/components/EditWaterIntake.js

import React, { useState } from 'react';

const EditWaterIntake = ({ waterItem, onUpdate, onClose }) => {
    const [volume, setVolume] = useState(waterItem.volume); 

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate({ ...waterItem, volume }); 
        onClose();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Water Intake (in liters)</label>
                <input 
                    type="number" 
                    step="0.1" 
                    className="form-control" 
                    value={volume} 
                    onChange={(e) => setVolume(e.target.value)} 
                    required 
                />
            </div>
            <button type="submit" className="btn btn-primary">Update Water Intake</button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
        </form>
    );
};

export default EditWaterIntake;
