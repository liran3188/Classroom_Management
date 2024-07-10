import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import '../App.css';
import ConfirmModal from './confirmModal'
import AssignModal from './assignModal'


const StudentsTable = () => {

    const [students, setStudents] = useState([]);
    const themeColor = useSelector((state) => state.themeColor);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteModalId, setDeleteModalId] = useState();
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [assignModalId, setAssignModalId] = useState();

    const openDeleteModal = (id) => {
        setDeleteModalId(id);
        setShowDeleteModal(true);
      };
    
      const closeDeleteModal = () => {
        setDeleteModalId()
        setShowDeleteModal(false);
      };

      const openAssignModal = (id) => {
        setAssignModalId(id);
        setShowAssignModal(true);
      };
    
      const closeAssignModal = () => {
        setAssignModalId();
        setShowAssignModal(false);
      };



      const deleteStudent = async (id) => {
        try {
          // Replace with your actual API endpoint
          const url = `http://localhost:8000/students`;
          
          // Send DELETE request with id in the request body
          await axios.delete(url, { data: { id } });
          
          console.log('Delete request successful for ID:', id);
          
          // Update students state to remove the deleted student
          setStudents(prevStudents => prevStudents.filter(studentItem => studentItem.id !== id));
          
          // Close the modal after deletion
          closeDeleteModal();
          
          // You can also show a success message or perform other actions as needed
          
        } catch (error) {
          console.error('Error deleting student:', error);
          // Handle error, show user feedback, etc.
        }
      };


    const maxRetries = 5; // Set the maximum number of retries

    const fetchStudents = async (retries = maxRetries) => {
      try {
        const response = await fetch('http://localhost:8000/students');
        const data = await response.json();
  
        if (data.length === 0 && retries > 0) {
          // If the response is empty and we still have retries left, retry the request
          console.warn(`Retrying... (${maxRetries - retries + 1}/${maxRetries})`);
          fetchStudents(retries - 1);
        } else {
          setStudents(data);
        }
      } catch (error) {
        if (retries > 0) {
          // Retry on error
          console.error(`Error fetching student data. Retrying... (${maxRetries - retries + 1}/${maxRetries})`, error);
          fetchStudents(retries - 1);
        } else {
          // Log the error if no retries are left
          console.error('Error fetching student data:', error);
        }
      }
    };

    console.log(students)
  
    useEffect(() => {
      fetchStudents();
    }, []);

    return (
        <TableContainer component={Paper} className="table-container">
            <Table className="table" aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className="table-header-cell" align="center">ID</TableCell>
                        <TableCell className="table-header-cell" align="center">First Name</TableCell>
                        <TableCell className="table-header-cell" align="center">Last Name</TableCell>
                        <TableCell className="table-header-cell" align="center">Age</TableCell>
                        <TableCell className="table-header-cell" align="center">Profession</TableCell>
                        <TableCell className="table-header-cell" align="center">Assign</TableCell>
                        <TableCell className="table-header-cell" align="center">Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {students.map((student) => (
                        <TableRow key={student.id}>
                            <TableCell className="table-cell" component="th" scope="row" align="center">{student.id}</TableCell>
                            <TableCell className="table-cell" align="center">{student.firstName}</TableCell>
                            <TableCell className="table-cell" align="center">{student.lastName}</TableCell>
                            <TableCell className="table-cell" align="center">{student.age}</TableCell>
                            <TableCell className="table-cell" align="center">{student.occupation}</TableCell>
                            <TableCell className="table-cell" align="center">
                                <Button variant="outlined" className="table-button" sx={{color: themeColor, borderColor: themeColor, '&:hover': {
                                borderColor: themeColor, // Maintain the same background color
                                boxShadow: 'none', // Remove any shadow effects
                                transform: 'none', // Remove any transformation effects
                                transition: 'none', // Remove the transition effect
                                }, }} onClick={() => openAssignModal(student.id)}>ASSIGN TO CLASS</Button>
                            </TableCell>
                            <TableCell className="table-cell" align="center">
                                <Button variant="outlined" className="table-button" sx={{color: themeColor, borderColor: themeColor, '&:hover': {
                                borderColor: themeColor, // Maintain the same background color
                                boxShadow: 'none', // Remove any shadow effects
                                transform: 'none', // Remove any transformation effects
                                transition: 'none', // Remove the transition effect
                                }, }} onClick={() => openDeleteModal(student.id)}>DELETE</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {showDeleteModal && (
        <ConfirmModal
          text="Are you sure you want to delete this student?"
          onClose={closeDeleteModal}
          onYes={() => deleteStudent(deleteModalId)}
        />
      )}
      {showAssignModal && (
        <AssignModal 
        studentId={assignModalId}
        onClose={closeAssignModal}
         />
      )}
        </TableContainer>
    );
};

export default StudentsTable;


