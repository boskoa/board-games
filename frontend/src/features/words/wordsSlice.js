/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const WORDS_URL = 'http://localhost:3003/api/words';

export const getWords = createAsyncThunk('words/getWords', async (data) => {
  try {
    const { lang, word1, word2 } = data;
    const wordA = await axios.get(`${WORDS_URL}/${lang}/?search=${word1}`);
    const wordB = await axios.get(`${WORDS_URL}/${lang}/?search=${word2}`);
    return { player1: wordA.data, player2: wordB.data };
  } catch (exception) {
    return exception.response.data;
  }
});

const initialState = {
  status: 'idle',
  error: null,
  words: {
    player1: null,
    player2: null,
  },
};

const wordsSlice = createSlice({
  name: 'words',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getWords.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getWords.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.words = action.payload;
      })
      .addCase(getWords.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectWordsStatus = (state) => state.words.status;
export const selectWordsError = (state) => state.words.error;
export const selectWords = (state) => state.words.words;

export default wordsSlice.reducer;
