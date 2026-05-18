import React from 'react';
import '../styles/SubmissionError.css';

const SubmissionError = ({ error, onClose }) => {
    if (!error) return null;

    // Handle different error formats from RTK Query and the project's response utility
    const errorMessage = error?.data?.data || (typeof error?.data === 'string' ? error.data : null) || error?.message || "An unexpected error occurred.";

    return (
        <div className="submission-error-container">
            <div className="submission-error-content">
                <span className="error-icon">⚠️</span>
                <p className="error-message">{errorMessage}</p>
                <button className="error-close-btn" onClick={onClose}>&times;</button>
            </div>
        </div>
    );
};

export default SubmissionError;
