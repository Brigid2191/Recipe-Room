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

// ✅ loginUser thunk
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await authService.login(credentials);
      return response.user;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed.");
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
      return response.message;
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

    // loginUser
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
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
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Exports
export const { logout } = authSlice.actions;
<<<<<<< HEAD
export default authSlice.reducer;
=======
export default authSlice.reducer;
>>>>>>> e47ba75bad9d8ea9919c1465a94edbd72a7abeaf
