import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { products, categories } from '../data/products';
import './Products.css';

export default function Products() {
  const { isDark } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');

  const filteredProducts = products
    .filter(product => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

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
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filters">
            <div className="category-filter">
              {categories.map(category => (
                <button
                  key={category}
                  className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
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
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="product-card"
              >
                <div className="product-image-container">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x300?text=Product+Image';
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
            ))
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

