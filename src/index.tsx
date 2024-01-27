import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import DashboardPage from './pages/dashboardPage'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
    <DashboardPage></DashboardPage>
  </React.StrictMode>
);

