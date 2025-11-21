import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function NotFound() {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen flex items-center justify-center py-8 px-4 sm:px-6 transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white' 
        : 'bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 text-gray-900'
    }`}>
      <div className="text-center max-w-2xl mx-auto">
        <div className="text-8xl md:text-9xl font-extrabold gradient-text mb-6">404</div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
          Page Not Found
        </h1>
        <p className="text-lg md:text-xl opacity-70 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn btn-primary btn-large">
            Go Home
          </Link>
          <Link to="/products" className="btn btn-secondary btn-large">
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}
