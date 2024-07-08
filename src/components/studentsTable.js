import React from 'react';
import { useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import '../App.css';

const studentData = [
    { id: '938475845', firstName: 'דוד', lastName: 'שימי', age: 65, profession: 'חשמליזציה' },
    { id: '435476567', firstName: 'יוסי', lastName: 'בן יוסי', age: 99, profession: 'יוסאי' },
    { id: '027272727', firstName: 'איתני', lastName: 'ווינהאוס', age: 27, profession: 'זמרת' },
    { id: '043583554', firstName: 'עמוס', lastName: 'סומע', age: 100, profession: 'מורה רוחני' },
    { id: '938465769', firstName: 'ריף', lastName: 'ריף', age: 32, profession: 'מטקאי' },
    // Add more students as needed
];

const StudentsTable = () => {
    const themeColor = useSelector((state) => state.themeColor);

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
                    {studentData.map((student) => (
                        <TableRow key={student.id}>
                            <TableCell className="table-cell" component="th" scope="row" align="center">{student.id}</TableCell>
                            <TableCell className="table-cell" align="center">{student.firstName}</TableCell>
                            <TableCell className="table-cell" align="center">{student.lastName}</TableCell>
                            <TableCell className="table-cell" align="center">{student.age}</TableCell>
                            <TableCell className="table-cell" align="center">{student.profession}</TableCell>
                            <TableCell className="table-cell" align="center">
                                <Button variant="outlined" className="table-button" sx={{color: themeColor, borderColor: themeColor}}>ASSIGN TO CLASS</Button>
                            </TableCell>
                            <TableCell className="table-cell" align="center">
                                <Button variant="outlined" className="table-button" sx={{color: themeColor, borderColor: themeColor}}>DELETE</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default StudentsTable;
