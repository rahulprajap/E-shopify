import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchProductById, clearSelectedProduct } from '../store/slices/productsSlice';
import { addToCart } from '../store/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../store/slices/wishlistSlice';

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
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        isDark 
          ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white' 
          : 'bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 text-gray-900'
      }`}>
        <div className="text-center">
          <h2 className="text-2xl font-heading">Loading product...</h2>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        isDark 
          ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white' 
          : 'bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 text-gray-900'
      }`}>
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-heading">{error || 'Product not found'}</h2>
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
    <div className={`min-h-screen transition-colors duration-300 py-8 px-4 sm:px-6 lg:px-8 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white' 
        : 'bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 text-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm opacity-70 flex-wrap">
          <Link to="/" className="hover:text-primary-500 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-primary-500 transition-colors">Products</Link>
          <span>/</span>
          <span>{product.name}</span>
        </div>

        <div className="glass rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative w-full pt-[100%] rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="600"%3E%3Crect width="600" height="600" fill="%23f0f0f0"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999" font-family="Arial" font-size="20"%3EProduct Image%3C/text%3E%3C/svg%3E';
                  }}
                />
                {discount > 0 && (
                  <span className="absolute top-4 right-4 bg-gradient-to-r from-primary-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                    {discount}% OFF
                  </span>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <span className="inline-block px-4 py-2 bg-primary-500/10 text-primary-500 rounded-full text-xs font-semibold uppercase tracking-wider">
                {product.category}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold leading-tight">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-3 text-lg">
                <div className="text-yellow-400 text-xl">
                  {'★'.repeat(Math.floor(product.rating))}
                  {'☆'.repeat(5 - Math.floor(product.rating))}
                </div>
                <span className="font-semibold">{product.rating}</span>
                <span className="opacity-70">({product.reviews} reviews)</span>
              </div>

              <div className="flex items-baseline gap-4 flex-wrap">
                <span className="text-4xl md:text-5xl font-extrabold text-primary-500">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-2xl md:text-3xl line-through opacity-50">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                    <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-sm font-semibold">
                      You save ${(product.originalPrice - product.price).toFixed(2)}
                    </span>
                  </>
                )}
              </div>

              <div className="pt-6 border-t border-gray-200/50 dark:border-white/10 space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Description</h3>
                  <p className="opacity-80 leading-relaxed">{product.description}</p>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200/50 dark:border-white/10">
                <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 opacity-90">
                      <span className="text-green-500 font-bold mt-0.5">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`p-4 rounded-xl font-semibold ${
                product.inStock 
                  ? 'bg-green-500/10 text-green-500' 
                  : 'bg-red-500/10 text-red-500'
              }`}>
                {product.inStock ? (
                  <span>✓ In Stock ({product.stockCount} available)</span>
                ) : (
                  <span>✗ Out of Stock</span>
                )}
              </div>

              <div className="pt-6 border-t border-gray-200/50 dark:border-white/10 space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <label className="font-semibold min-w-[80px]">Quantity:</label>
                  <div className="flex items-center gap-2 border-2 border-gray-200/50 dark:border-white/10 rounded-xl p-1 glass">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-xl font-semibold hover:bg-primary-500/10 transition-colors"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min="1"
                      max={product.stockCount}
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Math.min(product.stockCount, parseInt(e.target.value) || 1)))}
                      className="w-16 text-center border-none bg-transparent font-semibold outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-xl font-semibold hover:bg-primary-500/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      disabled={quantity >= product.stockCount}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    className={`btn btn-large sm:col-span-2 ${
                      isInWishlist 
                        ? 'bg-red-500/10 text-red-500 border-red-500 hover:bg-red-500/20' 
                        : 'btn-secondary'
                    }`}
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
    </div>
  );
}
