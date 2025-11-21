import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchProducts, setSelectedCategory, setSearchTerm, setSortBy } from '../store/slices/productsSlice';
import { addToWishlist, removeFromWishlist } from '../store/slices/wishlistSlice';
import { categories } from '../data/products';
import './Products.css';

export default function Products() {
  const { isDark } = useTheme();
  const dispatch = useAppDispatch();
  const { filteredProducts, selectedCategory, searchTerm, sortBy, isLoading, products } = useAppSelector(
    (state) => state.products
  );
  const { items: wishlistItems } = useAppSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className={`products-page ${isDark ? 'dark' : 'light'}`}>
      <div className="products-container">
        {/* Header */}
        <div className="products-header">
          <h1 className="page-title">Our Products</h1>
          <p className="page-subtitle">Discover amazing products at great prices</p>
        </div>

        {/* Filters and Search */}
        <div className="filters-section">
          <div className="search-box">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
              className="search-input"
            />
          </div>

          <div className="filters">
            <div className="category-filter">
              {categories.map(category => (
                <button
                  key={category}
                  className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => dispatch(setSelectedCategory(category))}
                >
                  {category}
                </button>
              ))}
            </div>

            <select
              value={sortBy}
              onChange={(e) => dispatch(setSortBy(e.target.value))}
              className="sort-select"
            >
              <option value="default">Sort by: Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {isLoading ? (
            <div className="no-products">
              <p>Loading products...</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map(product => {
              const isInWishlist = wishlistItems.some((item) => item.id === product.id);
              return (
                <div key={product.id} className="product-card-wrapper">
                  <Link
                    to={`/products/${product.id}`}
                    className="product-card"
                  >
                    <div className="product-image-container">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="product-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300"%3E%3Crect width="300" height="300" fill="%23f0f0f0"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999" font-family="Arial" font-size="16"%3EProduct Image%3C/text%3E%3C/svg%3E';
                    }}
                      />
                      {product.originalPrice > product.price && (
                        <span className="discount-badge">
                          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                        </span>
                      )}
                      {!product.inStock && (
                        <span className="out-of-stock-badge">Out of Stock</span>
                      )}
                    </div>
                <div className="product-info">
                  <span className="product-category">{product.category}</span>
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-rating">
                    <span className="stars">
                      {'★'.repeat(Math.floor(product.rating))}
                      {'☆'.repeat(5 - Math.floor(product.rating))}
                    </span>
                    <span className="rating-text">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                  <div className="product-price">
                    <span className="current-price">${product.price.toFixed(2)}</span>
                    {product.originalPrice > product.price && (
                      <span className="original-price">${product.originalPrice.toFixed(2)}</span>
                    )}
                  </div>
                </div>
                  </Link>
                  <button
                    className={`wishlist-btn ${isInWishlist ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (isInWishlist) {
                        dispatch(removeFromWishlist(product.id));
                      } else {
                        dispatch(addToWishlist(product));
                      }
                    }}
                    title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    {isInWishlist ? '♥' : '♡'}
                  </button>
                </div>
              );
            })
          ) : (
            <div className="no-products">
              <p>No products found. Try adjusting your filters.</p>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="results-count">
          Showing {filteredProducts.length} of {products.length} products
        </div>
      </div>
    </div>
  );
}
