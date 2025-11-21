import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

/**
 * Private Route Component
 * Handles private routes - redirects to login if not authenticated
 */
const PrivateRoute = ({ children }) => {
  // Check if user is authenticated from Redux store
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;

