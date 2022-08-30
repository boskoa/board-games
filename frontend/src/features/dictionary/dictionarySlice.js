/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { alphabets } from '../../utils/alphabets';
import { dictionary } from '../../utils/dictionary';

const initialState = {
  language: dictionary[0],
  alphabet: alphabets[0],
  lang: 0,
};

const dictionarySlice = createSlice({
  name: 'dictionary',
  initialState,
  reducers: {
    changeDic: (state, action) => {
      state.language = dictionary[action.payload];
    },
    changeAlphabet: (state, action) => {
      state.alphabet = alphabets[action.payload];
    },
    changeLang: (state, action) => {
      state.lang = action.payload;
    },
  },
});

export const selectDic = (state) => state.dictionary.language;
export const selectLang = (state) => state.dictionary.lang;
export const selectAlphabet = (state) => state.dictionary.alphabet;

export const { changeDic, changeAlphabet, changeLang } = dictionarySlice.actions;

export default dictionarySlice.reducer;
