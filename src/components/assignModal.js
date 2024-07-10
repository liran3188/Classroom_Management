import '../App.css'; // Import CSS for styling
import React, { useState, useEffect } from 'react';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import { Modal, Box, Typography, Button, colors } from '@mui/material';
import { useSelector } from 'react-redux';


const AssignModal = ({ studentId, onClose }) => {
  const [classes, setClasses] = useState([]);
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

      onClose();

      if (!response.ok) {
        throw new Error('Failed to assign class');
      }

      // If you want to handle the response, you can do so here
      const data = await response.json();
      console.log('Assignment successful:', data);

      // Call onYes to handle the successful assignment (e.g., update UI, close modal, etc.)

    } catch (error) {
      console.error('Error assigning class:', error);
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
      }
    };

    fetchAvailableClasses();
  }, []);

  return (
    <Modal open onClose={onClose}>
      <Box className="modal-content" sx={modalStyle}>
        <Typography variant="h6" component="h2" sx={{marginBottom: '35px'}}>
          Available Classes
        </Typography>
        <div className="modal-classes">
          {classes.map((classItem) => (
            <div key={classItem.id} className="class-item">
                <SchoolRoundedIcon className="class-icon" />
                <h3 className="class-name">{classItem.name}</h3>
                <Typography className='class-assign-button' variant="h2" component="h2" onClick={() => assignStudent(studentId, classItem.id)} sx={{color: themeColor, paddingBottom: '5%'}}>
                ⁺
                </Typography>
            </div>
          ))}
        </div>
      </Box>
    </Modal>
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
