import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const userRegister = createAsyncThunk(
  'user/userRegister',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:5000/api/users/account/register", {
        data: userData
      });
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
)

export const userLogin = createAsyncThunk(
  'user/userLogin',
  async (data, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:5000/api/users/account/userLogin", {
        data
      }, {
        withCredentials: true
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

export const userOtpVerify = createAsyncThunk(
  "user/userOtpVerify",
  async (otp, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:5000/api/users/account/userOtpVerify", {
        otp: otp
      },
        {
          withCredentials: true
        })
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
)

export const getMeDetails = createAsyncThunk(
  'user/getMeDetails',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/account/me', {
        withCredentials: true, // Important to send cookies!
      });
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message);
    }

  }
)


export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:5000/api/users/account/GetAll");
      // console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);


export const forgetPassword = createAsyncThunk(
  'user/forgetPassword',
  async (data, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:5000/api/users/account/forget-password", {
        data
      })
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message)
    }
  }
)

export const setNewPasswword = createAsyncThunk(
  'user/setNewPasswword',
  async (data, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:5000/api/users/account/setPassword", {
        data
      })
      return{
        status: response.status,
        data: response.data
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message)
    }
  }
)


export const updateAddress = createAsyncThunk(
  'user/updateAddress',
  async (addressData, thunkAPI) => {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/users/account/updateUserAddress",
        { data: addressData },
        { withCredentials: true }
      );

      // console.log(  response.status, response.data, "ressss");

      //  Return both status and data
      return {
        status: response.status,
        data: response.data
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/users/account/updateProfile",
        { data: userData },
        { withCredentials: true }
      );
      // Add success flag for component-side logic
      return { ...response.data, success: true };
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data || { message: 'An unknown error occurred' });
    }
  }
);





const initialState = {

  users: [],

  registerUser: null,
  meDetails: null,
  loggedInUser: null,     // ✅ to store user info after login

  otpVerify: null,
  token: null,

  forgetPassword_Store: null,
  newPasswword: null,

  updateAddress_Store: null,

  loading: false,
  error: null
};

const createUserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserInfo(state) {
      state.users = [];
    },
    logoutUser(state) {
      state.meDetails = null;
      state.token = null;
      state.loggedInUser = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;   // ✅ set users array
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔐 userLogin cases
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedInUser = action.payload.user || null;
        state.token = action.payload.token || null;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // 🔐 otp cases
      .addCase(userOtpVerify.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userOtpVerify.fulfilled, (state, action) => {
        state.loading = false;
        state.otpVerify = action.payload.user || null;
        state.token = action.payload.token || null;
      })
      .addCase(userOtpVerify.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* userRegister */
      .addCase(userRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.registerUser = action.payload?.user || action.payload || null;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
      })

      /* meDetails */
      .addCase(getMeDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMeDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.meDetails = action.payload?.user || action.payload || null;
      })
      .addCase(getMeDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
      })

      // forget Password
      .addCase(forgetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.forgetPassword_Store = action.payload?.user || action.payload || null;
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
      })

      // set new Password 
      .addCase(setNewPasswword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setNewPasswword.fulfilled, (state, action) => {
        state.loading = false;
        state.meDetails = action.payload?.user || action.payload || null;
      })
      .addCase(setNewPasswword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
      })

    // Update Address Thunk Cases
.addCase(updateAddress.pending, (state) => {
  state.loading = true;
  state.error = null;
})

.addCase(updateAddress.fulfilled, (state, action) => {
  state.loading = false;

  const { status, data } = action.payload || {};
  
  state.updateAddress_Store = {
    status,
    data,
  };

  // Optional: If you want to update meDetails with user data (if returned)
  // state.meDetails = data?.user || null;
})

.addCase(updateAddress.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload || "Update address failed";
})

      // Update User Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.user) {
          state.meDetails = { ...state.meDetails, ...action.payload.user };
        }
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || 'Failed to update profile.';
      })
  }
});

export const { clearUserInfo, logoutUser } = createUserSlice.actions;
export default createUserSlice.reducer;