import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../../utils/baseUrl';

// ------- create a Register actionType using asyncthunk ------

export const registerUserAction = createAsyncThunk(
  'user/register',
  async (user, { rejectWithValue, getState, dispatch }) => {
    try {
      //   -------- Call backend api -------
      const response = await axios.post(
        `${baseURL}/user/register`,
        user,
        {withCredentials: true}
      );
      return response.data;
    } catch (error) {
      console.log(error);
      if (!error?.response) {
        throw error;
      } else {
        return rejectWithValue(error?.response?.data);
      }
    }
  }
);

// ---------- Create a login action type using asynchthunk --------

export const loginUserActionType = createAsyncThunk(
  'user/login',
  async (userData, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const { data } = await axios.post(
        `${baseURL}/user/login`,
        userData,
        config
      );

      localStorage.setItem('userInfo', JSON.stringify(data));
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      } else {
        return rejectWithValue(error?.response?.data?.message);
      }
    }
  }
);

// ==== get all users ===
export const getAllUsers = createAsyncThunk(
  'user/all',
  async (userData, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${baseURL}/user`);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      } else {
        return rejectWithValue(error?.response?.data?.message);
      }
    }
  }
);

// --------------- Delete User --------
export const deleteUserAction = createAsyncThunk(
  'user/delete',
  async (userId, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.user;

    if (!user?.auth?.token) {
      return rejectWithValue('Token is missing');
    }
    const { auth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${auth?.token}`,
      },
    };
    try {
      const { data } = await axios.delete(
        `${baseURL}/api/users/${userId}`,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      } else {
        return rejectWithValue(error?.response?.data?.message);
      }
    }
  }
);

// ------------------ User logout action --------

export const logoutUserAction = createAsyncThunk(
  'user/logout',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      localStorage.removeItem('userInfo');
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ----- get the user from localStorage -------

const userFromLocalStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

// ----------- Create a user slice ------

const userSlice = createSlice({
  name: 'user',
  initialState: {
    auth: userFromLocalStorage,
  },
  extraReducers: (builder) => {
    builder.addCase(registerUserAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.auth = action.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action.payload.message;
      state.serverError = action.error.message;
    });
    // ===== Delete a single user======
    builder.addCase(deleteUserAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(deleteUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.userChanged = action.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(deleteUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action.payload.message;
      state.serverError = action.error.message;
    });
    // ===== All Users ======
    builder.addCase(getAllUsers.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.loading = false;
      state.appError = action.payload.message;
      state.serverError = action.error.message;
    });
    // reducers for login user.
    builder.addCase(loginUserActionType.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(loginUserActionType.fulfilled, (state, action) => {
      state.loading = false;
      state.auth = action?.payload;
      state.userAuth = action?.payload;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(loginUserActionType.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload;
      state.serverError = action?.error?.message;
    });
    /*

    // User logout Reducer
    builder.addCase(logoutUserAction.pending, (state, action) => {
      state.loading = true;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(logoutUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.auth = undefined;
      state.userAuth = undefined;
      state.appError = undefined;
      state.serverError = undefined;
    });
    builder.addCase(logoutUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appError = action?.payload;
      state.serverError = action?.error?.message;
    });
    */
  },
});
export default userSlice.reducer;
