import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { removeFromWishlist, moveToCart } from '../store/slices/wishlistSlice';
import { addToCart } from '../store/slices/cartSlice';

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
    <div className={`min-h-screen transition-colors duration-300 py-8 px-4 sm:px-6 lg:px-8 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white' 
        : 'bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 text-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold mb-3 gradient-text">
            My Wishlist
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl opacity-80">
            {items.length > 0
              ? `You have ${items.length} item${items.length > 1 ? 's' : ''} in your wishlist`
              : 'Your wishlist is empty'}
          </p>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {items.map((product) => (
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
                  </div>
                </Link>

                <div className="p-4 md:p-6 flex flex-col gap-3 flex-1">
                  <Link to={`/products/${product.id}`} className="hover:text-primary-500 transition-colors">
                    <span className="text-xs uppercase tracking-wider opacity-60 font-semibold block mb-1">
                      {product.category}
                    </span>
                    <h3 className="text-base md:text-lg font-semibold line-clamp-2">{product.name}</h3>
                  </Link>

                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-yellow-400 text-base">
                      {'★'.repeat(Math.floor(product.rating))}
                      {'☆'.repeat(5 - Math.floor(product.rating))}
                    </span>
                    <span className="opacity-70 text-xs md:text-sm">{product.rating}</span>
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

                  <div className="flex flex-col sm:flex-row gap-3 mt-4">
                    <button
                      className="btn btn-primary flex-1"
                      onClick={() => handleMoveToCart(product)}
                    >
                      Add to Cart
                    </button>
                    <button
                      className="btn btn-secondary flex-1"
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
          <div className="text-center py-16 md:py-24">
            <div className="text-6xl md:text-8xl mb-6 opacity-50">♡</div>
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-3">Your wishlist is empty</h2>
            <p className="text-lg md:text-xl opacity-70 mb-8">Start adding products you love to your wishlist</p>
            <Link to="/products" className="btn btn-primary btn-large">
              Browse Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
