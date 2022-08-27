import { Stack } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectDic } from '../../features/dictionary/dictionarySlice';
import GameCard from './GameCard';

const HomePage = () => {
  const dic = useSelector(selectDic);

  const games = [
    {
      pathName: 'tictactoe',
      name: dic.ticTacToe,
      description: dic.ticDescription,
    },
  ];

  return (
    <Stack direction="row" sx={{ mt: 8 }}>
      {games.map((g) => <GameCard key={g.name} game={g} />)}
    </Stack>
  );
};

export default HomePage;
