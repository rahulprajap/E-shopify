// Dummy coupon codes data
export const coupons = {
  'SAVE10': {
    code: 'SAVE10',
    discount: 10,
    minAmount: 50,
    description: 'Get 10% off on orders above $50',
    valid: true,
    expiryDate: '2024-12-31',
  },
  'SAVE20': {
    code: 'SAVE20',
    discount: 20,
    minAmount: 100,
    description: 'Get 20% off on orders above $100',
    valid: true,
    expiryDate: '2024-12-31',
  },
  'WELCOME15': {
    code: 'WELCOME15',
    discount: 15,
    minAmount: 30,
    description: 'Welcome offer! Get 15% off on orders above $30',
    valid: true,
    expiryDate: '2024-12-31',
  },
  'FLAT50': {
    code: 'FLAT50',
    discount: 50,
    minAmount: 200,
    description: 'Flat $50 off on orders above $200',
    valid: true,
    expiryDate: '2024-12-31',
  },
  'SUMMER25': {
    code: 'SUMMER25',
    discount: 25,
    minAmount: 75,
    description: 'Summer special! Get 25% off on orders above $75',
    valid: true,
    expiryDate: '2024-12-31',
  },
  'NEWUSER': {
    code: 'NEWUSER',
    discount: 30,
    minAmount: 50,
    description: 'New user special! Get 30% off on orders above $50',
    valid: true,
    expiryDate: '2024-12-31',
  },
  'FLASH30': {
    code: 'FLASH30',
    discount: 30,
    minAmount: 150,
    description: 'Flash sale! Get 30% off on orders above $150',
    valid: true,
    expiryDate: '2024-12-31',
  },
  'BIGSAVE': {
    code: 'BIGSAVE',
    discount: 40,
    minAmount: 250,
    description: 'Big savings! Get 40% off on orders above $250',
    valid: true,
    expiryDate: '2024-12-31',
  },
  'FIRST5': {
    code: 'FIRST5',
    discount: 5,
    minAmount: 20,
    description: 'Get 5% off on orders above $20',
    valid: true,
    expiryDate: '2024-12-31',
  },
  'MEGA60': {
    code: 'MEGA60',
    discount: 60,
    minAmount: 300,
    description: 'Mega discount! Get 60% off on orders above $300',
    valid: true,
    expiryDate: '2024-12-31',
  },
};

// Helper function to get coupon by code
export const getCouponByCode = (code) => {
  return coupons[code.toUpperCase()] || null;
};

// Helper function to validate coupon
export const validateCoupon = (code, totalAmount) => {
  const coupon = getCouponByCode(code);
  
  if (!coupon) {
    return { valid: false, error: 'Invalid coupon code' };
  }
  
  if (!coupon.valid) {
    return { valid: false, error: 'This coupon is no longer valid' };
  }
  
  // Check expiry date
  const today = new Date();
  const expiryDate = new Date(coupon.expiryDate);
  if (today > expiryDate) {
    return { valid: false, error: 'This coupon has expired' };
  }
  
  if (totalAmount < coupon.minAmount) {
    return {
      valid: false,
      error: `Minimum order amount of $${coupon.minAmount} required for this coupon`,
    };
  }
  
  return { valid: true, coupon };
};

// Get all valid coupons
export const getAllCoupons = () => {
  return Object.values(coupons).filter((coupon) => coupon.valid);
};

// Get available coupon codes list
export const getAvailableCouponCodes = () => {
  return Object.keys(coupons);
};

