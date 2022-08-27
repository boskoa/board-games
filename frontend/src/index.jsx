import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import store from './app/store';
import { getAllMatches } from './features/matches/matchesSlice';
import { getUsers } from './features/users/usersSlice';

store.dispatch(getUsers());
store.dispatch(getAllMatches());

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
);
