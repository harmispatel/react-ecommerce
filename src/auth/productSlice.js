import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  filteredProducts: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
      state.filteredProducts = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setFilteredProducts(state, action) {
      state.filteredProducts = state.products.filter((product) =>
        product.title.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    clearFilteredProducts(state) {
      state.filteredProducts = state.products;
    },
  },
});

export const {
  setProducts,
  setLoading,
  setError,
  setFilteredProducts,
  clearFilteredProducts,
} = productSlice.actions;

export default productSlice.reducer;
