import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

import axios from 'axios';

export const fetchFeedbacks = createAsyncThunk(
  "feedbacks/fetchFeedbacks",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/products/productFeedback/getfeedback/${productId}`,
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch feedbacks'
      );
    }
  }
);

export const createFeedback = createAsyncThunk(
    "feedbacks/createFeedback",
    async (feedback, { rejectWithValue }) => {
        try {
            console.log(feedback,"feedback")
            const response = await axios.post("http://localhost:5000/api/products/productFeedback/create", feedback, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create feedback');   
        }
    }   
);
     
   

const feedbackSlice = createSlice({
    name: "feedbacks",
    initialState: {
        items: [],
         createFeedback:null,
        status: null,
        error: null
    },
    reducers: {
        ClearFeedback: (state) => {
            state.items = [];
        }
    },
    extraReducers: (builder) => {
        builder

                .addCase(fetchFeedbacks.pending, (state) => {
                    state.status = 'loading';
                })
                .addCase(fetchFeedbacks.fulfilled, (state, action) => {
                    state.status = 'succeeded';
                    state.items = action.payload;
                })
                .addCase(fetchFeedbacks.rejected, (state, action) => {
                    state.status = 'failed';
                    state.error = action.error.message;
                })  
                // create feedback 
                .addCase(createFeedback.pending, (state) => {
                    state.status = 'loading';
                })
                .addCase(createFeedback.fulfilled, (state, action) => {
                    state.status = 'succeeded';
                    state.createFeedback = action.payload;
                })
                .addCase(createFeedback.rejected, (state, action) => {
                    state.status = 'failed';
                    state.error = action.error.message;
                });
    }
});
export const { ClearFeedback } = feedbackSlice.actions;
export default feedbackSlice.reducer;