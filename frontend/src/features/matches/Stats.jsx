import React, { useEffect } from 'react';
import { Typography, Stack, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllBest, allBest } from './matchesSlice';
import { selectDic } from '../dictionary/dictionarySlice';

const Stats = () => {
  const allBests = useSelector(selectAllBest);
  const dic = useSelector(selectDic);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allBest());
  }, []);

  if (!allBests?.length) {
    return <div />;
  }

  console.log('ALLLLLBESSSTS', allBests);

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
    </Stack>
  );
};

export default Stats;
