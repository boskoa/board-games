import {
  styled, AppBar, Box, Toolbar,
} from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectDic } from '../../features/dictionary/dictionarySlice';
import { selectAllLogins } from '../../features/login/loginSlice';
// eslint-disable-next-line import/named
import MainMenu from './MainMenu';
import PlayerIcon from './PlayerIcon';

const MyToolbar = styled(Toolbar)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  justifyContent: 'space-between',
}));

const players = [
  // Obrisati; povlačiti iz stejta
  {
    id: 1,
    name: 'Kocko',
  },
  {
    id: 2,
    name: 'Oblo',
  },
];

const MyAppBar = () => {
  const [l, setL] = useState(0);
  const dic = useSelector(selectDic);
  const usersL = useSelector(selectAllLogins);
  console.log(usersL);

  return (
    <Box sx={{ flexGrow: 1, m: 0 }}>
      <AppBar position="absolute">
        <MyToolbar disableGutters>
          <PlayerIcon player={players[0]} num={dic.player1} setL={setL} l={l} />
          <MainMenu />
          <PlayerIcon player={players[1]} num={dic.player2} setL={setL} l={l} />
        </MyToolbar>
      </AppBar>
    </Box>
  );
};

export default MyAppBar;
