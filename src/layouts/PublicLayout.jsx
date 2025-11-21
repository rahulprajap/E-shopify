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
              <Link to="/wishlist" className="text-sm md:text-base font-medium opacity-70 hover:opacity-100 transition-opacity relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-primary-500 after:to-purple-600 hover:after:w-full after:transition-all after:duration-300">
                Wishlist
              </Link>
              <Link to="/checkout" className="text-sm md:text-base font-medium opacity-70 hover:opacity-100 transition-opacity relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-primary-500 after:to-purple-600 hover:after:w-full after:transition-all after:duration-300 flex items-center gap-2">
                Cart
                {totalCartItems > 0 && (
                  <span className="bg-primary-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center min-w-[20px]">
                    {totalCartItems}
                  </span>
                )}
              </Link>
              <Link to="/login" className="text-sm md:text-base font-medium opacity-70 hover:opacity-100 transition-opacity relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-primary-500 after:to-purple-600 hover:after:w-full after:transition-all after:duration-300">
                Login
              </Link>
              <Link to="/signup" className="text-sm md:text-base font-medium opacity-70 hover:opacity-100 transition-opacity relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-primary-500 after:to-purple-600 hover:after:w-full after:transition-all after:duration-300">
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
            <div className="flex items-center gap-3 lg:hidden">
              <Link to="/checkout" className="relative">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-70">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                {totalCartItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center min-w-[20px]">
                    {totalCartItems}
                  </span>
                )}
              </Link>
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
                  to="/wishlist" 
                  className="px-4 py-3 rounded-lg font-medium opacity-70 hover:opacity-100 hover:bg-primary-500/10 transition-all duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Wishlist
                </Link>
                <Link 
                  to="/login" 
                  className="px-4 py-3 rounded-lg font-medium opacity-70 hover:opacity-100 hover:bg-primary-500/10 transition-all duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="px-4 py-3 rounded-lg font-medium opacity-70 hover:opacity-100 hover:bg-primary-500/10 transition-all duration-300"
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
