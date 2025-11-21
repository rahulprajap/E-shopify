import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { getProductById } from '../data/products';
import './ProductDetails.css';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const product = getProductById(id);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className={`product-details-page ${isDark ? 'dark' : 'light'}`}>
        <div className="not-found-container">
          <h2>Product not found</h2>
          <Link to="/products" className="btn btn-primary">Back to Products</Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    // In a real app, this would add to cart
    alert(`Added ${quantity} ${product.name}(s) to cart!`);
  };

  const handleBuyNow = () => {
    // In a real app, this would proceed to checkout
    alert(`Proceeding to checkout with ${quantity} ${product.name}(s)!`);
  };

  const discount = product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className={`product-details-page ${isDark ? 'dark' : 'light'}`}>
      <div className="product-details-container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/products">Products</Link>
          <span>/</span>
          <span>{product.name}</span>
        </div>

        <div className="product-details-content">
          {/* Product Images */}
          <div className="product-images">
            <div className="main-image">
              <img
                src={product.image}
                alt={product.name}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/600x600?text=Product+Image';
                }}
              />
              {discount > 0 && (
                <span className="discount-badge-large">{discount}% OFF</span>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="product-details-info">
            <span className="product-category-badge">{product.category}</span>
            <h1 className="product-title">{product.name}</h1>
            
            <div className="product-rating-section">
              <div className="rating-stars">
                {'★'.repeat(Math.floor(product.rating))}
                {'☆'.repeat(5 - Math.floor(product.rating))}
              </div>
              <span className="rating-value">{product.rating}</span>
              <span className="reviews-count">({product.reviews} reviews)</span>
            </div>

            <div className="product-price-section">
              <span className="current-price-large">${product.price.toFixed(2)}</span>
              {product.originalPrice > product.price && (
                <>
                  <span className="original-price-large">${product.originalPrice.toFixed(2)}</span>
                  <span className="savings">You save ${(product.originalPrice - product.price).toFixed(2)}</span>
                </>
              )}
            </div>

            <div className="product-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            <div className="product-features">
              <h3>Key Features</h3>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="product-availability">
              {product.inStock ? (
                <span className="in-stock">
                  ✓ In Stock ({product.stockCount} available)
                </span>
              ) : (
                <span className="out-of-stock">✗ Out of Stock</span>
              )}
            </div>

            <div className="product-actions">
              <div className="quantity-selector">
                <label>Quantity:</label>
                <div className="quantity-controls">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="quantity-btn"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min="1"
                    max={product.stockCount}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Math.min(product.stockCount, parseInt(e.target.value) || 1)))}
                    className="quantity-input"
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                    className="quantity-btn"
                    disabled={quantity >= product.stockCount}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="action-buttons">
                <button
                  onClick={handleAddToCart}
                  className="btn btn-secondary btn-large"
                  disabled={!product.inStock}
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="btn btn-primary btn-large"
                  disabled={!product.inStock}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

