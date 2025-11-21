import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Private Route Component
 * Handles private routes - redirects to login if not authenticated
 */
const PrivateRoute = ({ children }) => {
  // Check if user is authenticated
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;

