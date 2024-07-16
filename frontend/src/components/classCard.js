//React
import React from 'react'
import { useQuery } from 'react-query'
//MUI
import Card from '@mui/material/Card';
import DeleteIcon from '@mui/icons-material/Delete';import { blue, lightBlue, yellow } from '@mui/material/colors';
import ClassStudentsModal from './classStudentsModal';

export default function ClassCard({ Class }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const showStudentdsList = () => {
        console.log("hey bitch");
        setShowDeleteModal(true);
      };
    
      const closeDeleteModal = () => {
        setShowDeleteModal(false);
      };

    return (
        <Card className="card">
            <div className='top'>
                <h1 className='bold'>{Class.name}</h1>
                <h3>there are {Class.capacity-takenSeats} seats left</h3>
                <h4 className='light'>out of {Class.capacity}</h4>
            </div>
            <div className='bottom'>
                    <h1 onClick={() => showStudentdsList}>STUDENTS LIST</h1>
                <DeleteIcon onClick={deleteClass}/>
            </div>
            {showDeleteModal && (<ClassStudentsModal classId={Class.id} onClose={closeDeleteModal}/>)}
        </Card>
    )
}