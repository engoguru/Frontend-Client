// orderSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🔹 Async thunk to fetch orders for a specific user
export const orderGetByUser = createAsyncThunk(
  "order/userOrderGet",
  async (id, thunkAPI) => {
    try {
      console.log(id, "sdfiwef");
      const response = await axios.get(
        `http://localhost:5000/api/order/orderRoutes/getUserOrder/${id}`
      ); // adjust URL
      return response.data.data; // or adjust based on your API response shape
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch orders"
      );
    }
  }
);

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (orderData, thunkAPI) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/order/orderRoutes/create`,
        orderData,
        {
          withCredentials: true,
        }
      );

      return response.data.data; // or adjust based on your API response shape
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create order"
      );
    }
  }
);

//Initial State
const initialState = {
  orderUserSpecific: [], // typo fixed from "orderUserSpciffic"
  orderCreated: null,
  loading: false,
  error: null,
};

//  Slice
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearOrderInfo(state) {
      state.orderUserSpecific = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderGetByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(orderGetByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.orderUserSpecific = action.payload;
      })
      .addCase(orderGetByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // order created cases
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderCreated = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

//  Export actions & reducer
export const { clearOrderInfo } = orderSlice.actions;
export default orderSlice.reducer;
