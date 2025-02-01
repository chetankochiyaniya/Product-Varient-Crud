import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from './app/context/ThemeContext';
import "./assets/styles/dark-theme.css"
import { SideBarProvider } from './app/context/SideBarContext';

ReactDOM.render(
    <BrowserRouter basename='/'>
        <ThemeProvider>
            <SideBarProvider>
                <App />
            </SideBarProvider>
        </ThemeProvider>
    </BrowserRouter>
    , document.getElementById('root'));

serviceWorker.unregister();