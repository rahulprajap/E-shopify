import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { removeFromWishlist, moveToCart } from '../store/slices/wishlistSlice';
import { addToCart } from '../store/slices/cartSlice';
import './Wishlist.css';

export default function Wishlist() {
  const { isDark } = useTheme();
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.wishlist);

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFromWishlist(productId));
  };

  const handleMoveToCart = (product) => {
    dispatch(addToCart({ product, quantity: 1 }));
    dispatch(moveToCart(product.id));
  };

  return (
    <div className={`wishlist-page ${isDark ? 'dark' : 'light'}`}>
      <div className="wishlist-container">
        <div className="wishlist-header">
          <h1 className="page-title">My Wishlist</h1>
          <p className="page-subtitle">
            {items.length > 0
              ? `You have ${items.length} item${items.length > 1 ? 's' : ''} in your wishlist`
              : 'Your wishlist is empty'}
          </p>
        </div>

        {items.length > 0 ? (
          <div className="wishlist-grid">
            {items.map((product) => (
              <div key={product.id} className="wishlist-card">
                <Link to={`/products/${product.id}`} className="wishlist-image-link">
                  <div className="wishlist-image-container">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="wishlist-image"
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
                  </div>
                </Link>

                <div className="wishlist-info">
                  <Link to={`/products/${product.id}`} className="wishlist-product-link">
                    <span className="wishlist-category">{product.category}</span>
                    <h3 className="wishlist-name">{product.name}</h3>
                  </Link>

                  <div className="wishlist-rating">
                    <span className="stars">
                      {'★'.repeat(Math.floor(product.rating))}
                      {'☆'.repeat(5 - Math.floor(product.rating))}
                    </span>
                    <span className="rating-value">{product.rating}</span>
                  </div>

                  <div className="wishlist-price">
                    <span className="current-price">${product.price.toFixed(2)}</span>
                    {product.originalPrice > product.price && (
                      <span className="original-price">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <div className="wishlist-actions">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleMoveToCart(product)}
                    >
                      Add to Cart
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleRemoveFromWishlist(product.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-wishlist">
            <div className="empty-icon">♡</div>
            <h2>Your wishlist is empty</h2>
            <p>Start adding products you love to your wishlist</p>
            <Link to="/products" className="btn btn-primary">
              Browse Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

