/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const USERS_URL = 'http://localhost:3003/api/users';

const usersAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

export const getUsers = createAsyncThunk('users/getUsers', async () => {
  const response = await axios.get(USERS_URL);
  return response.data;
});

export const updateUser = createAsyncThunk('users/updateUser', async (data) => {
  try {
    const { id, token, newData } = data;
    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };
    const response = await axios.put(`${USERS_URL}/${id}`, newData, config);
    return response.data;
  } catch (exception) {
    return exception.response.data;
  }
});

export const registerUser = createAsyncThunk('users/registerUser', async (data) => {
  try {
    const response = await axios.post(USERS_URL, data);
    return response.data;
  } catch (exception) {
    return exception.response.data;
  }
});

const initialState = usersAdapter.getInitialState({
  status: 'idle',
  error: null,
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    changeAvatar: (state, action) => {
      const { id, avatar } = action.payload;
      state.entities[id].avatar = avatar;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        usersAdapter.upsertMany(state, action.payload);
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        usersAdapter.addOne(state, action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        usersAdapter.upsertOne(state, action.payload);
      });
  },
});

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
} = usersAdapter.getSelectors((state) => state.users);

export const selectUsersStatus = (state) => state.users.status;
export const selectUsersError = (state) => state.users.error;

export const { changeAvatar } = usersSlice.actions;

export default usersSlice.reducer;
