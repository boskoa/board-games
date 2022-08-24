import {
  styled, AppBar, Toolbar, Typography, Stack,
} from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectDic } from '../../features/dictionary/dictionarySlice';
// eslint-disable-next-line import/named
import MainMenu from './MainMenu';
import PlayerIcon from './PlayerIcon';

const MyToolbar = styled(Toolbar)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  justifyContent: 'space-between',
  width: '100vw',
  flexWrap: 'wrap',
}));

const MyAppBar = ({ dark, setDark }) => {
  const [l, setL] = useState(0);
  const dic = useSelector(selectDic);

  return (
    <AppBar position="absolute">
      <MyToolbar disableGutters>
        <PlayerIcon player={1} num={dic.player1} setL={setL} l={l} />
        <Stack direction="row" alignItems="center" flexWrap="wrap">
          <Typography variant="h4" sx={{ mr: 1 }}>{dic.appName}</Typography>
          <MainMenu dark={dark} setDark={setDark} />
        </Stack>
        <PlayerIcon player={2} num={dic.player2} setL={setL} l={l} />
      </MyToolbar>
    </AppBar>
  );
};

export default MyAppBar;
