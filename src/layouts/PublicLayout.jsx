import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAppSelector } from '../store/hooks';

export default function PublicLayout() {
  const { isDark, toggleTheme } = useTheme();
  const totalCartItems = useAppSelector((state) => state.cart.totalItems);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white' 
        : 'bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 text-gray-900'
    }`}>
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/90 dark:bg-gray-900/90 border-b border-gray-200/50 dark:border-white/10 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <Link to="/" className="text-xl sm:text-2xl md:text-3xl font-heading font-bold gradient-text hover:opacity-80 transition-opacity">
              Shopify
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-6">
              <Link to="/" className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200 px-2 py-1">
                Home
              </Link>
              <Link to="/products" className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200 px-2 py-1">
                Products
              </Link>
              <Link to="/wishlist" className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200 px-2 py-1">
                Wishlist
              </Link>
              <Link to="/checkout" className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200 px-2 py-1 flex items-center gap-2 relative">
                Cart
                {totalCartItems > 0 && (
                  <span className="bg-primary-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center min-w-[20px] shadow-md">
                    {totalCartItems}
                  </span>
                )}
              </Link>
              <Link to="/login" className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200 px-2 py-1">
                Login
              </Link>
              <Link to="/signup" className="text-sm md:text-base font-medium bg-gradient-to-r from-primary-500 to-purple-600 text-white px-4 py-2 rounded-full hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
                Sign Up
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
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 sm:gap-3 lg:hidden">
              <Link to="/checkout" className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-700 dark:text-gray-300">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                {totalCartItems > 0 && (
                  <span className="absolute top-0 right-0 bg-primary-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center min-w-[20px] shadow-md">
                    {totalCartItems}
                  </span>
                )}
              </Link>
              <button 
                className="w-10 h-10 rounded-lg border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-95"
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
                className="w-10 h-10 rounded-lg border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-95 lg:hidden"
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
            <div className="lg:hidden border-t border-gray-200/50 dark:border-white/10 py-4 animate-fade-in bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
              <div className="flex flex-col space-y-2">
                <Link 
                  to="/" 
                  className="px-4 py-3 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-primary-500/10 hover:text-primary-500 dark:hover:text-primary-400 transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/products" 
                  className="px-4 py-3 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-primary-500/10 hover:text-primary-500 dark:hover:text-primary-400 transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Products
                </Link>
                <Link 
                  to="/wishlist" 
                  className="px-4 py-3 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-primary-500/10 hover:text-primary-500 dark:hover:text-primary-400 transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Wishlist
                </Link>
                <Link 
                  to="/login" 
                  className="px-4 py-3 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-primary-500/10 hover:text-primary-500 dark:hover:text-primary-400 transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="px-4 py-3 rounded-lg font-medium bg-gradient-to-r from-primary-500 to-purple-600 text-white text-center hover:shadow-lg transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
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
