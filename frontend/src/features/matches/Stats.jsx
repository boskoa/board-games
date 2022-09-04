import React, { useEffect } from 'react';
import { Typography, Stack, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAllBest, allBest, bestPerGame, selectBestPerGame,
} from './matchesSlice';
import { selectDic } from '../dictionary/dictionarySlice';

const Stats = () => {
  const allBests = useSelector(selectAllBest);
  const bestGame = useSelector(selectBestPerGame);
  const dic = useSelector(selectDic);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allBest());
    dispatch(bestPerGame());
  }, []);

  if (!allBests?.length) {
    return <div />;
  }

  return (
    <Stack
      direction="row"
      justifyContent="space-evenly"
      flexWrap="wrap"
      sx={{ width: '100%' }}
    >
      <Paper sx={{ m: 1, p: 2, width: 280 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>{dic.allBest}</Typography>
        {allBests?.map((b) => (
          <Stack
            key={b.name}
            direction="row"
            justifyContent="space-between"
          >
            <Typography>{b.name}</Typography>
            <Typography>{b.count}</Typography>
          </Stack>
        ))}
      </Paper>
      <Paper sx={{ m: 1, p: 2, width: 280 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>{dic.bestPerGame}</Typography>
        {bestGame?.map((b) => (
          <Stack
            key={b.game}
            direction="row"
            justifyContent="space-between"
          >
            <Typography>{b.game.replaceAll('_', ' ')}</Typography>
            <Typography>{b.name}</Typography>
            <Typography>{b.count}</Typography>
          </Stack>
        ))}
      </Paper>
    </Stack>
  );
};

export default Stats;
