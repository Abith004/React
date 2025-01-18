// src/components/Home.js

import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Home = ({ user }) => {
    const navigate = useNavigate();

    const handleAddWaterIntake = () => {
        navigate('/add-water-intake'); 
    };

    const handleWaterIntakeList = () => {
        navigate('/water-intake-list'); 
    };

    return (
        <Container className="mt-5"> {/* Use Container to center content */}
            <Card className="text-center border p-4 rounded shadow bg-light">
                <Card.Body>
                    <Card.Title className="display-4 text-primary mb-4">Welcome to the Water Intake Tracker!</Card.Title>
                    <Card.Text className="lead mb-4">
                        Track your daily water intake easily and effectively. Stay hydrated and monitor your progress!
                    </Card.Text>
                    
                    {user ? ( // Check if user is logged in
                        <>
                            <Button variant="primary" onClick={handleAddWaterIntake} className="me-3 mb-3">
                                Add Water Intake
                            </Button>
                            <Button variant="secondary" onClick={handleWaterIntakeList} className="mb-3">
                                View Water Intake List
                            </Button>
                        </>
                    ) : (
                        <p className="text-muted">
                            Please log in to add your water intake and view your water intake list.
                        </p>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Home;
