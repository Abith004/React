import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import EditWaterIntake from './EditWaterIntake';
import DeleteConfirmationModal from './DeleteConfirmationModal';

const WaterIntakeList = ({ waterIntakes, onEdit, onDelete }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const [showEdit, setShowEdit] = useState(false);
    const [selectedWaterIntake, setSelectedWaterIntake] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [waterIntakeToDelete, setWaterIntakeToDelete] = useState(null);

    // Date range filter states
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [totalStartDateIntake, setTotalStartDateIntake] = useState(0);
    const [totalEndDateIntake, setTotalEndDateIntake] = useState(0);
    const [differenceInIntake, setDifferenceInIntake] = useState(null);

    // Filter water intakes by date range
    const filteredWaterIntakes = waterIntakes.filter(intakeItem => {
        const intakeDate = new Date(intakeItem.date);
        return (!startDate || intakeDate >= new Date(startDate)) && (!endDate || intakeDate <= new Date(endDate));
    });

    // Pagination logic
    const totalPages = Math.ceil(filteredWaterIntakes.length / itemsPerPage);
    const indexOfLastIntake = currentPage * itemsPerPage;
    const indexOfFirstIntake = indexOfLastIntake - itemsPerPage;
    const currentWaterIntakes = filteredWaterIntakes.slice(indexOfFirstIntake, indexOfLastIntake);

    // Reset pagination when water intakes change
    useEffect(() => {
        setCurrentPage(1);
    }, [waterIntakes]);

    // Function to calculate total water intake for start and end dates
    const calculateDifferenceInWaterIntake = () => {
        if (!startDate || !endDate) {
            alert("Please select both start and end dates.");
            return;
        }

        // Calculate total water intake on the start date
        const startDateIntakes = waterIntakes.filter(intakeItem => new Date(intakeItem.date).toLocaleDateString() === new Date(startDate).toLocaleDateString());
        const totalStart = startDateIntakes.reduce((sum, item) => sum + item.volume, 0);
        setTotalStartDateIntake(totalStart);

        // Calculate total water intake on the end date
        const endDateIntakes = waterIntakes.filter(intakeItem => new Date(intakeItem.date).toLocaleDateString() === new Date(endDate).toLocaleDateString());
        const totalEnd = endDateIntakes.reduce((sum, item) => sum + item.volume, 0);
        setTotalEndDateIntake(totalEnd);

        // Calculate the difference between the two dates
        const difference = totalEnd - totalStart;
        setDifferenceInIntake(difference);
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

    return (
        <div className="water-intake-list-container">
            <div className="card border p-4 rounded shadow bg-light">
                <div className="card-body">
                    <h5 className="card-title text-center mb-4">Manage Your Water Intake</h5>

                    {/* Date Range Filter */}
                    <div className="filter-container mb-4">
                        <label htmlFor="start-date" className="form-label">Start Date:</label>
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
                    </div>

                    <button className="btn btn-primary mb-3" onClick={calculateDifferenceInWaterIntake}>
                        Calculate Water Intake Difference
                    </button>

                    {differenceInIntake !== null && (
                        <div className="intake-difference">
                            <p>Total Intake on Start Date: {totalStartDateIntake} liters</p>
                            <p>Total Intake on End Date: {totalEndDateIntake} liters</p>
                            <p>Difference in Water Intake: {differenceInIntake} liters</p>
                        </div>
                    )}

                    {currentWaterIntakes.length === 0 ? (
                        <p>No water intakes recorded.</p>
                    ) : (
                        currentWaterIntakes.map((intakeItem) => (
                            <div key={`${intakeItem.date}-${intakeItem.volume}`} className="water-intake-item">
                                <span>{intakeItem.date}: {intakeItem.volume} liters</span>
                                <button
                                    onClick={() => handleEditClick(intakeItem)}
                                    className="btn btn-primary btn-sm ml-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteClick(intakeItem)}
                                    className="btn btn-danger btn-sm ml-2"
                                >
                                    Delete
                                </button>
                            </div>
                        ))
                    )}

                    {/* Pagination Controls */}
                    <div className="pagination-container mt-3">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="btn btn-secondary me-2"
                        >
                            Previous
                        </button>
                        <span> Page {currentPage} of {totalPages} </span>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="btn btn-secondary ms-2"
                        >
                            Next
                        </button>
                    </div>

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

            {/* Internal CSS */}
            <style jsx>{`
                .water-intake-list-container {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                }

                .card {
                    background-color: #f8f9fa;
                    border: none;
                    border-radius: 8px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                }

                .card-title {
                    font-size: 24px;
                    font-weight: bold;
                    color: #333;
                }

                .filter-container {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                .form-label {
                    font-size: 16px;
                    color: #555;
                }

                .water-intake-item {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background-color: #ffffff;
                    padding: 10px;
                    border-radius: 6px;
                    margin-bottom: 10px;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                }

                .water-intake-item button {
                    margin-left: 10px;
                }

                .intake-difference {
                    background-color: #e9f7ef;
                    padding: 10px;
                    border-radius: 6px;
                    margin-top: 20px;
                }

                .pagination-container {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 20px;
                }

                .pagination-container button {
                    padding: 8px 16px;
                }
            `}</style>
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
