import React, { createContext, useState, useContext, useEffect } from 'react';

const SideBarContext = createContext();

export const SideBarProvider = ({ children }) => {
    const [isSideBarOpen, setIsSideBarOpen] = useState(true);

    const toggleSideBar = () => {
        setIsSideBarOpen((prevISideBar) => {
            return !prevISideBar;
        });
    };

    const value = {
        isSideBarOpen,
        toggleSideBar,
    };

    return <SideBarContext.Provider value={value}>{children}</SideBarContext.Provider>;
};

export const useSideBar = () => useContext(SideBarContext);
