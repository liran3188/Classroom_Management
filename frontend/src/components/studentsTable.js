import axios from 'axios';
//internal
import '../App.css';
import AssignModal from './assignModal';
import ConfirmModal from './confirmModal';
//react
import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
//mui
import CloseIcon from '@mui/icons-material/Close';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Snackbar, IconButton } from '@mui/material';

const StudentsTable = () => {
    const [students, setStudents] = useState([]);
    const [error, setError] = useState(null); // State to track errors
    const [deleteError, setDeleteError] = useState(null); // State to track delete errors
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
        setDeleteModalId();
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
            const url = `http://localhost:8000/students`;

            await axios.delete(url, { data: { id } });

            console.log('Delete request successful for ID:', id);

            setStudents(prevStudents => prevStudents.filter(studentItem => studentItem.id !== id));

            closeDeleteModal();
        } catch (error) {
            console.error('Error deleting student:', error);
            setDeleteError('Error deleting student: ' + error.message); // Set the delete error message
        }
    };

    const maxRetries = 5;

    const fetchStudents = async (retries = maxRetries) => {
        try {
            const response = await fetch('http://localhost:8000/students');
            const data = await response.json();

            if (data.length === 0 && retries > 0) {
                console.warn(`Retrying... (${maxRetries - retries + 1}/${maxRetries})`);
                fetchStudents(retries - 1);
            } else {
                setStudents(data);
            }
        } catch (error) {
            if (retries > 0) {
                console.error(`Error fetching student data. Retrying... (${maxRetries - retries + 1}/${maxRetries})`, error);
                fetchStudents(retries - 1);
            } else {
                console.error('Error fetching student data:', error);
                setError('Error fetching student data: ' + error.message); // Set the fetch error message
            }
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleCloseSnackbar = () => {
        setError(null);
        setDeleteError(null);
    };

    return (
        <>
            <TableContainer component={Paper} className="table-container">
                <Table className="table" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="table-header-cell" align="center">ID</TableCell>
                            <TableCell className="table-header-cell" align="center">First Name</TableCell>
                            <TableCell className="table-header-cell" align="center">Last Name</TableCell>
                            <TableCell className="table-header-cell" align="center">Age</TableCell>
                            <TableCell className="table-header-cell" align="center">Profession</TableCell>
                            <TableCell className="table-header-cell" align="center" sx={{paddingLeft:0, paddingRight:0}}>Assign</TableCell>
                            <TableCell className="table-header-cell" align="center" sx={{paddingLeft:0, paddingRight:0}}>Delete</TableCell>
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
                                <TableCell className="table-cell" align="center" sx={{paddingLeft:0, paddingRight:0}}>
                                    <Button
                                        variant="outlined"
                                        className="table-button"
                                        sx={{
                                            color: themeColor,
                                            borderColor: themeColor,
                                            '&:hover': {
                                                borderColor: themeColor,
                                                boxShadow: 'none',
                                                transform: 'none',
                                                transition: 'none',
                                            },
                                        }}
                                        onClick={() => openAssignModal(student.id)}
                                    >
                                        ASSIGN TO CLASS
                                    </Button>
                                </TableCell>
                                <TableCell className="table-cell" align="center" sx={{paddingLeft:0, paddingRight:0}}>
                                    <Button
                                        variant="outlined"
                                        className="table-button"
                                        sx={{
                                            color: themeColor,
                                            borderColor: themeColor,
                                            '&:hover': {
                                                borderColor: themeColor,
                                                boxShadow: 'none',
                                                transform: 'none',
                                                transition: 'none',
                                            },
                                        }}
                                        onClick={() => openDeleteModal(student.id)}
                                    >
                                        DELETE
                                    </Button>
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

            {/* Snackbar for delete errors */}
            <Snackbar
                open={!!deleteError}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={deleteError}
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

export default StudentsTable;
