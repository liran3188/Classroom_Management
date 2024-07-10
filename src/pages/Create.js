import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Container, TextField, Button, Typography, Grid, Paper } from '@mui/material';

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


  const handleClassChange = (e) => {
    const { name, value } = e.target;
    setClassData({
      ...classData,
      [name]: value,
    });
  };

  const handleStudentChange = (e) => {
    const { name, value } = e.target;
    setStudentData({
      ...studentData,
      [name]: value,
    });
  };

  const handleClassSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const { classID, name, maxSeats } = classData;

    try {
      const url = 'http://localhost:8000/classes';
      await axios.post(url, {
        id: Number(classID),
        name: name,
        capacity: maxSeats,
      });

      setClassData({ classID: '', name: '', maxSeats: '' }); // Clear the form
      setFeedback('Class created successfully!'); // Success feedback
    } catch (error) {
      console.error('Error creating class:', error);
      setFeedback('Error creating class. Please try again.'); // Error feedback
    }
  };

  const handleStudentSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const { id, firstName, lastName, age, profession } = studentData;

    try {
      const url = 'http://localhost:8000/students';
      await axios.post(url, {
        id: Number(id),
        firstName: firstName,
        lastName: lastName,
        age: age,
        occupation: profession
      });

      setStudentData({ id: '', firstName: '', lastName: '', age: '', profession: '' }); // Clear the form
      setFeedback('student created successfully!'); // Success feedback
    } catch (error) {
      console.error('Error creating student:', error);
      setFeedback('Error creating student. Please try again.'); // Error feedback
    }
  };

  return (
    <Container className='mainContainer'>
      <Grid container spacing={75} justifyContent="center">
        <Grid item xs={12} md={6}>
            <Typography className="topText" variant="h3" component="h3" gutterBottom>
              Create new class
            </Typography>
            <form onSubmit={handleClassSubmit}>
              <TextField
                className='textField'
                placeholder="Class ID *"
                name="classID"
                value={classData.classID}
                onChange={handleClassChange}
                required
                fullWidth
                margin="normal"
              />
              <TextField
                className='textField'
                placeholder="Name *"
                name="name"
                value={classData.name}
                onChange={handleClassChange}
                required
                fullWidth
                margin="normal"
              />
              <TextField
                className='textField'
                placeholder="Max Seats *"
                name="maxSeats"
                value={classData.maxSeats}
                onChange={handleClassChange}
                required
                type="number"
                fullWidth
                margin="normal"
              />
              <Button className="submitButton" type="submit" variant="contained" sx={{ backgroundColor: themeColor, mt: 2, '&:hover': {
          backgroundColor: themeColor, // Maintain the same background color
          boxShadow: 'none', // Remove any shadow effects
          transform: 'none', // Remove any transformation effects
          transition: 'none', // Remove the transition effect
        }, }}>
                Create Class
              </Button>
            </form>
        </Grid>

        <Grid item xs={12} md={6}>
            <Typography className="topText" variant="h3" component="h3" gutterBottom>
              Add new student
            </Typography>
            <form onSubmit={handleStudentSubmit}>
              <TextField
                className='textField'
                placeholder="ID *"
                name="id"
                value={studentData.id}
                onChange={handleStudentChange}
                required
                fullWidth
                margin="normal"
              />
              <TextField
                className='textField'
                placeholder="First Name *"
                name="firstName"
                value={studentData.firstName}
                onChange={handleStudentChange}
                required
                fullWidth
                margin="normal"
              />
              <TextField
                className='textField'
                placeholder="Last Name *"
                name="lastName"
                value={studentData.lastName}
                onChange={handleStudentChange}
                required
                fullWidth
                margin="normal"
              />
              <TextField
                className='textField'
                placeholder="Age *"
                name="age"
                value={studentData.age}
                onChange={handleStudentChange}
                required
                type="number"
                fullWidth
                margin="normal"
              />
              <TextField
                className='textField'
                placeholder="Profession *"
                name="profession"
                value={studentData.profession}
                onChange={handleStudentChange}
                required
                fullWidth
                margin="normal"
              />
              <Button className="submitButton" type="submit" variant="contained" sx={{ backgroundColor: themeColor, mt: 2, '&:hover': {
          backgroundColor: themeColor, // Maintain the same background color
          boxShadow: 'none', // Remove any shadow effects
          transform: 'none', // Remove any transformation effects
          transition: 'none', // Remove the transition effect
        }, }}>
                Add Student
              </Button>
            </form>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Create;
