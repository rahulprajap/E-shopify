import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  // Check if user is authenticated
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  if (isAuthenticated) {
    // Allow access to public routes even when authenticated
    return children;
  }

  return children;
};

export default PublicRoute;

