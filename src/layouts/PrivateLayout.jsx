import React, { useState } from 'react';
import { Outlet, Navigate, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logoutUser } from '../store/slices/authSlice';

export default function PrivateLayout() {
  const { isDark, toggleTheme } = useTheme();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    dispatch(logoutUser());
    setMobileMenuOpen(false);
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white' 
        : 'bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 text-gray-900'
    }`}>
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-white/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <Link to="/" className="text-xl sm:text-2xl md:text-3xl font-heading font-bold gradient-text">
              Shopify
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              <Link to="/" className="text-sm md:text-base font-medium opacity-70 hover:opacity-100 transition-opacity relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-primary-500 after:to-purple-600 hover:after:w-full after:transition-all after:duration-300">
                Home
              </Link>
              <Link to="/products" className="text-sm md:text-base font-medium opacity-70 hover:opacity-100 transition-opacity relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-primary-500 after:to-purple-600 hover:after:w-full after:transition-all after:duration-300">
                Products
              </Link>
              <Link to="/dashboard" className="text-sm md:text-base font-medium opacity-70 hover:opacity-100 transition-opacity relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-primary-500 after:to-purple-600 hover:after:w-full after:transition-all after:duration-300">
                Dashboard
              </Link>
              <Link to="/profile" className="text-sm md:text-base font-medium opacity-70 hover:opacity-100 transition-opacity relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-primary-500 after:to-purple-600 hover:after:w-full after:transition-all after:duration-300">
                Profile
              </Link>
              <button 
                className="w-10 h-10 rounded-full border-2 border-current flex items-center justify-center transition-all duration-300 hover:rotate-12 hover:scale-110 hover:bg-primary-500/10"
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
                onClick={handleLogout}
                className="px-4 py-2 rounded-full border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 text-sm md:text-base font-medium"
              >
                Logout
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-3 lg:hidden">
              <button 
                className="w-10 h-10 rounded-full border-2 border-current flex items-center justify-center transition-all duration-300 hover:bg-primary-500/10"
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                  </svg>
                )}
              </button>
              <button
                className="w-10 h-10 rounded-lg border-2 border-current flex items-center justify-center transition-all duration-300 hover:bg-primary-500/10 lg:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-200/50 dark:border-white/10 py-4 animate-fade-in">
              <div className="flex flex-col space-y-3">
                <Link 
                  to="/" 
                  className="px-4 py-3 rounded-lg font-medium opacity-70 hover:opacity-100 hover:bg-primary-500/10 transition-all duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/products" 
                  className="px-4 py-3 rounded-lg font-medium opacity-70 hover:opacity-100 hover:bg-primary-500/10 transition-all duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Products
                </Link>
                <Link 
                  to="/dashboard" 
                  className="px-4 py-3 rounded-lg font-medium opacity-70 hover:opacity-100 hover:bg-primary-500/10 transition-all duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/profile" 
                  className="px-4 py-3 rounded-lg font-medium opacity-70 hover:opacity-100 hover:bg-primary-500/10 transition-all duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-3 rounded-lg font-medium text-red-500 hover:bg-red-500/10 transition-all duration-300 text-left"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="py-6 md:py-8 px-4 sm:px-6 lg:px-8 text-center border-t border-gray-200/50 dark:border-white/10 bg-white/50 dark:bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <p className="opacity-70 text-xs sm:text-sm md:text-base">
            &copy; 2024 Shopify. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
