/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const LOGIN_URL = 'http://localhost:3003/api/login';

const loginAdapter = createEntityAdapter();

export const loginUser = createAsyncThunk('login/loginUser', async (data) => {
  try {
    const { username, password, user } = data;
    const response = await axios.post(LOGIN_URL, { username, password });
    const userData = { ...response.data, id: Number(user), username };
    window.localStorage.setItem(`loggedGamerUser${user}`, JSON.stringify(userData));
    return userData;
  } catch (exception) {
    return exception.response.data;
  }
});

const initialState = loginAdapter.getInitialState();

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    alreadyLogged: (state, action) => {
      action.payload.id = Number(action.payload.id);
      loginAdapter.addOne(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        loginAdapter.addOne(state, action.payload);
      });
  },
});

export const {
  selectAll: selectAllLogins,
  selectById: selectLoginsById,
  selectIds: selectLoginIds,
} = loginAdapter.getSelectors((state) => state.login);

export const { alreadyLogged } = loginSlice.actions;

export default loginSlice.reducer;
