//internal
import './App.css'; 
import { setTheme } from './store';
import Create from './pages/Create';
import Classes from './pages/Classes';
import Students from './pages/Students';
import Navbar from './components/Navbar';
import SideNav from './components/sideNav';
//react
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

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
