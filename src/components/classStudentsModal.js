import '../App.css'; // Import CSS for styling
import React, { useState, useEffect } from 'react';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import { Modal, Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const ClassStudentsModal = ({ classId, onClose }) => {
  const [students, setStudents] = useState([]);
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

    } catch (error) {
      console.error('Error removing from class:', error);
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
      }
    };

    fetchStudentsForClass();
  }, [classId]);

  return (
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
              <DeleteSharpIcon className='trash' onClick={() => deleteStudent(studentItem.id)} sx={{ color: themeColor, paddingBottom: '5%' }} />
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
  boxShadow: 24,
  p: 2,
  paddingBottom: '0px',
};

export default ClassStudentsModal;
