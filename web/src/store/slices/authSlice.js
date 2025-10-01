import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axiosInstance.js";
import toast from "react-hot-toast";
import { toggleAuthPopup } from "./popupSlice";

// REGISTER
export const register = createAsyncThunk(
  "auth/register",
  async (data, thunkApi) => {
    try {
      const res = await axiosInstance.post("/auth/register", data);
      toast.success(res.data.message);
      thunkApi.dispatch(toggleAuthPopup());
      return res.data.user;
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed.");
      return thunkApi.rejectWithValue(error.response?.data?.message);
    }
  }
);

// LOGIN
export const login = createAsyncThunk("auth/login", async (data, thunkApi) => {
  try {
    const res = await axiosInstance.post("/auth/login", data);
    toast.success(res.data.message);
    thunkApi.dispatch(toggleAuthPopup());
    return res.data.user;
  } catch (error) {
    toast.error(error.response?.data?.message || "Login failed.");
    return thunkApi.rejectWithValue(error.response?.data?.message);
  }
});

// GET CURRENT USER
export const getMe = createAsyncThunk("auth/me", async (_, thunkApi) => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data.user;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response?.data?.message);
  }
});

// LOGOUT
export const logout = createAsyncThunk("auth/logout", async (_, thunkApi) => {
  try {
    const res = await axiosInstance.get("/auth/logout");
    thunkApi.dispatch(toggleAuthPopup());
    toast.success(res.data.message);
    return null;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response?.data?.message);
  }
});

// FORGOT PASSWORD
export const forgotPassword = createAsyncThunk(
  "auth/password/forgot",
  async (email, thunkApi) => {
    try {
      const res = await axiosInstance.post("/auth/password-forgot", {
        email,
        frontendUrl: "http://localhost:5173",
      });
      toast.success(res.data.message || "Password reset link sent.");
      return null;
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      return thunkApi.rejectWithValue(error.response?.data?.message);
    }
  }
);

// RESET PASSWORD
export const resetPassword = createAsyncThunk(
  "auth/reset-password",
  async ({ token, email, password, confirmPassword }, thunkApi) => {
    try {
      const res = await axiosInstance.put(`/auth/reset-password/${token}`, {
        email,
        password,
        confirmPassword,
      });

      toast.success(
        res.data.message || "Password has been reset successfully."
      );
      return res.data.user;
    } catch (error) {
      toast.error(error.response?.data?.message || "Password reset failed.");
      return thunkApi.rejectWithValue(error.response?.data?.message);
    }
  }
);

// UPDATE PASSWORD
export const updatePassword = createAsyncThunk(
  "auth/update-password",
  async (data, thunkApi) => {
    try {
      const res = await axiosInstance.put(`/auth/update-password`, data);

      toast.success(res.data.message || "Password updated successfully.");
      thunkApi.dispatch(toggleAuthPopup());
      return null;
    } catch (error) {
      toast.error(error.response?.data?.message || "Password update failed.");
      return thunkApi.rejectWithValue(error.response?.data?.message);
    }
  }
);

// UPDATE PROFILE
export const updateProfile = createAsyncThunk(
  "auth/profile-update",
  async (data, thunkApi) => {
    try {
      const res = await axiosInstance.put(`/auth/profile-update`, data);

      toast.success(res.data.message || "Profile updated successfully.");
      return res.data.user;
    } catch (error) {
      toast.error(error.response?.data?.message || "Profile update failed.");
      return thunkApi.rejectWithValue(error.response?.data?.message);
    }
  }
);

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isUpdatingPassword: false,
    isRequestingForToken: false,
    isCheckingAuth: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(register.pending, (state) => {
        state.isSigningUp = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isSigningUp = false;
        state.authUser = action.payload;
      })
      .addCase(register.rejected, (state) => {
        state.isSigningUp = false;
      })

      // LOGIN
      .addCase(login.pending, (state) => {
        state.isLoggingIn = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggingIn = false;
        state.authUser = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.isLoggingIn = false;
      })

      // GET ME
      .addCase(getMe.pending, (state) => {
        state.isCheckingAuth = true;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isCheckingAuth = false;
      })
      .addCase(getMe.rejected, (state) => {
        state.authUser = null;
        state.isCheckingAuth = false;
      })

      // LOGOUT
      .addCase(logout.fulfilled, (state) => {
        state.authUser = null;
      })

      // UPDATE PROFILE
      .addCase(updateProfile.pending, (state) => {
        state.isUpdatingProfile = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isUpdatingProfile = false;
      })
      .addCase(updateProfile.rejected, (state) => {
        state.isUpdatingProfile = false;
      })

      // UPDATE PASSWORD
      .addCase(updatePassword.pending, (state) => {
        state.isUpdatingPassword = true;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.isUpdatingPassword = false;
      })
      .addCase(updatePassword.rejected, (state) => {
        state.isUpdatingPassword = false;
      })

      // FORGOT PASSWORD
      .addCase(forgotPassword.pending, (state) => {
        state.isRequestingForToken = true;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isRequestingForToken = false;
      })
      .addCase(forgotPassword.rejected, (state) => {
        state.isRequestingForToken = false;
      })

      // RESET PASSWORD
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.authUser = action.payload;
      });
  },
});

export default authSlice.reducer;