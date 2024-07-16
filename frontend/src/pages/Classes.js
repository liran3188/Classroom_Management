import axios from 'axios';

//internal
import '../App.css';
import ConfirmModal from '../components/confirmModal';
import ClassStudentsModal from '../components/classStudentsModal';
//react
import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
//mui
import { Snackbar, Alert, Button } from '@mui/material';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';


const Classes = () => {
  const themeColor = useSelector((state) => state.themeColor);
  const [classes, setClasses] = useState([]);
  const [modalData, setModalData] = useState({ show: false, type: '', id: null });
  const [feedback, setFeedback] = useState('');
  const [open, setOpen] = useState(false);


  const fetchClasses = async () => {
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
            ...classItem,
            takenSeats: seatsData.length,
          };
        })
      );

      setClasses(classesWithSeats);
      setFeedback('Classes loaded successfully!');
      setOpen(true);  // Open the Snackbar on success
    } catch (error) {
      console.error('Error fetching class data:', error);
      setFeedback('Error fetching class data. Please try again.');
      setOpen(true);  // Open the Snackbar on error
    }
  };

  const openModal = (type, id) => {
    setModalData({ show: true, type, id });
  };

  const closeModal = () => {
    setModalData({ show: false, type: '', id: null });
  };

  const deleteClass = async (id) => {
    try {
      const url = `http://localhost:8000/classes`;
      await axios.delete(url, { data: { id } });

      console.log('Delete request successful for ID:', id);
      setClasses(prevClasses => prevClasses.filter(classItem => classItem.id !== id));
      setFeedback('Class deleted successfully!');
      setOpen(true);  // Open the Snackbar on success
      closeModal();
    } catch (error) {
      console.error('Error deleting class:', error);
      setFeedback('Error deleting class. Please try again.');
      setOpen(true);  // Open the Snackbar on error
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleCloseSnackbar = () => {
    setOpen(false);
  };

  return (
    <div className="classes-container">
      {classes.map((classItem, index) => (
        <div className="class-card" key={index}>
          <div className='topDiv'>
            <h4>{classItem.name}</h4>
            <p className='seatsLeft'>There are {classItem.capacity - classItem.takenSeats} seats left</p>
            <p className='maxSeats'>out of {classItem.capacity}</p>
          </div>
          <div className='bottomDiv'>
            <h4 className='list' onClick={() => openModal('studentsList', classItem.id)}>STUDENTS LIST</h4>
            <DeleteSharpIcon
              className="trash"
              fontSize='medium'
              style={{ color: themeColor }}
              onClick={() => openModal('delete', classItem.id)}
            />
          </div>
        </div>
      ))}
      {modalData.show && modalData.type === 'studentsList' && (
        <ClassStudentsModal classId={modalData.id} onClose={closeModal} fetchClasses={fetchClasses} />
      )}
      {modalData.show && modalData.type === 'delete' && (
        <ConfirmModal
          text="Are you sure you want to delete this class?"
          onClose={closeModal}
          onYes={() => deleteClass(modalData.id)}
        />
      )}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        action={
          <Button color="inherit" onClick={handleCloseSnackbar}>
            Close
          </Button>
        }
      >
        <Alert onClose={handleCloseSnackbar} severity={feedback.includes('Error') ? 'error' : 'success'}>
          {feedback}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Classes;
