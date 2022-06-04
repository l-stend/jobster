import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from '../../utils/localStorage';
import {
  loginUserThunk,
  registerUserThunk,
  updateUserThunk,
} from './userThunk';

const initialState = {
  isLoading: false,
  isSidebarOpen: false, // sarebbe sconveniente creare uno slice solo per questo stato
  user: getUserFromLocalStorage(),
};

///VERSIONE COMPLETA DELLE FUNZIONI ASYNCTHUNK (PRIMA DEL REFACTORING) ❗❕❗
///DA USARE COME RIFERIMENTO PER SCRIVERNE DI NUOVE             ❕❗❕

// export const registerUser = createAsyncThunk(
//   'action/registerUser',
//   async (user, ThunkAPI) => {
//     try {
//       const res = await customFetch.post('/auth/register', user);
//       return res.data;
//     } catch (error) {
//       return ThunkAPI.rejectWithValue(error.response.data.msg);
//     }
//   }
// );

// export const loginUser = createAsyncThunk(
//   'action/loginUser',
//   async (user, ThunkAPI) => {
//     try {
//       const res = await customFetch.post('/auth/login', user);
//       return res.data;
//     } catch (error) {
//       return ThunkAPI.rejectWithValue(error.response.data.msg);
//     }
//   }
// );

// export const updateUser = createAsyncThunk(
//   'user/updateUser',
//   async (user, thunkAPI) => {
//     try {
//       const resp = await customFetch.patch('/auth/updateUser', user, {
//         headers: {
//           authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
//         },
//       });
//       return resp.data;
//     } catch (error) {
//       if (error.response.status === 401) {
//         thunkAPI.dispatch(logoutUser());
//         return thunkAPI.rejectWithValue('Unauthorized, logging out...');
//       }
//       return thunkAPI.rejectWithValue(error.response.data.msg);
//     }
//   }
// );

//// FUNZIONI DI COMUNICAZIONE COL SERVER DOPO IL REFACTORING ❕❗❕
//// GUARDA QUELLE COMMENTATE ❗❕❗

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (user, thunkAPI) => {
    return registerUserThunk('/auth/register', user, thunkAPI);
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (user, thunkAPI) => {
    return loginUserThunk('/auth/login', user, thunkAPI);
  }
);
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user, thunkAPI) => {
    return updateUserThunk('/auth/updateUser', user, thunkAPI);
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isSidebarOpen = null;
      removeUserFromLocalStorage();
      toast.success('logout successful');
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);
      toast(`Ciao ${user.name}`);
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);

      toast(`Welcome Back ${user.name}`);
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [updateUser.pending]: (state) => {
      state.isLoading = true;
    },
    [updateUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user;

      addUserToLocalStorage(user);
      toast.success('User Updated');
    },
    [updateUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

export const { toggleSidebar, logoutUser } = userSlice.actions;
export default userSlice.reducer;
