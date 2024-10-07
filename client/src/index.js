import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Make sure App.js exists in the same directory

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
