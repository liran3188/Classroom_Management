import '../App.css';
//react
import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
//mui
import CloseIcon from '@mui/icons-material/Close';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import { Modal, Box, Typography, Snackbar, IconButton } from '@mui/material';

const ClassStudentsModal = ({ classId, onClose }) => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null); // State to track errors
  const [successMessage, setSuccessMessage] = useState(null); // State to track success messages
  const themeColor = useSelector((state) => state.themeColor);

  const deleteStudent = async (studentID) => {
    try {
      const response = await fetch('http://localhost:8000/students', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: studentID }),
      });

      if (!response.ok) {
        throw new Error('Failed to remove from class');
      }

      const data = await response.json();
      console.log('Removal successful:', data);

      // Update the students state to remove the deleted student
      setStudents(students.filter((student) => student.id !== studentID));

      setSuccessMessage('Student removed from class successfully'); // Set success message
    } catch (error) {
      console.error('Error removing from class:', error);
      setError(error.message); // Set the error message
    }
  };

  useEffect(() => {
    const fetchStudentsForClass = async () => {
      try {
        const response = await fetch(`http://localhost:8000/classes/students/${classId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const studentData = await response.json();
        setStudents(studentData);
      } catch (error) {
        console.error('Error fetching class data:', error);
        setError(error.message); // Set the error message
      }
    };

    fetchStudentsForClass();
  }, [classId]);

  const handleCloseSnackbar = () => {
    setError(null);
    setSuccessMessage(null);
  };

  return (
    <>
      <Modal open onClose={onClose}>
        <Box className="modal-content" sx={modalStyle}>
          <Typography variant="h6" component="h2" sx={{ marginBottom: '35px' }}>
            Class Students
          </Typography>
          <div className="modal-classes">
            {students.map((studentItem) => (
              <div key={studentItem.id} className="student-item">
                <AccountCircleSharpIcon className="person-icon" />
                <h3 className="student-name">{studentItem.firstName} {studentItem.lastName}</h3>
                <DeleteSharpIcon 
                  className='trash' 
                  onClick={() => deleteStudent(studentItem.id)} 
                  sx={{ color: themeColor, paddingBottom: '5%' }} 
                />
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
  boxShadow: 24,
  p: 2,
  paddingBottom: '0px',
};

export default ClassStudentsModal;
