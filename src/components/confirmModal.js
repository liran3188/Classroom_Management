import React from 'react';
import '../App.css'; // Import CSS for styling

const ConfirmModal = ({ text, onClose, onYes }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="modal-text">{text}</span>
        <div className="modal-buttons">
          <button
            className="modal-button"
            style={{ backgroundColor: '#3F50B5' }}
            onClick={onYes}
          >
            YES
          </button>
          <button
            className="modal-button"
            style={{ backgroundColor: '#F50057' }}
            onClick={onClose} // Call onClose function to close the modal
          >
            NO
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
