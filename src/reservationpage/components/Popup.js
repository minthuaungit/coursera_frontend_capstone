import React from 'react';
import './Popup.css'; // Import the CSS for the Popup component

const Popup = ({ children, onClose, setIsConfirmed }) => {
    return (
        <div className="popup-overlay" role="dialog" aria-modal="true">
            <div className="popup-content" role="document">
                <button className="close-button" onClick={onClose} aria-label="Close" data-testid="close-button">X</button>
                {children}
            </div>
        </div>
    );
};

export default Popup;