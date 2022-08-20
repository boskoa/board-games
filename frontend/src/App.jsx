import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container } from '@mui/material';
import {
  alreadyLogged,
} from './features/login/loginSlice';
import MyAppBar from './components/MyAppBar';
import TicTacToe from './components/games/TicTacToe';

const App = () => {
  const dispatch = useDispatch();

  // const users = useSelector(selectAllUsers);
  // const logins = useSelector(selectAllLogins);

  useEffect(() => {
    const loggedUser1 = window.localStorage.getItem('loggedGamerUser1');
    const loggedUser2 = window.localStorage.getItem('loggedGamerUser2');
    if (loggedUser1) dispatch(alreadyLogged(JSON.parse(loggedUser1)));
    if (loggedUser2) dispatch(alreadyLogged(JSON.parse(loggedUser2)));
  }, []);

  return (
    <Container sx={{ m: 0 }}>
      <MyAppBar />
      <TicTacToe />
    </Container>
  );
};

export default App;
