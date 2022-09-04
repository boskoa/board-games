/* eslint-disable no-param-reassign */
import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const MATCHES_URL = 'http://localhost:3003/api/matches';

const matchesAdapter = createEntityAdapter();

export const getAllMatches = createAsyncThunk('matches/getAllMatches', async () => {
  try {
    const response = await axios.get(MATCHES_URL);
    return response.data;
  } catch (exception) {
    return exception.response.data;
  }
});

export const userStats = createAsyncThunk('matches/userStats', async (username) => {
  try {
    const response = await axios.get(`${MATCHES_URL}/${username}`);
    return response.data;
  } catch (exception) {
    return exception.response.data;
  }
});

export const allBest = createAsyncThunk('matches/allBest', async () => {
  try {
    const response = await axios.get(`${MATCHES_URL}/allbest`);
    const sortedResponse = response.data.sort(
      (a, b) => Number(b.count) - Number(a.count),
    );
    return sortedResponse;
  } catch (exception) {
    return exception.response.data;
  }
});

export const bestPerGame = createAsyncThunk('matches/bestPerGame', async () => {
  try {
    const response = await axios.get(`${MATCHES_URL}/bestpergame`);
    const sortedResponse = response.data.sort(
      (a, b) => Number(b.count) - Number(a.count),
    );
    return sortedResponse;
  } catch (exception) {
    return exception.response.data;
  }
});

export const newMatch = createAsyncThunk('matches/newMatch', async (data) => {
  try {
    const { matchData } = data;
    const response = await axios.post(MATCHES_URL, matchData);
    return response.data;
  } catch (exception) {
    return exception.response.data;
  }
});

const initialState = matchesAdapter.getInitialState({
  status: 'idle',
  error: null,
  userStats: {},
  allBest: [],
  bestPerGame: [],
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
      })
      .addCase(userStats.fulfilled, (state, action) => {
        state.userStats = { ...action.payload[0] };
      })
      .addCase(allBest.fulfilled, (state, action) => {
        state.allBest = action.payload;
      })
      .addCase(bestPerGame.fulfilled, (state, action) => {
        state.bestPerGame = action.payload;
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
export const selectStats = (state) => state.matches.userStats;
export const selectAllBest = (state) => state.matches.allBest;
export const selectBestPerGame = (state) => state.matches.bestPerGame;

export default matchesSlice.reducer;
