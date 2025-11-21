import React from 'react';
import { Outlet, Navigate, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import './Layout.css';

// Simple auth check - in real app, this would check actual auth state
const isAuthenticated = () => {
  // For demo purposes, check localStorage
  // In real app, check token, user session, etc.
  return localStorage.getItem('isAuthenticated') === 'true';
};

export default function PrivateLayout() {
  const { isDark, toggleTheme } = useTheme();

  // Redirect to login if not authenticated
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className={`layout private-layout ${isDark ? 'dark' : 'light'}`}>
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="logo-link">
            <span className="logo-text">Shopify</span>
          </Link>
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/products" className="nav-link">Products</Link>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/profile" className="nav-link">Profile</Link>
            <button 
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              )}
            </button>
            <button 
              className="logout-btn"
              onClick={() => {
                localStorage.removeItem('isAuthenticated');
                window.location.href = '/login';
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="layout-content">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="layout-footer">
        <div className="container">
          <p>&copy; 2024 Shopify. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

