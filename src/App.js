import React, { useState } from 'react';
import Navbar from './components/Navbar';
import SideNav from './components/sideNav';
import './App.css'; // Import your global CSS file for styling

function App() {
    const [isSideNavOpen, setIsSideNavOpen] = useState(false);
    const [themeColor, setThemeColor] = useState('#F50057');

    const toggleSideNav = () => {
        setIsSideNavOpen(!isSideNavOpen);
    }

    const closeSideNav = () => {
        setIsSideNavOpen(false);
    }

    const handleThemeChange = () => {
        const newColor = themeColor === '#F50057' ? '#3F50B5' : '#F50057';
        setThemeColor(newColor);
    }

    return (
        <div className="app">
            <Navbar toggleSideNav={toggleSideNav} handleThemeChange={handleThemeChange} themeColor={themeColor} />
            <SideNav isOpen={isSideNavOpen} closeSideNav={closeSideNav} />
            <div className="main-content">
                {/* Your main content here */}
            </div>
        </div>
    );
}

export default App;
