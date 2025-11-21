import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { products } from '../../data/products';

// Initial state
const initialState = {
  products: products,
  filteredProducts: products,
  selectedProduct: null,
  selectedCategory: 'All',
  searchTerm: '',
  sortBy: 'default',
  isLoading: false,
  error: null,
};

// Async thunk for fetching products (simulated)
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      return products;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching single product
export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (productId, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300));
      const product = products.find((p) => p.id === parseInt(productId));
      if (!product) {
        throw new Error('Product not found');
      }
      return product;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.filteredProducts = filterAndSortProducts(
        state.products,
        action.payload,
        state.searchTerm,
        state.sortBy
      );
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.filteredProducts = filterAndSortProducts(
        state.products,
        state.selectedCategory,
        action.payload,
        state.sortBy
      );
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      state.filteredProducts = filterAndSortProducts(
        state.products,
        state.selectedCategory,
        state.searchTerm,
        action.payload
      );
    },
    clearFilters: (state) => {
      state.selectedCategory = 'All';
      state.searchTerm = '';
      state.sortBy = 'default';
      state.filteredProducts = state.products;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Products
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
        state.filteredProducts = filterAndSortProducts(
          action.payload,
          state.selectedCategory,
          state.searchTerm,
          state.sortBy
        );
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Fetch Product By ID
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedProduct = action.payload;
        state.error = null;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.selectedProduct = null;
      });
  },
});

// Helper function to filter and sort products
function filterAndSortProducts(products, category, searchTerm, sortBy) {
  let filtered = products.filter((product) => {
    const matchesCategory = category === 'All' || product.category === category;
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort products
  switch (sortBy) {
    case 'price-low':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case 'name':
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      break;
  }

  return filtered;
}

export const {
  setSelectedCategory,
  setSearchTerm,
  setSortBy,
  clearFilters,
  clearSelectedProduct,
} = productsSlice.actions;
export default productsSlice.reducer;

