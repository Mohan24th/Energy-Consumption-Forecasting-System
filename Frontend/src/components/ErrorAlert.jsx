import React from 'react';
import './ErrorAlert.css';

function ErrorAlert({ message, onRetry }) {
  return (
    <div className="error-alert">
      <span className="error-icon">⚠️</span>
      <div className="error-content">
        <strong>Error:</strong> {message}
      </div>
      {onRetry && (
        <button onClick={onRetry} className="retry-btn">
          Retry
        </button>
      )}
    </div>
  );
}

export default ErrorAlert;