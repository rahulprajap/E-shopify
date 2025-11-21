import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchProducts } from '../store/slices/productsSlice';
import { addToWishlist, removeFromWishlist } from '../store/slices/wishlistSlice';
import { addToCart } from '../store/slices/cartSlice';
import './Home.css';

export default function Home() {
  const { isDark } = useTheme();
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.products);
  const { items: wishlistItems } = useAppSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Get trending products (top rated products)
  const trendingProducts = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  const handleWishlistToggle = (product) => {
    if (isInWishlist(product.id)) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart({ product, quantity: 1 }));
  };

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

      {/* Trending Products Section */}
      <section className="trending-products">
        <div className="container">
          <h2 className="section-title">Trending Products</h2>
          <p className="section-subtitle">Discover our most popular and highly rated products</p>
          <div className="trending-grid">
            {trendingProducts.map((product) => (
              <div key={product.id} className="trending-card">
                <Link to={`/products/${product.id}`} className="trending-image-link">
                  <div className="trending-image-container">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="trending-image"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300"%3E%3Crect width="300" height="300" fill="%23f0f0f0"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999" font-family="Arial" font-size="16"%3EProduct Image%3C/text%3E%3C/svg%3E';
                      }}
                    />
                    {product.originalPrice > product.price && (
                      <span className="discount-badge">
                        {Math.round(
                          ((product.originalPrice - product.price) /
                            product.originalPrice) *
                            100
                        )}
                        % OFF
                      </span>
                    )}
                    <button
                      className={`wishlist-btn ${isInWishlist(product.id) ? 'active' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleWishlistToggle(product);
                      }}
                      title={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                      {isInWishlist(product.id) ? '♥' : '♡'}
                    </button>
                  </div>
                </Link>
                <div className="trending-info">
                  <span className="trending-category">{product.category}</span>
                  <Link to={`/products/${product.id}`} className="trending-name-link">
                    <h3 className="trending-name">{product.name}</h3>
                  </Link>
                  <div className="trending-rating">
                    <span className="stars">
                      {'★'.repeat(Math.floor(product.rating))}
                      {'☆'.repeat(5 - Math.floor(product.rating))}
                    </span>
                    <span className="rating-text">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                  <div className="trending-price">
                    <span className="current-price">${product.price.toFixed(2)}</span>
                    {product.originalPrice > product.price && (
                      <span className="original-price">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <div className="trending-actions">
                    <button
                      className="btn btn-primary btn-small"
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.inStock}
                    >
                      Add to Cart
                    </button>
                    <Link
                      to={`/products/${product.id}`}
                      className="btn btn-secondary btn-small"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="trending-footer">
            <Link to="/products" className="btn btn-primary btn-large">
              View All Products
            </Link>
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
