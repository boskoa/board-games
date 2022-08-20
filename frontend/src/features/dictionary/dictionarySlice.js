import { createSlice } from '@reduxjs/toolkit';
import { dictionary } from '../../utils/dictionary';

const initialState = {
  language: dictionary[0],
};

const dictionarySlice = createSlice({
  name: 'dictionary',
  initialState,
  reducers: {
    changeDic: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.language = dictionary[action.payload];
    },
  },
});

export const selectDic = (state) => state.dictionary.language;

export const { changeDic } = dictionarySlice.actions;

export default dictionarySlice.reducer;
