import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
  isLoading: false,
  user: null,
};

export const registerUser = createAsyncThunk(
  'action/registerUser',
  async (user, ThunkAPI) => {
    console.log(`register user : ${JSON.stringify(user)}`);
  }
);

export const loginUser = createAsyncThunk(
  'action/loginUser',
  async (user, ThunkAPI) => {
    console.log(`login user : ${JSON.stringify(user)}`);
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
});

export default userSlice.reducer;
