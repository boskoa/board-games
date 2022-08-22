import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ThemeProvider } from '@emotion/react';
import { Container, CssBaseline, Stack } from '@mui/material';
import {
  alreadyLogged,
} from './features/login/loginSlice';
import MyAppBar from './components/MyAppBar';
import TicTacToe from './components/games/TicTacToe';
import { lightTheme, darkTheme } from './themes';
import { changeDic } from './features/dictionary/dictionarySlice';
import BottomBar from './components/BottomBar';

const App = () => {
  const [dark, setDark] = useState(false);
  const dispatch = useDispatch();

  // const users = useSelector(selectAllUsers);
  // const logins = useSelector(selectAllLogins);

  useEffect(() => {
    const loggedUser1 = window.localStorage.getItem('loggedGamerUser1');
    const loggedUser2 = window.localStorage.getItem('loggedGamerUser2');
    if (loggedUser1) dispatch(alreadyLogged(JSON.parse(loggedUser1)));
    if (loggedUser2) dispatch(alreadyLogged(JSON.parse(loggedUser2)));

    const lang = window.localStorage.getItem('gamesLanguage');
    if (lang) dispatch(changeDic(Number(lang)));

    const isDark = Boolean(JSON.parse(window.localStorage.getItem('gamesTheme')));
    setDark(isDark);
  }, []);

  return (
    <ThemeProvider theme={dark ? darkTheme : lightTheme} enableColorScheme>
      <CssBaseline />
      <Container>
        <MyAppBar dark={dark} setDark={setDark} />
        <Stack alignItems="center" sx={{ mt: 10 }}>
          <TicTacToe />
        </Stack>
        <BottomBar />
      </Container>
    </ThemeProvider>
  );
};

export default App;
