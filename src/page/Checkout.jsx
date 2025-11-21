import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { removeFromCart, updateQuantity, applyCoupon, removeCoupon, clearCart } from '../store/slices/cartSlice';
import { getAllCoupons } from '../data/coupons';
import './Checkout.css';

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
      <div className={`checkout-page ${isDark ? 'dark' : 'light'}`}>
        <div className="checkout-container">
          <div className="empty-cart">
            <div className="empty-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Add some products to your cart to checkout</p>
            <Link to="/products" className="btn btn-primary">
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className={`checkout-page ${isDark ? 'dark' : 'light'}`}>
        <div className="checkout-container">
          <div className="order-success">
            <div className="success-icon">✓</div>
            <h2>Order Placed Successfully!</h2>
            <p>Thank you for your purchase. Your order will be delivered soon.</p>
            <Link to="/products" className="btn btn-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`checkout-page ${isDark ? 'dark' : 'light'}`}>
      <div className="checkout-container">
        <div className="checkout-header">
          <h1 className="page-title">Checkout</h1>
        </div>

        <div className="checkout-content">
          {/* Cart Items */}
          <div className="checkout-section">
            <h2 className="section-title">Order Summary</h2>
            <div className="cart-items">
              {items.map((item) => (
                <div key={item.id} className="cart-item">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect width="100" height="100" fill="%23f0f0f0"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999" font-family="Arial" font-size="12"%3EProduct%3C/text%3E%3C/svg%3E';
                    }}
                  />
                  <div className="cart-item-info">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <div className="cart-item-price">${item.price.toFixed(2)}</div>
                  </div>
                  <div className="cart-item-quantity">
                    <button
                      onClick={() => dispatch(updateQuantity({ productId: item.id, quantity: item.quantity - 1 }))}
                      className="quantity-btn"
                    >
                      −
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button
                      onClick={() => dispatch(updateQuantity({ productId: item.id, quantity: item.quantity + 1 }))}
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </div>
                  <div className="cart-item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="remove-btn"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="checkout-section checkout-summary">
            <h2 className="section-title">Order Details</h2>

            {/* Coupon Code */}
            <div className="coupon-section">
              <h3>Apply Coupon</h3>
              {couponCode ? (
                <div className="coupon-applied">
                  <span>Coupon: {couponCode} ({discountPercentage}% OFF)</span>
                  <button onClick={handleRemoveCoupon} className="remove-coupon-btn">
                    Remove
                  </button>
                </div>
              ) : (
                <div className="coupon-input-group">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponInput}
                    onChange={(e) => {
                      setCouponInput(e.target.value);
                      setCouponError('');
                    }}
                    className="coupon-input"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleApplyCoupon();
                      }
                    }}
                  />
                  <button onClick={handleApplyCoupon} className="btn btn-secondary">
                    Apply
                  </button>
                </div>
              )}
              {couponError && <div className="coupon-error">{couponError}</div>}
              <div className="coupon-hint">
                <p><strong>Available coupons:</strong></p>
                <div className="coupon-list">
                  {getAllCoupons().map((coupon) => (
                    <div key={coupon.code} className="coupon-item">
                      <span className="coupon-code">{coupon.code}</span>
                      <span className="coupon-desc">{coupon.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="price-breakdown">
              <div className="price-row">
                <span>Subtotal ({totalItems} items)</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              {couponCode && (
                <>
                  <div className="price-row discount-row">
                    <span>Discount ({couponCode})</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                </>
              )}
              <div className="price-row total-row">
                <span>Total</span>
                <span>${finalPrice.toFixed(2)}</span>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              className="btn btn-primary btn-large btn-full"
            >
              {isAuthenticated ? 'Place Order' : 'Login to Place Order'}
            </button>

            {!isAuthenticated && (
              <p className="login-prompt">
                <Link to="/login">Login</Link> or <Link to="/signup">Sign up</Link> to place your order
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

