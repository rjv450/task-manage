import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;

  return isAuthenticated ? Element : <Navigate to="/" />;
};

export default ProtectedRoute;
