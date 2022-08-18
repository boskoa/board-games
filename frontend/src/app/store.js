import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/users/usersSlice';
import loginReducer from '../features/login/loginSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
    login: loginReducer,
  },
});

export default store;
