import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './Router';
import './index.css';
import './tailwind.css'
import { ZafiyetContextProvider } from './context/ZafiyetlerContext';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ZafiyetContextProvider>
            <AppRouter />
        </ZafiyetContextProvider>
    </React.StrictMode>
);