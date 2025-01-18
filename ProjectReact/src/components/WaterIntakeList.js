import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import EditWaterIntake from './EditWaterIntake';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { Button, Modal } from 'react-bootstrap';

const WaterIntakeList = ({ waterIntakes, onEdit, onDelete }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 1;

    const [showEdit, setShowEdit] = useState(false);
    const [selectedWaterIntake, setSelectedWaterIntake] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [waterIntakeToDelete, setWaterIntakeToDelete] = useState(null);

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [totalStartDateIntake, setTotalStartDateIntake] = useState(0);
    const [totalEndDateIntake, setTotalEndDateIntake] = useState(0);
    const [differenceInIntake, setDifferenceInIntake] = useState(null);

    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    // Filter water intakes based on date range
    const filteredWaterIntakes = waterIntakes.filter((intakeItem) => {
        const intakeDate = new Date(intakeItem.date);

        if (startDate && endDate) {
            return intakeDate >= new Date(startDate) && intakeDate <= new Date(endDate);
        }

        // If no date range is selected, show all water intakes
        return true;
    });

    const totalPages = Math.ceil(filteredWaterIntakes.length / itemsPerPage);
    const indexOfLastIntake = currentPage * itemsPerPage;
    const indexOfFirstIntake = indexOfLastIntake - itemsPerPage;
    const currentWaterIntakes = filteredWaterIntakes.slice(indexOfFirstIntake, indexOfLastIntake);

    useEffect(() => {
        setCurrentPage(1);
    }, [waterIntakes]);

    const calculateDifferenceInWaterIntake = () => {
        if (!startDate || !endDate) {
            alert("Please select both start and end dates.");
            return;
        }

        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);

        const startDateIntakes = waterIntakes.filter(intakeItem => {
            const intakeDate = new Date(intakeItem.date);
            return intakeDate.toLocaleDateString() === startDateObj.toLocaleDateString();
        });

        const totalStart = startDateIntakes.reduce((sum, item) => sum + item.volume, 0);
        setTotalStartDateIntake(totalStart);

        const endDateIntakes = waterIntakes.filter(intakeItem => {
            const intakeDate = new Date(intakeItem.date);
            return intakeDate.toLocaleDateString() === endDateObj.toLocaleDateString();
        });

        const totalEnd = endDateIntakes.reduce((sum, item) => sum + item.volume, 0);
        setTotalEndDateIntake(totalEnd);

        const difference = totalEnd - totalStart;
        setDifferenceInIntake(difference);

        handleShowModal();  // Show the modal with the difference details
    };

    const handleEditClick = (intakeItem) => {
        setSelectedWaterIntake(intakeItem);
        setShowEdit(true);
    };

    const handleUpdate = (updatedWaterIntake) => {
        onEdit(updatedWaterIntake);
        closeEditModal();
    };

    const handleDeleteClick = (intakeItem) => {
        setWaterIntakeToDelete(intakeItem);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = () => {
        onDelete(waterIntakeToDelete);
        closeDeleteModal();
    };

    const closeEditModal = () => {
        setShowEdit(false);
        setSelectedWaterIntake(null);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setWaterIntakeToDelete(null);
    };

    const isDateRangeSelected = startDate || endDate;

    return (
        <div className="water-intake-list-container">
            <div className="card border p-4 rounded shadow bg-light">
                <div className="card-body">
                    <h5 className="card-title text-center mb-4">Track your Water Intake</h5>

                    {/* Pagination Controls */}
                    <div className="pagination-container mb-3">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1 || isDateRangeSelected}
                            className="btn btn-secondary me-2"
                        >
                            Previous
                        </button>
                        <span> Page {currentPage} of {totalPages} </span>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages || isDateRangeSelected}
                            className="btn btn-secondary ms-2"
                        >
                            Next
                        </button>
                    </div>

                    {currentWaterIntakes.length === 0 ? (
                        <p>No water intake updated.</p>
                    ) : (
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Water Intake (liters)</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentWaterIntakes.map((intakeItem) => (
                                    <tr key={`${intakeItem.date}-${intakeItem.volume}`}>
                                        <td>{intakeItem.date}</td>
                                        <td>{intakeItem.volume}</td>
                                        <td>
                                            <button
                                                onClick={() => handleEditClick(intakeItem)}
                                                disabled={isDateRangeSelected}
                                                className="btn btn-primary btn-sm me-2"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteClick(intakeItem)}
                                                disabled={isDateRangeSelected}
                                                className="btn btn-danger btn-sm"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    {/* Add Water Intake Button */}
                    <Button
                        href="/add-water-intake"
                        variant="primary"
                        style={{
                            marginTop: '20px',
                            padding: '10px 20px',
                        }}
                    >
                        ADD
                    </Button>
                    <Button
                        href="/"
                        variant="primary"
                        style={{
                            marginLeft: '50px',
                            marginTop:'20px',
                            padding: '10px 20px',
                        }}
                    >
                        Back
                    </Button>
                   

                    {/* Date Range Filter */}
                    <div className="filter-container mt-4">
                        <h5 style={{ textAlign: "center", color: "green" }}>Compare the Water Intake between two Days</h5>
                        <label htmlFor="start-date" className="form-label">First Date:</label>
                        <input
                            id="start-date"
                            type="date"
                            className="form-control mb-2"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <label htmlFor="end-date" className="form-label">End Date:</label>
                        <input
                            id="end-date"
                            type="date"
                            className="form-control mb-2"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                        <button className="btn btn-primary mt-3" onClick={calculateDifferenceInWaterIntake}>
                            Compare
                        </button>
                        <Button
                        href="/water-intake-list"
                        variant="primary"
                        style={{
                            marginLeft: '50px',
                            marginTop:'20px',
                            padding: '10px 20px',
                        }}
                    >
                        Back
                    </Button>
                    </div>

                    {/* Difference Details Modal */}
                    {differenceInIntake !== null && (
                        <Modal show={showModal} onHide={handleCloseModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>Water Intake Comparison</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p>Water Intake on First Date: {totalStartDateIntake} liters</p>
                                <p>Water Intake on Second Date: {totalEndDateIntake} liters</p>
                                <p>Difference in Water Intake: {differenceInIntake} liters</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseModal}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    )}

                    {/* Modals */}
                    {showEdit && (
                        <EditWaterIntake
                            waterItem={selectedWaterIntake}
                            onUpdate={handleUpdate}
                            onClose={closeEditModal}
                        />
                    )}
                    {showDeleteModal && (
                        <DeleteConfirmationModal
                            show={showDeleteModal}
                            onHide={closeDeleteModal}
                            onDelete={handleDeleteConfirm}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

// PropTypes for type checking
WaterIntakeList.propTypes = {
    waterIntakes: PropTypes.arrayOf(
        PropTypes.shape({
            date: PropTypes.string.isRequired,
            volume: PropTypes.number.isRequired,
            username: PropTypes.string.isRequired,
        })
    ).isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default WaterIntakeList;
