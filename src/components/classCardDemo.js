//React
import React from 'react'
// import { useQuery } from 'react-query'
//MUI
import Card from '@mui/material/Card';
import DeleteIcon from '@mui/icons-material/Delete';import { blue, lightBlue, yellow } from '@mui/material/colors';

export default function ClassCardDemo({ Class }) {

    const takenSeats = 3
    return (
        <Card className="card">
            <div className='top'>
                <h1 className='bold'>{Class.name}</h1>
                <h3>there are {Class.capacity-takenSeats} seats left</h3>
                <h4 className='light'>out of {Class.capacity}</h4>
            </div>
            <div className='bottom'>
                <div /*onClick={showStudentdsList(Class.id)}*/>
                    <h1>STUDENTS LIST</h1>
                </div>
                <DeleteIcon /*onClick={deleteClass}*//>
            </div>
        </Card>
    )
}
