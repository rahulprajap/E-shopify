import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import './Home.css';

export default function Home() {
  const { isDark } = useTheme();

  return (
    <div className={`landing-page ${isDark ? 'dark' : 'light'}`}>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Welcome to <span className="gradient-text">Shopify</span>
            </h1>
            <p className="hero-subtitle">
              Discover amazing products and shop with confidence. 
              Your one-stop destination for all your shopping needs.
            </p>
            <div className="hero-buttons">
              <Link to="/products" className="btn btn-primary">
                Shop Now
              </Link>
              <Link to="/signup" className="btn btn-secondary">
                Get Started
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <div className="floating-card card-1">
              <div className="card-icon">🛍️</div>
              <p>Shop Now</p>
            </div>
            <div className="floating-card card-2">
              <div className="card-icon">🚀</div>
              <p>Fast Delivery</p>
            </div>
            <div className="floating-card card-3">
              <div className="card-icon">💳</div>
              <p>Secure Payment</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose Us</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Lightning Fast</h3>
              <p>Experience blazing fast checkout and delivery. Get your orders in record time.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure & Safe</h3>
              <p>Your data and payments are protected with industry-leading security measures.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌟</div>
              <h3>Premium Quality</h3>
              <p>We curate only the best products to ensure you get value for your money.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h3>24/7 Support</h3>
              <p>Our customer support team is always ready to help you with any questions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Shopping?</h2>
            <p>Join thousands of satisfied customers today</p>
            <Link to="/products" className="btn btn-primary btn-large">
              Browse Products
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
