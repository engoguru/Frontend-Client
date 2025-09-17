import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch contacts                

export const submitContact = createAsyncThunk(
    'contacts/submitContact',
    async (data, { rejectWithValue }) => {

        try {
            const response = await axios.post('http://localhost:5000/api/users/contact',{
                data
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch contacts');
        }
    }
);

// Initial state
const initialState = {
    contactCreate:null   ,
    loading: false,
    error: null,
};

// Contact slice
const contactSlice = createSlice({
    name: 'contacts',

    initialState,
    reducers: {
        clearContacts(state) {
            state.contactCreate =null;
        }
    },
    extraReducers: (builder) => {
        builder


            .addCase(submitContact.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(submitContact.fulfilled, (state, action) => {
                state.loading = false;
                state.contactCreate = action.payload;
            }
            )
            .addCase(submitContact.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});
// Export actions & reducer 
export const { clearContacts } = contactSlice.actions;
export default contactSlice.reducer;