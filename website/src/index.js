import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter as Router , Route , Routes} from 'react-router-dom'
import { AppProvider } from './context';
import { AuthContextProvider } from './context/AuthContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
    <AuthContextProvider>
            <Router>
                <App/>
            </Router>
    </AuthContextProvider>
    </>
);
