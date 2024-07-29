import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import '@fontsource/poppins'; // Defaults to weight 400.
import '@fontsource/poppins/300.css'; // Weight 300.
import '@fontsource/poppins/400.css'; // Weight 400.
import '@fontsource/poppins/500.css'; // Weight 500.
import '@fontsource/poppins/600.css'; // Weight 600.
import '@fontsource/poppins/700.css'; // Weight 700.
import { Toaster } from 'react-hot-toast';
import { AppContextProvider } from './authcontext/AppContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <AppContextProvider >
    <App />
    <Toaster/>
    </AppContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
