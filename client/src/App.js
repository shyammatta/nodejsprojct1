// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CreateEmployee from './components/CreateEmployee';
import EditEmployee from './components/EditEmployee';
import EmployeeList from './components/EmployeeList';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the Login component */}
        <Route path="/" element={<Login />} />

        {/* Route for the Dashboard component */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Route for creating a new employee */}
        <Route path="/create-employee" element={<CreateEmployee />} />

        {/* Route for editing an existing employee by ID */}
        <Route path="/edit/:id" element={<EditEmployee />} />

        {/* Route for listing all employees */}
        <Route path="/employee-list" element={<EmployeeList />} />
      </Routes>
    </Router>
  );
}

export default App;
