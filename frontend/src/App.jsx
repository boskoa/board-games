import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { Box, CssBaseline, Stack } from '@mui/material';
import {
  alreadyLogged,
} from './features/login/loginSlice';
import MyAppBar from './components/MyAppBar';
import TicTacToe from './components/games/TicTacToe';
import { lightTheme, darkTheme } from './themes';
import { changeAlphabet, changeDic, changeLang } from './features/dictionary/dictionarySlice';
import User from './features/users/User';
import HomePage from './components/HomePage';
import Users from './features/users/Users';
import Stats from './features/matches/Stats';
import WordBuilder from './components/games/WordBuilder';

const App = () => {
  const [dark, setDark] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUser1 = window.localStorage.getItem('loggedGamerUser1');
    const loggedUser2 = window.localStorage.getItem('loggedGamerUser2');
    if (loggedUser1) dispatch(alreadyLogged(JSON.parse(loggedUser1)));
    if (loggedUser2) dispatch(alreadyLogged(JSON.parse(loggedUser2)));

    const lang = window.localStorage.getItem('gamesLanguage');
    if (lang) {
      dispatch(changeDic(Number(lang)));
      dispatch(changeAlphabet(Number(lang)));
      dispatch(changeLang(Number(lang)));
    }

    const isDark = Boolean(JSON.parse(window.localStorage.getItem('gamesTheme')));
    setDark(isDark);
  }, []);

  return (
    <ThemeProvider theme={dark ? darkTheme : lightTheme} enableColorScheme>
      <CssBaseline />
      <Box sx={{ width: '100vw' }}>
        <MyAppBar dark={dark} setDark={setDark} />
        <Stack alignItems="center" sx={{ mt: 10 }}>
          <Routes>
            <Route path="/tictactoe" element={<TicTacToe />} />
            <Route path="/wordbuilder" element={<WordBuilder />} />
            <Route path="/users/:username" element={<User />} />
            <Route path="/users" element={<Users />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Stack>
      </Box>
    </ThemeProvider>
  );
};

export default App;
