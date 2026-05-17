import React from 'react';
import './styles/AuthError.css';

const AuthError = ({ error }) => {
    if (!error) return null;

    // Handle different error formats from RTK Query
    const errorMessage = error?.data?.message || error?.data?.data || (typeof error?.data === 'string' ? error.data : null) || error?.message || "An unexpected error occurred.";

    return (
        <div className="auth-error-container">
            <span className="auth-error-icon">⚠️</span>
            <p className="auth-error-message">{errorMessage}</p>
        </div>
    );
};

export default AuthError;
