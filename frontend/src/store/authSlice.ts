import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
 
interface AuthState {
  user: any;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};


export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      
      await new Promise((resolve) => setTimeout(resolve, 1000));

      
      const mockUser = {
        id: 1,
        username: 'mockuser',
        email: credentials.email,
        token: 'mock-login-token',
      };

      return mockUser;
    } catch (err: any) {
      return thunkAPI.rejectWithValue('Mock login failed');
    }
  }
);


export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData: { username: string; email: string; password: string }, thunkAPI) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockResponse = {
        id: Date.now(),
        username: userData.username,
        email: userData.email,
        token: 'mock-register-token',
      };

      return mockResponse;
    } catch (err: any) {
      return thunkAPI.rejectWithValue('Mock registration failed');
    }
  }
);


export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (_email:string, thunkAPI) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return 'Password reset link sent (mock)';
    } catch (err: any) {
      return thunkAPI.rejectWithValue('Mock reset failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      
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

export const { logout } = authSlice.actions;
export default authSlice.reducer;
