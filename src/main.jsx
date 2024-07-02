// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { AppTheme } from './theme'
import { Typography } from '@mui/material';

ReactDOM.createRoot( document.getElementById('root') ).render(
    <React.StrictMode>
        <Router>
            <AppTheme>
                <App />
            </AppTheme>
        </Router>
    </React.StrictMode>
);