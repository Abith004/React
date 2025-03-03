
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
                    <Card.Title className="display-4 text-primary mb-4"><h1>Welcome to Aqua Tracker!</h1></Card.Title>
                    <Card.Text className="lead mb-4" style={{color:"black"}}>
                    Easily track your daily water intake and stay on top of your hydration goals. Monitor your progress effectively!
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
                           Please log in to record your water intake and view your hydration history.
                        </p>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Home;
