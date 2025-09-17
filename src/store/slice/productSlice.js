import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch products with filters and pagination
export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async (params, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:5000/api/products/productList/search', {
        params: {
          query: params.search || '',
          productName: params.productName,
          productBrand: params.productBrand,
          productCategory: params.productCategory,
          productTags: params.productTags,
          servingSize: params.servingSize,
          weight: params.weight,
          material: params.material,
          gender: params.gender,
          fit: params.fit,
          minPrice: params.minPrice,
          maxPrice: params.maxPrice,
          color: params.color,
          page: params.page || 1,
          limit: params.limit || 10,
        },
      });

      return response.data;

    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch products");
    }
  }
);

// Initial state
const initialState = {
  products: [],
  loading: false,
  error: null,
  totalCount: 0,
  currentPage: 1,
  totalPages: 1,
};

// Product slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProductInfo(state) {
      state.products = [];
      state.totalCount = 0;
      state.currentPage = 1;
      state.totalPages = 1;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.totalCount = action.payload.totalCount;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearProductInfo } = productSlice.actions;
export default productSlice.reducer;
