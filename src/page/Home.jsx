import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchProducts } from '../store/slices/productsSlice';
import { addToWishlist, removeFromWishlist } from '../store/slices/wishlistSlice';
import { addToCart } from '../store/slices/cartSlice';

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
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white' 
        : 'bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 text-gray-900'
    }`}>
      {/* Hero Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left space-y-4 sm:space-y-6 animate-fade-in-up">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-extrabold leading-tight">
                Welcome to <span className="gradient-text">Shopify</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl opacity-90 max-w-2xl mx-auto lg:mx-0">
                Discover amazing products and shop with confidence. 
                Your one-stop destination for all your shopping needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start pt-2 sm:pt-4">
                <Link to="/products" className="btn btn-primary text-center">
                  Shop Now
                </Link>
                <Link to="/signup" className="btn btn-secondary text-center">
                  Get Started
                </Link>
              </div>
            </div>
            <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] hidden lg:block">
              <div className="absolute top-[10%] left-[10%] glass rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col items-center gap-2 animate-float hover:scale-105 transition-transform">
                <div className="text-3xl sm:text-4xl">🛍️</div>
                <p className="font-semibold text-xs sm:text-sm">Shop Now</p>
              </div>
              <div className="absolute top-[50%] right-[10%] glass rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col items-center gap-2 animate-float-delayed hover:scale-105 transition-transform">
                <div className="text-3xl sm:text-4xl">🚀</div>
                <p className="font-semibold text-xs sm:text-sm">Fast Delivery</p>
              </div>
              <div className="absolute bottom-[10%] left-[30%] glass rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col items-center gap-2 animate-float-delayed-2 hover:scale-105 transition-transform">
                <div className="text-3xl sm:text-4xl">💳</div>
                <p className="font-semibold text-xs sm:text-sm">Secure Payment</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Products Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white/30 dark:bg-gray-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-2 sm:mb-3 gradient-text">
              Trending Products
            </h2>
            <p className="text-base sm:text-lg md:text-xl opacity-80">
              Discover our most popular and highly rated products
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 mb-8 sm:mb-10 md:mb-12">
            {trendingProducts.map((product) => (
              <div key={product.id} className="glass rounded-2xl overflow-hidden shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 flex flex-col group">
                <Link to={`/products/${product.id}`} className="relative block">
                  <div className="relative w-full pt-[75%] overflow-hidden bg-gray-100 dark:bg-gray-800">
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
                        {Math.round(
                          ((product.originalPrice - product.price) /
                            product.originalPrice) *
                            100
                        )}
                        % OFF
                      </span>
                    )}
                    <button
                      className={`absolute top-4 left-4 w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center text-xl transition-all duration-300 hover:scale-110 shadow-lg ${
                        isInWishlist(product.id)
                          ? 'bg-red-500/20 text-red-500'
                          : 'bg-white/90 dark:bg-gray-900/90 text-gray-600 dark:text-gray-300'
                      }`}
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
                <div className="p-6 flex flex-col gap-3 flex-1">
                  <span className="text-xs uppercase tracking-wider opacity-60 font-semibold">
                    {product.category}
                  </span>
                  <Link to={`/products/${product.id}`} className="hover:text-primary-500 transition-colors">
                    <h3 className="text-lg font-semibold line-clamp-2">{product.name}</h3>
                  </Link>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-yellow-400 text-base">
                      {'★'.repeat(Math.floor(product.rating))}
                      {'☆'.repeat(5 - Math.floor(product.rating))}
                    </span>
                    <span className="opacity-70">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-auto">
                    <span className="text-2xl font-bold text-primary-500">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-base line-through opacity-50">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button
                      className="btn btn-primary btn-small flex-1"
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.inStock}
                    >
                      Add to Cart
                    </button>
                    <Link
                      to={`/products/${product.id}`}
                      className="btn btn-secondary btn-small flex-1 text-center"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/products" className="btn btn-primary btn-large">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-center mb-8 sm:mb-10 md:mb-12 gradient-text">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            <div className="glass rounded-2xl p-8 text-center hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-xl">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
              <p className="opacity-80 leading-relaxed">
                Experience blazing fast checkout and delivery. Get your orders in record time.
              </p>
            </div>
            <div className="glass rounded-2xl p-8 text-center hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-xl">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-3">Secure & Safe</h3>
              <p className="opacity-80 leading-relaxed">
                Your data and payments are protected with industry-leading security measures.
              </p>
            </div>
            <div className="glass rounded-2xl p-8 text-center hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-xl">
              <div className="text-5xl mb-4">🌟</div>
              <h3 className="text-xl font-semibold mb-3">Premium Quality</h3>
              <p className="opacity-80 leading-relaxed">
                We curate only the best products to ensure you get value for your money.
              </p>
            </div>
            <div className="glass rounded-2xl p-8 text-center hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-xl">
              <div className="text-5xl mb-4">💬</div>
              <h3 className="text-xl font-semibold mb-3">24/7 Support</h3>
              <p className="opacity-80 leading-relaxed">
                Our customer support team is always ready to help you with any questions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-primary-500 to-purple-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 text-center text-white shadow-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-3 sm:mb-4">
              Ready to Start Shopping?
            </h2>
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-90">
              Join thousands of satisfied customers today
            </p>
            <Link to="/products" className="btn bg-white text-primary-500 hover:bg-gray-100 shadow-lg shadow-white/30 hover:shadow-xl hover:shadow-white/40">
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
