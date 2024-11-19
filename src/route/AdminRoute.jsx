// AdminRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
  const isAuthenticated = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  return isAuthenticated && role === 'admin' ? <Outlet /> : <Navigate to="/unauthorized" />;
};

export default AdminRoute;
