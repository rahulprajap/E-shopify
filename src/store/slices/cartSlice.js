import { createSlice } from '@reduxjs/toolkit';
import { validateCoupon } from '../../data/coupons';

// Get cart from localStorage if available
const getInitialCart = () => {
  const savedCart = localStorage.getItem('cart');
  return savedCart ? JSON.parse(savedCart) : [];
};

// Initial state
const initialState = {
  items: getInitialCart(),
  totalItems: getInitialCart().reduce((sum, item) => sum + item.quantity, 0),
  totalPrice: getInitialCart().reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  ),
  couponCode: '',
  discount: 0,
  discountPercentage: 0,
  finalPrice: getInitialCart().reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  ),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1 } = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity,
        });
      }

      // Update totals
      recalculateTotals(state);

      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.id !== productId);

      // Update totals
      recalculateTotals(state);

      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find((item) => item.id === productId);

      if (item) {
        if (quantity <= 0) {
          // Remove item if quantity is 0 or less
          state.items = state.items.filter((item) => item.id !== productId);
        } else {
          item.quantity = quantity;
        }

        // Update totals
        recalculateTotals(state);

        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(state.items));
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
      state.couponCode = '';
      state.discount = 0;
      state.discountPercentage = 0;
      state.finalPrice = 0;
      localStorage.removeItem('cart');
    },
    applyCoupon: (state, action) => {
      const couponCode = action.payload.toUpperCase();
      const validation = validateCoupon(couponCode, state.totalPrice);

      if (!validation.valid) {
        throw new Error(validation.error);
      }

      const coupon = validation.coupon;
      state.couponCode = couponCode;
      state.discountPercentage = coupon.discount;
      state.discount = (state.totalPrice * coupon.discount) / 100;
      state.finalPrice = state.totalPrice - state.discount;
    },
    removeCoupon: (state) => {
      state.couponCode = '';
      state.discount = 0;
      state.discountPercentage = 0;
      state.finalPrice = state.totalPrice;
    },
  },
});

// Helper function to recalculate totals
const recalculateTotals = (state) => {
  state.totalItems = state.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  state.totalPrice = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  
  // Recalculate discount if coupon is applied
  if (state.couponCode) {
    const validation = validateCoupon(state.couponCode, state.totalPrice);
    if (validation.valid) {
      const coupon = validation.coupon;
      state.discountPercentage = coupon.discount;
      state.discount = (state.totalPrice * coupon.discount) / 100;
      state.finalPrice = state.totalPrice - state.discount;
    } else {
      // Coupon is no longer valid, remove it
      state.couponCode = '';
      state.discount = 0;
      state.discountPercentage = 0;
      state.finalPrice = state.totalPrice;
    }
  } else {
    state.finalPrice = state.totalPrice;
  }
};

export const { addToCart, removeFromCart, updateQuantity, clearCart, applyCoupon, removeCoupon } =
  cartSlice.actions;
export default cartSlice.reducer;

