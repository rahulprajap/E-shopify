import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchProducts, setSelectedCategory, setSearchTerm, setSortBy } from '../store/slices/productsSlice';
import { addToWishlist, removeFromWishlist } from '../store/slices/wishlistSlice';
import { categories } from '../data/products';

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
    <div className={`min-h-screen transition-colors duration-300 py-8 px-4 sm:px-6 lg:px-8 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white' 
        : 'bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 text-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold mb-3 gradient-text">
            Our Products
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl opacity-80">
            Discover amazing products at great prices
          </p>
        </div>

        {/* Filters and Search */}
          <div className="mb-6 sm:mb-8 md:mb-12 space-y-3 sm:space-y-4">
          <div className="glass rounded-xl sm:rounded-2xl p-3 sm:p-4 flex items-center gap-3 sm:gap-4 shadow-lg">
            <svg width="18" height="18" className="sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-50 flex-shrink-0">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
              className="flex-1 bg-transparent border-none outline-none text-sm sm:text-base placeholder:opacity-50"
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  className={`px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm md:text-base font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-primary-500 to-purple-600 text-white shadow-lg'
                      : 'glass border-2 border-gray-200/50 dark:border-white/10 hover:-translate-y-0.5 hover:shadow-md'
                  }`}
                  onClick={() => dispatch(setSelectedCategory(category))}
                >
                  {category}
                </button>
              ))}
            </div>

            <select
              value={sortBy}
              onChange={(e) => dispatch(setSortBy(e.target.value))}
              className="glass border-2 border-gray-200/50 dark:border-white/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 text-xs sm:text-sm md:text-base cursor-pointer outline-none focus:border-primary-500 transition-colors"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8 mb-6 sm:mb-8">
          {isLoading ? (
            <div className="col-span-full text-center py-16 opacity-70">
              <p className="text-lg">Loading products...</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map(product => {
              const isInWishlist = wishlistItems.some((item) => item.id === product.id);
              return (
                <div key={product.id} className="relative group">
                  <Link
                    to={`/products/${product.id}`}
                    className="glass rounded-2xl overflow-hidden shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
                  >
                    <div className="relative w-full pt-[100%] overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300"%3E%3Crect width="300" height="300" fill="%23f0f0f0"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999" font-family="Arial" font-size="16"%3EProduct Image%3C/text%3E%3C/svg%3E';
                        }}
                      />
                      {product.originalPrice > product.price && (
                        <span className="absolute top-4 right-4 bg-gradient-to-r from-primary-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                        </span>
                      )}
                      {!product.inStock && (
                        <span className="absolute top-4 left-4 bg-red-500/90 text-white px-3 py-1 rounded-full text-xs font-bold">
                          Out of Stock
                        </span>
                      )}
                    </div>
                    <div className="p-4 md:p-6 flex flex-col gap-2 flex-1">
                      <span className="text-xs uppercase tracking-wider opacity-60 font-semibold">
                        {product.category}
                      </span>
                      <h3 className="text-base md:text-lg font-semibold line-clamp-2">{product.name}</h3>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-yellow-400 text-base">
                          {'★'.repeat(Math.floor(product.rating))}
                          {'☆'.repeat(5 - Math.floor(product.rating))}
                        </span>
                        <span className="opacity-70 text-xs md:text-sm">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-auto">
                        <span className="text-xl md:text-2xl font-bold text-primary-500">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-sm md:text-base line-through opacity-50">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                  <button
                    className={`absolute top-4 right-4 w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center text-xl transition-all duration-300 hover:scale-110 shadow-lg z-10 ${
                      isInWishlist
                        ? 'bg-red-500/20 text-red-500'
                        : 'bg-white/90 dark:bg-gray-900/90 text-gray-600 dark:text-gray-300'
                    }`}
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
            <div className="col-span-full text-center py-16 opacity-70">
              <p className="text-lg">No products found. Try adjusting your filters.</p>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="text-center py-3 sm:py-4 opacity-70 text-xs sm:text-sm md:text-base">
          Showing {filteredProducts.length} of {products.length} products
        </div>
      </div>
    </div>
  );
}
