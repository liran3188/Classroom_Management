import React, { useState } from 'react';
import { useSelector } from 'react-redux';
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

  const handleClassSubmit = (e) => {
    e.preventDefault();
    // Handle class form submission
    console.log('Class Created:', classData);
  };

  const handleStudentSubmit = (e) => {
    e.preventDefault();
    // Handle student form submission
    console.log('Student Added:', studentData);
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
                label="Class ID"
                name="classID"
                value={classData.classID}
                onChange={handleClassChange}
                required
                fullWidth
                margin="normal"
              />
              <TextField
                className='textField'
                label="Name"
                name="name"
                value={classData.name}
                onChange={handleClassChange}
                required
                fullWidth
                margin="normal"
              />
              <TextField
                className='textField'
                label="Max Seats"
                name="maxSeats"
                value={classData.maxSeats}
                onChange={handleClassChange}
                required
                type="number"
                fullWidth
                margin="normal"
              />
              <Button className="submitButton" type="submit" variant="contained" sx={{ backgroundColor: themeColor, mt: 2 }}>
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
                label="ID"
                name="id"
                value={studentData.id}
                onChange={handleStudentChange}
                required
                fullWidth
                margin="normal"
              />
              <TextField
                className='textField'
                label="First Name"
                name="firstName"
                value={studentData.firstName}
                onChange={handleStudentChange}
                required
                fullWidth
                margin="normal"
              />
              <TextField
                className='textField'
                label="Last Name"
                name="lastName"
                value={studentData.lastName}
                onChange={handleStudentChange}
                required
                fullWidth
                margin="normal"
              />
              <TextField
                className='textField'
                label="Age"
                name="age"
                value={studentData.age}
                onChange={handleStudentChange}
                type="number"
                fullWidth
                margin="normal"
              />
              <TextField
                className='textField'
                label="Profession"
                name="profession"
                value={studentData.profession}
                onChange={handleStudentChange}
                required
                fullWidth
                margin="normal"
              />
              <Button className="submitButton" type="submit" variant="contained" sx={{ backgroundColor: themeColor, mt: 2 }}>
                Add Student
              </Button>
            </form>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Create;
