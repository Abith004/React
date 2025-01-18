import React, { useState } from 'react';

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
        <div className="add-water-container">
            <h2 className="title">Add Your Water Intake</h2>
            <form onSubmit={handleSubmit} className="form-container">
                <div className="form-group">
                    <label htmlFor="waterInput" className="form-label">Water Intake (in liters)</label>
                    <input 
                        type="number" 
                        step="0.1" 
                        id="waterInput"
                        className="form-input" 
                        value={volume} 
                        onChange={(e) => setVolume(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="dateInput" className="form-label">Date (optional)</label>
                    <input 
                        type="date" 
                        id="dateInput"
                        className="form-input" 
                        value={date} 
                        onChange={(e) => setDate(e.target.value)} 
                    />
                </div>
                <button type="submit" className="submit-button">Add Water Intake</button>

                {/* Display success message if it exists */}
                {successMessage && (
                    <div className="success-message">
                        {successMessage}
                    </div>
                )}
            </form>

            {/* Internal CSS */}
            <style jsx>{`
                .add-water-container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #f4f4f9;
                    border-radius: 8px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                }

                .title {
                    text-align: center;
                    margin-bottom: 20px;
                    font-size: 24px;
                    color: #333;
                }

                .form-container {
                    background-color: #ffffff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                }

                .form-group {
                    margin-bottom: 20px;
                }

                .form-label {
                    font-size: 16px;
                    color: #555;
                    margin-bottom: 8px;
                    display: block;
                }

                .form-input {
                    width: 100%;
                    padding: 10px;
                    font-size: 14px;
                    border-radius: 4px;
                    border: 1px solid #ccc;
                    background-color: #fafafa;
                }

                .form-input:focus {
                    border-color: #007bff;
                    outline: none;
                    background-color: #fff;
                }

                .submit-button {
                    width: 100%;
                    padding: 12px;
                    background-color: #007bff;
                    color: white;
                    font-size: 16px;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }

                .submit-button:hover {
                    background-color: #0056b3;
                }

                .success-message {
                    margin-top: 20px;
                    padding: 10px;
                    background-color: #d4edda;
                    color: #155724;
                    border: 1px solid #c3e6cb;
                    border-radius: 4px;
                    text-align: center;
                    font-size: 16px;
                }
            `}</style>
        </div>
    );
};

export default AddWaterIntake;

