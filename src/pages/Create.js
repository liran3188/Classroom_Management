import axios from 'axios';
//react
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
//mui
import { Container, TextField, Button, Typography, Grid, Snackbar, Alert } from '@mui/material';

const Create = () => {
  const themeColor = useSelector((state) => state.themeColor);
  const [classData, setClassData] = useState({
    classID: '',
    name: '',
    maxSeats: '',
  });
  const [studentData, setStudentData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    age: '',
    profession: '',
  });
  const [feedback, setFeedback] = useState('');
  const [open, setOpen] = useState(false);

  const handleInputChange = (setter) => (e) => {
    const { name, value } = e.target;
    setter((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (url, data, setter, successMessage, errorMessage) => async (e) => {
    e.preventDefault();

    try {
      await axios.post(url, data);
      setter({});
      setFeedback(successMessage);
      setOpen(true);  // Open the Snackbar on success
    } catch (error) {
      console.error(errorMessage, error);
      setFeedback(errorMessage);
      setOpen(true);  // Open the Snackbar on error
    }
  };

  const classFormFields = [
    { name: 'classID', label: 'Class ID *', type: 'text' },
    { name: 'name', label: 'Name *', type: 'text' },
    { name: 'maxSeats', label: 'Max Seats *', type: 'number' },
  ];

  const studentFormFields = [
    { name: 'id', label: 'ID *', type: 'text' },
    { name: 'firstName', label: 'First Name *', type: 'text' },
    { name: 'lastName', label: 'Last Name *', type: 'text' },
    { name: 'age', label: 'Age *', type: 'number' },
    { name: 'profession', label: 'Profession *', type: 'text' },
  ];

  const handleCloseSnackbar = () => {
    setOpen(false);
  };

  return (
    <Container className='mainContainer'>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography className="topText" variant="h3" component="h3" gutterBottom>
            Create new class
          </Typography>
          <form onSubmit={handleSubmit('http://localhost:8000/classes', {
            id: Number(classData.classID),
            name: classData.name,
            capacity: classData.maxSeats,
          }, setClassData, 'Class created successfully!', 'Error creating class. Please try again.')}>
            {classFormFields.map((field) => (
              <TextField
                key={field.name}
                className='textField'
                placeholder={field.label}
                name={field.name}
                value={classData[field.name]}
                onChange={handleInputChange(setClassData)}
                required
                fullWidth
                margin="normal"
                type={field.type}
              />
            ))}
            <Button
              className="submitButton"
              type="submit"
              variant="contained"
              sx={{ backgroundColor: themeColor, mt: 2, '&:hover': { backgroundColor: themeColor } }}
            >
              Create Class
            </Button>
          </form>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography className="topText" variant="h3" component="h3" gutterBottom>
            Add new student
          </Typography>
          <form onSubmit={handleSubmit('http://localhost:8000/students', {
            id: Number(studentData.id),
            firstName: studentData.firstName,
            lastName: studentData.lastName,
            age: studentData.age,
            occupation: studentData.profession,
          }, setStudentData, 'Student created successfully!', 'Error creating student. Please try again.')}>
            {studentFormFields.map((field) => (
              <TextField
                key={field.name}
                className='textField'
                placeholder={field.label}
                name={field.name}
                value={studentData[field.name]}
                onChange={handleInputChange(setStudentData)}
                required
                fullWidth
                margin="normal"
                type={field.type}
              />
            ))}
            <Button
              className="submitButton"
              type="submit"
              variant="contained"
              sx={{ backgroundColor: themeColor, mt: 2, '&:hover': { backgroundColor: themeColor } }}
            >
              Add Student
            </Button>
          </form>
        </Grid>
      </Grid>

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
    </Container>
  );
};

export default Create;
