import React, { useState } from 'react';
import {  Button } from 'react-bootstrap';

const AddWaterIntake = ({ onAddWater }) => {
    const [volume, setVolume] = useState(''); 
    const [date, setDate] = useState(''); 
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const currentDate = date ? new Date(date) : new Date();
        const timestamp = currentDate.toISOString();

        onAddWater({ volume: parseFloat(volume), date: timestamp });
        
        setVolume(''); 
        setDate(''); 
        setSuccessMessage('Water intake added successfully!'); 

        setTimeout(() => {
            setSuccessMessage('');
        }, 3000);
    };

    return (
        <div className="add-water-container" style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', backgroundColor: '#f4f4f9', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
            <h2 className="title" style={{ textAlign: 'center', marginBottom: '20px', fontSize: '24px', color: '#333' }}>Add Your Water Intake</h2>
            <form onSubmit={handleSubmit} className="form-container" style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
                <div className="form-group" style={{ marginBottom: '20px' }}>
                    <label htmlFor="waterInput" className="form-label" style={{ fontSize: '16px', color: '#555', marginBottom: '8px', display: 'block' }}>Water Intake (in liters)</label>
                    <input 
                        type="number" 
                        step="0.1" 
                        id="waterInput"
                        className="form-input" 
                        value={volume} 
                        onChange={(e) => setVolume(e.target.value)} 
                        required 
                        style={{ width: '100%', padding: '10px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#fafafa' }}
                    />
                </div>
               
                <button type="submit" className="submit-button" style={{ width: '100%', padding: '12px', backgroundColor: '#007bff', color: 'white', fontSize: '16px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>ADD</button>

                {successMessage && (
                    <div className="success-message" style={{ marginTop: '20px', padding: '10px', backgroundColor: '#d4edda', color: '#155724', border: '1px solid #c3e6cb', borderRadius: '4px', textAlign: 'center', fontSize: '16px' }}>
                        {successMessage}
                    </div>
                )}
            </form>
            <br></br>
            <div className="d-flex justify-content-between mb-3">
    <Button href="/water-intake-list" variant="secondary">
        View Water Intake List
    </Button>
    <Button href="/" variant="secondary">
        Home
    </Button>
    
</div>


        </div>
    );
};

export default AddWaterIntake;
