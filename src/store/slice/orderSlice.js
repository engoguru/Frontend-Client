// orderSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🔹 Async thunk to fetch orders for a specific user
export const orderGetByUser = createAsyncThunk(
  "order/userOrderGet",
  async (id, thunkAPI) => {
    try {
   
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
export const getCoupon = createAsyncThunk(
  "coupon/getCoupon",
  async (_, thunkAPI) => {
    try {
     const res = await axios.get("http://localhost:5000/api/order/coupon/getCoupon",{withCredentials:true});
console.log(res)
      return res?.data; // or adjust based on your API response shape
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create order"
      );
    }
  }
);
   
export const updateCoupon=createAsyncThunk(
  "coupon/updateCoupon",
   async (couponId, thunkAPI) => {
    console.log(couponId,"slive")
    try {
   const res = await axios.post(
  `http://localhost:5000/api/order/coupon/updateCoupon/${couponId}`,
  {},                       // empty data payload or your real data here
  { withCredentials: true } // config object here!
);


      return res?.data; // or adjust based on your API response shape
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create order"
      );
    }
  }
  
)

//Initial State
const initialState = {
  orderUserSpecific: [], // typo fixed from "orderUserSpciffic"
  orderCreated: null,
  availableCoupon:[],
  updateUsedCoupon:null,
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
        state.updateUsedCoupon = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })



      // coupon get
        .addCase(getCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.availableCoupon = action.payload.data;
      })
      .addCase(getCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })



         // coupon update
        .addCase(updateCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.availableCoupon = action.payload.data;
      })
      .addCase(updateCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      ;
  },
});

//  Export actions & reducer
export const { clearOrderInfo } = orderSlice.actions;
export default orderSlice.reducer;
