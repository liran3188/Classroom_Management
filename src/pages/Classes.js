import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import '../App.css'; // Import the CSS file
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import ConfirmModal from '../components/confirmModal';
import ClassStudentsModal from '../components/classStudentsModal';

const Classes = () => {
  const themeColor = useSelector((state) => state.themeColor);
  const [classes, setClasses] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmModalId, setConfirmModalId] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const showStudentsList = (id) => {
    setConfirmModalId(id);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setConfirmModalId('');
    setShowDeleteModal(false);
    fetchClasses();
  };

  const openModal = (id) => {
    setConfirmModalId(id);
    setShowConfirmModal(true);
  };

  const closeModal = () => {
    setConfirmModalId('');
    setShowConfirmModal(false);
  };

  const deleteClass = async (id) => {
    try {
      const url = `http://localhost:8000/classes`;

      await axios.delete(url, { data: { id } });

      console.log('Delete request successful for ID:', id);

      setClasses(prevClasses => prevClasses.filter(classItem => classItem.id !== id));

      closeModal();
    } catch (error) {
      console.error('Error deleting class:', error);
    }
  };

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
            id: classItem.id,
            name: classItem.name,
            capacity: classItem.capacity,
            takenSeats: seatsData.length,
          };
        })
      );

      setClasses(classesWithSeats);
    } catch (error) {
      console.error('Error fetching class data:', error);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

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
            <h4 className='list' onClick={() => showStudentsList(classItem.id)}>STUDENTS LIST</h4>
            <DeleteSharpIcon
              className="trash"
              fontSize='medium'
              style={{ color: themeColor }}
              onClick={() => openModal(classItem.id)}
            />
          </div>
        </div>
      ))}
      {showDeleteModal && (
        <ClassStudentsModal classId={confirmModalId} onClose={closeDeleteModal} fetchClasses={fetchClasses} />
      )}
      {showConfirmModal && (
        <ConfirmModal
          text="Are you sure you want to delete this class?"
          onClose={closeModal}
          onYes={() => deleteClass(confirmModalId)}
        />
      )}
    </div>
  );
};

export default Classes;
