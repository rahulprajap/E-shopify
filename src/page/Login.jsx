import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loginUser, clearError } from '../store/slices/authSlice';

export default function Login() {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, error, isAuthenticated } = useAppSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/products');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(clearError());
      const result = await dispatch(loginUser(formData));
      if (loginUser.fulfilled.match(result)) {
        navigate('/products');
      }
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center py-6 sm:py-8 px-4 sm:px-6 transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white' 
        : 'bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 text-gray-900'
    }`}>
      <div className="w-full max-w-md">
        <div className="glass rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 lg:p-10 shadow-2xl">
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">Welcome Back</h1>
              <p className="opacity-70 text-sm md:text-base">Sign in to your account to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 bg-white/50 dark:bg-white/5 outline-none ${
                    errors.email 
                      ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                      : 'border-gray-200/50 dark:border-white/10 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20'
                  }`}
                  placeholder="Enter your email"
                />
                {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 bg-white/50 dark:bg-white/5 outline-none ${
                    errors.password 
                      ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                      : 'border-gray-200/50 dark:border-white/10 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20'
                  }`}
                  placeholder="Enter your password"
                />
                {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
              </div>

              {error && (
                <div className="text-red-500 text-sm text-center bg-red-500/10 p-3 rounded-xl">
                  {error}
                </div>
              )}

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 accent-primary-500 cursor-pointer" />
                  <span>Remember me</span>
                </label>
                <Link to="#" className="text-primary-500 font-medium hover:underline">
                  Forgot password?
                </Link>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary btn-full"
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
            <p className="text-center text-sm opacity-70">
              Don't have an account? <Link to="/signup" className="text-primary-500 font-semibold hover:underline">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
