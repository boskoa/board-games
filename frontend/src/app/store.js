import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/users/usersSlice';
import loginReducer from '../features/login/loginSlice';
import dictionaryReducer from '../features/dictionary/dictionarySlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
    login: loginReducer,
    dictionary: dictionaryReducer,
  },
});

export default store;
