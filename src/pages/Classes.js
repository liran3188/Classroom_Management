// // pages/Classes.js
// import React from 'react';
// import ClassCardDemo from '../components/classCardDemo';

// const Classes = () => {
//     const ClassDemo = {id:3, name:'אלון', capacity:4}
//     return (
//         <div>
//             <h1>Classes Page</h1>
//             <ClassCardDemo Class={ClassDemo} />
//             {/* Your content here */}
//         </div>
//     );
// }

// export default Classes;



// Classes.js
// src/pages/Classes.js
import React from 'react';
import { useSelector } from 'react-redux';
import '../App.css'; // Import the CSS file
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';

const Classes = () => {
    const themeColor = useSelector((state) => state.themeColor);

    const classData = [
        { name: 'אלון', seatsLeft: 2, totalSeats: 2 },
        { name: 'שקמה', seatsLeft: 2, totalSeats: 11111 },
        { name: 'שיטה', seatsLeft: 0, totalSeats: 96 },
        { name: 'תאנה', seatsLeft: 0, totalSeats: 45 },
        { name: 'גפן', seatsLeft: 1, totalSeats: 1 },
        { name: 'ארזים', seatsLeft: 0, totalSeats: 22 },
        // Add more classes as needed
    ];

    return (
        <div className="classes-container">
            {classData.map((classItem, index) => (
                <div className="class-card" key={index}>
                    <div className='topDiv'>
                        <h4>{classItem.name}</h4>
                        <p className='seatsLeft'>There are {classItem.seatsLeft} seats left</p>
                        <p className='maxSeats'>out of {classItem.totalSeats}</p>
                    </div>
                    <div className='bottomDiv'>
                        <h4 className='list'>STUDENTS LIST</h4>
                        <DeleteSharpIcon className="trash" fontSize='medium' style={{ color: themeColor }} />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Classes;

