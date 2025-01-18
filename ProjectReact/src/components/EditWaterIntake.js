import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditWaterIntake = ({ waterItem, onUpdate, onClose }) => {
    const [volume, setVolume] = useState(waterItem.volume);

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate({ ...waterItem, volume });
        onClose();
    };

    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Water Intake</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Water Intake (in liters)</Form.Label>
                        <Form.Control
                            type="number"
                            step="0.1"
                            value={volume}
                            onChange={(e) => setVolume(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Update Water Intake
                    </Button>
                    <Button variant="secondary" onClick={onClose} className="ms-2">
                        Cancel
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditWaterIntake;
