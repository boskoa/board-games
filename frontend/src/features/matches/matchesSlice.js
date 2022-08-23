/* eslint-disable no-param-reassign */
import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const MATCHES_URL = 'http://localhost:3003/api/matches';

const matchesAdapter = createEntityAdapter();

export const getAllMatches = createAsyncThunk('matches/getAllMatches', async () => {
  try {
    const response = await axios.get(MATCHES_URL);
    console.log('MATCHES', response.data);
    return response.data;
  } catch (exception) {
    return exception.response.data;
  }
});

export const newMatch = createAsyncThunk('matches/newMatch', async (data) => {
  try {
    const { token, matchData } = data;
    const config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };
    const response = await axios.post(MATCHES_URL, matchData, config);
    console.log('NEWMATCH', config, response.data);
    return response.data;
  } catch (exception) {
    return exception.response.data;
  }
});

const initialState = matchesAdapter.getInitialState({
  status: 'idle',
  error: null,
});

const matchesSlice = createSlice({
  name: 'matches',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllMatches.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllMatches.fulfilled, (state, action) => {
        state.status = 'succeeded';
        matchesAdapter.upsertMany(state, action.payload);
      })
      .addCase(getAllMatches.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(newMatch.fulfilled, (state, action) => {
        matchesAdapter.addOne(state, action.payload);
      });
  },
});

export const {
  selectAll: selectAllMatches,
  selectById: selectMatchById,
  selectIds: selectMatchIds,
} = matchesAdapter.getSelectors((state) => state.matches);

export const selectMatchesStatus = (state) => state.matches.status;
export const selectMatchesError = (state) => state.matches.error;

export default matchesSlice.reducer;
