import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import * as authService from "../services/authService";

// User and AuthState interfaces
interface User {
  id: number;
  username: string;
  email: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

// ✅ registerUser thunk
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    userData: { username: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await authService.register(userData);
      return response.user;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Registration failed.");
    }
  }
);

// ✅ resetPassword thunk
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (
    email: string,
    { rejectWithValue }
  ) => {
    try {
      const response = await authService.resetPassword(email);
      return response.message; // adjust if your backend returns something else
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Reset failed.");
    }
  }
);

// Create slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    // registerUser
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // resetPassword
    builder
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        // Optional: you can add a success message field if needed
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Exports
export const { logout } = authSlice.actions;
export default authSlice.reducer;
