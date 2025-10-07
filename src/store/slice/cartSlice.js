import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//  Async thunk to add item to cart
export const addItemToCart = createAsyncThunk(
  "cart/addItem",
  async (item, { rejectWithValue }) => {
    try {
    
      const response = await axios.post("http://localhost:5000/api/products/productFeedback/cart", item, { withCredentials: true, });
      // console.log(response,"cartdata")
      return {
        status: response.status,     // Include status
        data: response.data          //  Include response body
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to add item to cart");
    }
  }
);
// http://localhost:5000/api/products/productFeedback/cart/68c5380de43e080134605513
// Async thunk to fetch cart items
export const fetchCartByUserId = createAsyncThunk(
  "cart/fetchByUserId",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/products/productFeedback/Usercart`, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch user cart");
    }
  }
);

//  Initial state
const initialState = {
  addCart: null,
  cartItems: null,
  loading: false,
  error: null,
};

//  Cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart(state) {
      state.cartItems = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add Item to Cart
      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.addCart = {
          status: action.payload.status,
          data: action.payload.data
        };
      })

      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Cart Items
      .addCase(fetchCartByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .addCase(fetchCartByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;