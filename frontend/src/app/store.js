import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/users/usersSlice';
import loginReducer from '../features/login/loginSlice';
import dictionaryReducer from '../features/dictionary/dictionarySlice';
import matchesReducer from '../features/matches/matchesSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
    login: loginReducer,
    dictionary: dictionaryReducer,
    matches: matchesReducer,
  },
});

export default store;
