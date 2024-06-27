import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppTheme } from './theme'
import { Typography } from '@mui/material';

const App = () => {
    return <Typography variant='h1'>Katalabs</Typography>
}

ReactDOM.createRoot( document.getElementById('root') ).render(
    <React.StrictMode>
        <AppTheme>
            <App />
        </AppTheme>
    </React.StrictMode>
);