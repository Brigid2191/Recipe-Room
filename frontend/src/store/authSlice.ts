import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface LoginPayload {
  username: string;
  password: string;
}

interface AuthState {
  user: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

// Async thunk with proper typing
export const login = createAsyncThunk<
  string, // Return type (can be a token or user ID, etc.)
  LoginPayload, // Payload type
  {
    rejectValue: string; // Rejection type
  }
>('auth/login', async ({ username, password }: LoginPayload, { rejectWithValue }) => {
  try {
    // Replace this with your real API call
    if (username === 'admin' && password === 'admin') {
      return 'fake_token';
    } else {
      return rejectWithValue('Invalid credentials');
    }
  } catch (error) {
    return rejectWithValue('Login failed');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state: AuthState) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state: AuthState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state: AuthState, action: PayloadAction<string>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state: AuthState, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Unknown error';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
