import React, { useState } from 'react';
import Switch from 'react-switch';
import { useTheme } from '../context/ThemeContext';

const ThemeToggelSwitch = () => {
    const { toggleTheme, isDarkTheme } = useTheme()
    const handleToggle = () => {
        toggleTheme()
    };

    return (
        <label htmlFor="material-switch" style={{ display: 'flex', alignItems: 'center', color: '#cfcfcf', marginBottom: 0 }}>
            <span style={{ marginRight: '8px', fontSize: 14 }}>
                {isDarkTheme ? "Dark theme" : "Light theme"}
            </span>
            <Switch
                checked={isDarkTheme}
                onChange={handleToggle}
                onColor="#1e90ff"
                offColor="#ffffff"
                onHandleColor="#ffffff"
                offHandleColor="#ffffff"
                handleDiameter={18}
                uncheckedIcon={<div className="mdi mdi-white-balance-sunny mdi-24px" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: '#ff8c00' }}></div>}
                checkedIcon={<div className="mdi mdi-weather-night mdi-24px" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: '#ffffff' }}></div>}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                height={24}
                width={50}
                className="react-switch"
                id="material-switch"
            />

        </label>
    );
};

export default ThemeToggelSwitch;
