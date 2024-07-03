import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import LoyaltyIcon from '@mui/icons-material/Loyalty';

const Navbar = ({ toggleSideNav, handleThemeChange, themeColor }) => {
    return (
        <nav className="navbar" style={{ backgroundColor: themeColor }}>
            <div className="navbar-container">
                <MenuIcon fontSize="small" className="menu-toggle nav-item" onClick={toggleSideNav} />
                <h4 className="navText nav-item">Shob Classes</h4>
                <LoyaltyIcon fontSize="small" className="theme-toggle nav-item" onClick={handleThemeChange} />
            </div>
        </nav>
    );
}

export default Navbar;
