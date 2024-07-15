import '../App.css';
//react
import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
//mui
import CloseIcon from '@mui/icons-material/Close';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import { Modal, Box, Typography, Snackbar, IconButton } from '@mui/material';


const AssignModal = ({ studentId, onClose }) => {
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState(null); // State to track errors
  const [successMessage, setSuccessMessage] = useState(null); // State to track success messages
  const themeColor = useSelector((state) => state.themeColor);

  const assignStudent = async (studentID, classID) => {
    try {
      const response = await fetch('http://localhost:8000/students/assign', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ studentId: studentID, classId: classID }),
      });

      if (!response.ok) {
        throw new Error('Failed to assign class');
      }

      const data = await response.json();
      console.log('Assignment successful:', data);

      setSuccessMessage('Student assigned to class successfully'); // Set success message
      onClose(); // Close the modal on successful assignment
    } catch (error) {
      console.error('Error assigning class:', error);
      setError(error.message); // Set the error message
    }
  };

  useEffect(() => {
    const fetchAvailableClasses = async () => {
      try {
        const response = await fetch('http://localhost:8000/classes');
        const data = await response.json();

        const classesWithSeats = await Promise.all(
          data.map(async (classItem) => {
            const seatsResponse = await fetch(`http://localhost:8000/classes/students/${classItem.id}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              }
            });
            const seatsData = await seatsResponse.json();
            return {
              id: classItem.id,
              name: classItem.name,
              capacity: classItem.capacity,
              takenSeats: seatsData.length,
            };
          })
        );

        const filteredClasses = classesWithSeats.filter(
          (classItem) => classItem.takenSeats < classItem.capacity
        );

        setClasses(filteredClasses);
      } catch (error) {
        console.error('Error fetching class data:', error);
        setError(error.message); // Set the error message
      }
    };

    fetchAvailableClasses();
  }, []);

  const handleCloseSnackbar = () => {
    setError(null);
    setSuccessMessage(null);
  };

  return (
    <>
      <Modal open onClose={onClose}>
        <Box className="modal-content" sx={modalStyle}>
          <Typography variant="h6" component="h2" sx={{ marginBottom: '35px' }}>
            Available Classes
          </Typography>
          <div className="modal-classes">
            {classes.map((classItem) => (
              <div key={classItem.id} className="class-item">
                <SchoolRoundedIcon className="class-icon" />
                <h3 className="class-name">{classItem.name}</h3>
                <Typography
                  className='class-assign-button'
                  variant="h2"
                  component="h2"
                  onClick={() => assignStudent(studentId, classItem.id)}
                  sx={{ color: themeColor, paddingBottom: '5%' }}
                >
                  ⁺
                </Typography>
              </div>
            ))}
          </div>
        </Box>
      </Modal>

      {/* Snackbar for general errors */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={error}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleCloseSnackbar}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />

      {/* Snackbar for success messages */}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={successMessage}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleCloseSnackbar}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </>
  );
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '15%',
  minHeight: '20%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
  paddingBottom: '0px'
};

export default AssignModal;
