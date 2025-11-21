import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { removeFromCart, updateQuantity, applyCoupon, removeCoupon, clearCart } from '../store/slices/cartSlice';
import { getAllCoupons } from '../data/coupons';

export default function Checkout() {
  const { isDark } = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items, totalPrice, totalItems, couponCode, discount, discountPercentage, finalPrice } = useAppSelector(
    (state) => state.cart
  );
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleApplyCoupon = () => {
    try {
      setCouponError('');
      dispatch(applyCoupon(couponInput));
      setCouponInput('');
    } catch (error) {
      setCouponError(error.message);
    }
  };

  const handleRemoveCoupon = () => {
    dispatch(removeCoupon());
    setCouponInput('');
    setCouponError('');
  };

  const handlePlaceOrder = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    // Simulate order placement
    setOrderPlaced(true);
    setTimeout(() => {
      dispatch(clearCart());
      navigate('/products');
    }, 2000);
  };

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className={`min-h-screen flex items-center justify-center py-8 px-4 sm:px-6 transition-colors duration-300 ${
        isDark 
          ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white' 
          : 'bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 text-gray-900'
      }`}>
        <div className="max-w-2xl mx-auto w-full">
          <div className="text-center py-16 md:py-24">
            <div className="text-6xl md:text-8xl mb-6 opacity-50">🛒</div>
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-3">Your cart is empty</h2>
            <p className="text-lg md:text-xl opacity-70 mb-8">Add some products to your cart to checkout</p>
            <Link to="/products" className="btn btn-primary btn-large">
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className={`min-h-screen flex items-center justify-center py-8 px-4 sm:px-6 transition-colors duration-300 ${
        isDark 
          ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white' 
          : 'bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 text-gray-900'
      }`}>
        <div className="max-w-2xl mx-auto w-full">
          <div className="text-center py-16 md:py-24">
            <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 bg-green-500 rounded-full flex items-center justify-center text-4xl md:text-5xl text-white">
              ✓
            </div>
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-3">Order Placed Successfully!</h2>
            <p className="text-lg md:text-xl opacity-70 mb-8">Thank you for your purchase. Your order will be delivered soon.</p>
            <Link to="/products" className="btn btn-primary btn-large">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const availableCoupons = getAllCoupons();

  return (
    <div className={`min-h-screen transition-colors duration-300 py-8 px-4 sm:px-6 lg:px-8 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white' 
        : 'bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 text-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold mb-3 gradient-text">
            Checkout
          </h1>
          <p className="text-lg sm:text-xl opacity-80">Review your order and complete your purchase</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            <div className="glass rounded-2xl p-6 md:p-8 shadow-lg">
              <h2 className="text-2xl font-heading font-bold mb-6">Your Items ({totalItems})</h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row gap-4 p-4 border-2 border-gray-200/50 dark:border-white/10 rounded-xl">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full sm:w-24 h-24 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect width="100" height="100" fill="%23f0f0f0"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999" font-family="Arial" font-size="12"%3EProduct%3C/text%3E%3C/svg%3E';
                      }}
                    />
                    <div className="flex-1 space-y-2">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="text-xl font-bold text-primary-500">${item.price.toFixed(2)}</span>
                        <div className="flex items-center gap-2 border-2 border-gray-200/50 dark:border-white/10 rounded-lg p-1">
                          <button
                            onClick={() => dispatch(updateQuantity({ productId: item.id, quantity: item.quantity - 1 }))}
                            className="w-8 h-8 rounded flex items-center justify-center hover:bg-primary-500/10 transition-colors"
                          >
                            −
                          </button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => dispatch(updateQuantity({ productId: item.id, quantity: item.quantity + 1 }))}
                            className="w-8 h-8 rounded flex items-center justify-center hover:bg-primary-500/10 transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-lg font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                        <button
                          onClick={() => dispatch(removeFromCart(item.id))}
                          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-500/10 text-red-500 transition-colors"
                          aria-label="Remove item"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="glass rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg lg:sticky lg:top-24">
              <h2 className="text-2xl font-heading font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm md:text-base">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm md:text-base">
                  <span>Shipping</span>
                  <span className="font-semibold text-green-500">Free</span>
                </div>
                {couponCode && (
                  <div className="flex justify-between text-sm md:text-base text-green-500">
                    <span>Discount ({couponCode})</span>
                    <span className="font-semibold">-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t-2 border-gray-200/50 dark:border-white/10 pt-4 flex justify-between text-lg md:text-xl font-bold">
                  <span>Total</span>
                  <span className="text-primary-500">${finalPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* Coupon Section */}
              <div className="mb-6 p-4 border-2 border-gray-200/50 dark:border-white/10 rounded-xl space-y-3">
                <h3 className="font-semibold">Have a coupon code?</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 px-4 py-2 rounded-lg border-2 border-gray-200/50 dark:border-white/10 bg-white/50 dark:bg-white/5 outline-none focus:border-primary-500 transition-colors"
                    disabled={!!couponCode}
                  />
                  {couponCode ? (
                    <button onClick={handleRemoveCoupon} className="btn btn-secondary px-4 py-2">
                      Remove
                    </button>
                  ) : (
                    <button onClick={handleApplyCoupon} className="btn btn-primary px-4 py-2">
                      Apply
                    </button>
                  )}
                </div>
                {couponError && <p className="text-red-500 text-sm">{couponError}</p>}
                {couponCode && <p className="text-green-500 text-sm">Coupon '{couponCode}' applied!</p>}

                <div className="mt-4 pt-4 border-t border-gray-200/50 dark:border-white/10">
                  <h4 className="text-sm font-semibold mb-2">Available Coupons:</h4>
                  <ul className="space-y-1 text-xs opacity-70">
                    {availableCoupons.slice(0, 3).map((coupon) => (
                      <li key={coupon.code}>
                        <strong>{coupon.code}</strong>: {coupon.discount}% off (min ${coupon.minAmount})
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="btn btn-primary btn-full btn-large"
                disabled={items.length === 0}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
