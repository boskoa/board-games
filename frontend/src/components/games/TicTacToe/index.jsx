/* eslint-disable react/jsx-boolean-value */
import { Grid, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Item from './Item';

const TicTacToe = () => {
  const [player, setPlayer] = useState(1);
  const [fields, setFields] = useState([
    {
      id: 0,
      value: 0,
      name: '',
    },
    {
      id: 1,
      value: 0,
      name: '',
    },
    {
      id: 2,
      value: 0,
      name: '',
    },
    {
      id: 3,
      value: 0,
      name: '',
    },
    {
      id: 4,
      value: 0,
      name: '',
    },
    {
      id: 5,
      value: 0,
      name: '',
    },
    {
      id: 6,
      value: 0,
      name: '',
    },
    {
      id: 7,
      value: 0,
      name: '',
    },
    {
      id: 8,
      value: 0,
      name: '',
    },
  ]);

  const checkForWin = () => {
    const previousPlayer = player === 1 ? 2 : 1;
    const slice = fields.map((f) => (f.value === previousPlayer ? 1 : 0));
    let winner = false;
    if (
      slice.slice(0, 3).every((e) => e === 1)
        || slice.slice(3, 6).every((e) => e === 1)
        || slice.slice(6).every((e) => e === 1)
        || [slice[0], slice[3], slice[6]].every((e) => e === 1)
        || [slice[1], slice[4], slice[7]].every((e) => e === 1)
        || [slice[2], slice[5], slice[8]].every((e) => e === 1)
        || [slice[0], slice[4], slice[8]].every((e) => e === 1)
        || [slice[2], slice[4], slice[6]].every((e) => e === 1)
    ) {
      winner = true;
    }
    if (winner) {
      console.log(`Player ${previousPlayer} wins!`);
    }
  };

  useEffect(() => {
    const i = Math.floor(Math.random() * 2);
    const p = [1, 2][i];
    setPlayer(p);
  }, []);

  useEffect(() => {
    checkForWin();
  }, [fields]);

  return (
    <Stack justifyContent="center" alignItems="center">
      <Grid container spacing={2} sx={{ height: '85vw', width: '85vw', m: 2 }}>
        <Grid item={true} xs={4} sx={{ height: '33%' }}>
          <Item
            field={fields[0]}
            player={player}
            setPlayer={setPlayer}
            fields={fields}
            setFields={setFields}
          />
        </Grid>
        <Grid item={true} xs={4} sx={{ height: '33%' }}>
          <Item
            field={fields[1]}
            player={player}
            setPlayer={setPlayer}
            fields={fields}
            setFields={setFields}
          />
        </Grid>
        <Grid item={true} xs={4} sx={{ height: '33%' }}>
          <Item
            field={fields[2]}
            player={player}
            setPlayer={setPlayer}
            fields={fields}
            setFields={setFields}
          />
        </Grid>
        <Grid item={true} xs={4} sx={{ height: '33%' }}>
          <Item
            field={fields[3]}
            player={player}
            setPlayer={setPlayer}
            fields={fields}
            setFields={setFields}
          />
        </Grid>
        <Grid item={true} xs={4} sx={{ height: '33%' }}>
          <Item
            field={fields[4]}
            player={player}
            setPlayer={setPlayer}
            fields={fields}
            setFields={setFields}
          />
        </Grid>
        <Grid item={true} xs={4} sx={{ height: '33%' }}>
          <Item
            field={fields[5]}
            player={player}
            setPlayer={setPlayer}
            fields={fields}
            setFields={setFields}
          />
        </Grid>
        <Grid item={true} xs={4} sx={{ height: '33%' }}>
          <Item
            field={fields[6]}
            player={player}
            setPlayer={setPlayer}
            fields={fields}
            setFields={setFields}
          />
        </Grid>
        <Grid item={true} xs={4} sx={{ height: '33%' }}>
          <Item
            field={fields[7]}
            player={player}
            setPlayer={setPlayer}
            fields={fields}
            setFields={setFields}
          />
        </Grid>
        <Grid item={true} xs={4} sx={{ height: '33%' }}>
          <Item
            field={fields[8]}
            player={player}
            setPlayer={setPlayer}
            fields={fields}
            setFields={setFields}
          />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default TicTacToe;
