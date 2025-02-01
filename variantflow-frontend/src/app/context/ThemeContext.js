import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    // Read the theme value from local storage or set a default value
    const storedTheme = localStorage.getItem('isDarkTheme');
    if (storedTheme === null || storedTheme === undefined) {
      // Set default theme and store it
      localStorage.setItem('isDarkTheme', false);
      return false; // Default theme is light
    }
    return storedTheme === 'true'; // Convert stored value to boolean
  });

  const toggleTheme = () => {
    setIsDarkTheme((prevIsDarkTheme) => {
      // Update local storage with the new theme value
      localStorage.setItem('isDarkTheme', !prevIsDarkTheme);
      return !prevIsDarkTheme;
    });
  };

  useEffect(() => {
    document.body.style.backgroundColor = isDarkTheme ? '#000' : '#f0f2f5';
    document.body.style.color = isDarkTheme ? '#fff' : '#344767';
  }, [isDarkTheme]);

  const value = {
    isDarkTheme,
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
