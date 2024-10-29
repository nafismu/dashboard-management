// EmployeeRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const EmployeeRoute = () => {
  const isAuthenticated = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  return isAuthenticated && role === 'employee' ? <Outlet /> : <Navigate to="/unauthorized" />;
};

export default EmployeeRoute;
