import React from 'react';
import ReactDOM from 'react-dom/client';
import 'normalize.css'; //importare sempre prima di index.css
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
