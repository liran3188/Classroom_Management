// sideNav.js
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Import your CSS file for styling

const SideNav = ({ isOpen, closeSideNav }) => {
    useEffect(() => {
        const handleOutsideClick = (event) => {
            // Close the side nav if click is outside of it
            if (isOpen && !event.target.closest('.sidenav')) {
                closeSideNav();
            }
        };

        // Add event listener to listen for clicks on the document
        document.addEventListener('mousedown', handleOutsideClick);

        // Clean up the event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isOpen, closeSideNav]);

    return (
        <>
            <div className={`overlay ${isOpen ? 'open' : ''}`} onClick={closeSideNav}></div>
            <div className={`sidenav ${isOpen ? 'open' : ''}`}>
                <Link to="/classes" onClick={closeSideNav}><h2 className="linkText">Classes</h2></Link>
                <Link to="/students" onClick={closeSideNav}><h2 className="linkText">Students</h2></Link>
                <Link to="/create" onClick={closeSideNav}><h2 className="linkText">Create</h2></Link>
            </div>
        </>
    );
}

export default SideNav;
