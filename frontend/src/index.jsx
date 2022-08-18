import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './app/store';
import { getUsers } from './features/users/usersSlice';

store.dispatch(getUsers());

const lightTheme = createTheme({});

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ThemeProvider theme={lightTheme}>
      <App />
    </ThemeProvider>
  </Provider>,
);
