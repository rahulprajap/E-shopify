import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ThemeProvider } from './context/ThemeContext';
import { checkAuth } from './store/slices/authSlice';
import PublicLayout from './layouts/PublicLayout';
import PrivateLayout from './layouts/PrivateLayout';
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';

// Lazy load components for code splitting
const Home = lazy(() => import('./page/Home'));
const Login = lazy(() => import('./page/Login'));
const Signup = lazy(() => import('./page/Signup'));
const Products = lazy(() => import('./page/Products'));
const ProductDetails = lazy(() => import('./page/ProductDetails'));
const Wishlist = lazy(() => import('./page/Wishlist'));
const Checkout = lazy(() => import('./page/Checkout'));
const NotFound = lazy(() => import('./page/NotFound'));

// Loading fallback component
const LoadingFallback = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '100vh' 
  }}>
    <div>Loading...</div>
  </div>
);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check auth on app load
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <ThemeProvider>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Public Routes with PublicLayout */}
          <Route element={<PublicLayout />}>
            <Route 
              path="/" 
              element={
                <PublicRoute>
                  <Home />
                </PublicRoute>
              } 
            />
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } 
            />
            <Route 
              path="/signup" 
              element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              } 
            />
            <Route 
              path="/products" 
              element={
                <PublicRoute>
                  <Products />
                </PublicRoute>
              } 
            />
            <Route 
              path="/products/:id" 
              element={
                <PublicRoute>
                  <ProductDetails />
                </PublicRoute>
              } 
            />
            <Route 
              path="/wishlist" 
              element={
                <PublicRoute>
                  <Wishlist />
                </PublicRoute>
              } 
            />
            <Route 
              path="/checkout" 
              element={
                <PublicRoute>
                  <Checkout />
                </PublicRoute>
              } 
            />
          </Route>

          {/* Private Routes with PrivateLayout */}
          <Route element={<PrivateLayout />}>
            {/* Add private routes here when needed */}
            {/* Example:
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } 
            />
            */}
          </Route>

          {/* 404 Not Found */}
          <Route 
            path="*" 
            element={<NotFound />} 
          />
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
