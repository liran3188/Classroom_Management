// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from './components/Navbar';
import SideNav from './components/sideNav';
import './App.css'; // Import your global CSS file for styling
import Classes from './pages/Classes';
import Students from './pages/Students';
import Create from './pages/Create';
import { setTheme } from './store';

function App() {
    const [isSideNavOpen, setIsSideNavOpen] = useState(false);
    const themeColor = useSelector((state) => state.themeColor);
    const dispatch = useDispatch();

    const toggleSideNav = () => {
        setIsSideNavOpen(!isSideNavOpen);
    }

    const closeSideNav = () => {
        setIsSideNavOpen(false);
    }

    const handleThemeChange = () => {
        const newColor = themeColor === '#F50057' ? '#3F50B5' : '#F50057';
        dispatch(setTheme(newColor));
    }

    return (
        <Router>
            <div className="app">
                <Navbar toggleSideNav={toggleSideNav} handleThemeChange={handleThemeChange} themeColor={themeColor} />
                <SideNav isOpen={isSideNavOpen} closeSideNav={closeSideNav} />
                <div className="main-content">
                    <Routes>
                        <Route path="/classes" element={<Classes />} />
                        <Route path="/students" element={<Students />} />
                        <Route path="/create" element={<Create />} />
                        <Route path="/" element={<Classes />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
