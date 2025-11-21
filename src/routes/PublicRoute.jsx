import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Public Route Component
 * Handles public routes - redirects to home if already authenticated
 */
const PublicRoute = ({ children }) => {
  // Check if user is authenticated
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  // If authenticated and trying to access login/signup, redirect to home
  // You can customize this behavior based on your needs
  if (isAuthenticated) {
    // Allow access to public routes even when authenticated
    // Remove this if you want to redirect authenticated users away from login/signup
    return children;
  }

  return children;
};

export default PublicRoute;

