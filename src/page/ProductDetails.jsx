import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchProductById, clearSelectedProduct } from '../store/slices/productsSlice';
import { addToCart } from '../store/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../store/slices/wishlistSlice';
import './ProductDetails.css';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const dispatch = useAppDispatch();
  const { selectedProduct, isLoading, error } = useAppSelector((state) => state.products);
  const { items: wishlistItems } = useAppSelector((state) => state.wishlist);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [id, dispatch]);

  const product = selectedProduct;
  const isInWishlist = product ? wishlistItems.some((item) => item.id === product.id) : false;

  if (isLoading) {
    return (
      <div className={`product-details-page ${isDark ? 'dark' : 'light'}`}>
        <div className="not-found-container">
          <h2>Loading product...</h2>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className={`product-details-page ${isDark ? 'dark' : 'light'}`}>
        <div className="not-found-container">
          <h2>{error || 'Product not found'}</h2>
          <Link to="/products" className="btn btn-primary">Back to Products</Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ product, quantity }));
      alert(`Added ${quantity} ${product.name}(s) to cart!`);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      dispatch(addToCart({ product, quantity }));
      navigate('/checkout');
    }
  };

  const handleWishlistToggle = () => {
    if (product) {
      if (isInWishlist) {
        dispatch(removeFromWishlist(product.id));
      } else {
        dispatch(addToWishlist(product));
      }
    }
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
                  e.target.onerror = null;
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="600"%3E%3Crect width="600" height="600" fill="%23f0f0f0"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999" font-family="Arial" font-size="20"%3EProduct Image%3C/text%3E%3C/svg%3E';
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
                <button
                  onClick={handleWishlistToggle}
                  className={`btn btn-wishlist btn-large ${isInWishlist ? 'active' : ''}`}
                  title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  {isInWishlist ? '♥' : '♡'} Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

