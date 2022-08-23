/* eslint-disable react/jsx-boolean-value */
import { Button, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectDic } from '../../../features/dictionary/dictionarySlice';
import { selectAllLogins } from '../../../features/login/loginSlice';
import { newMatch } from '../../../features/matches/matchesSlice';
import WinnerModal from '../../WinnerModal';
import Item from './Item';

const startFields = [
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
];

const TicTacToe = () => {
  const [render, setRender] = useState(true);
  const [player, setPlayer] = useState(1);
  const players = useSelector(selectAllLogins);
  const [wPlayer, setWPlayer] = useState('');
  const [winner, setWinner] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [fields, setFields] = useState(startFields);
  const dic = useSelector(selectDic);
  const dispatch = useDispatch();

  const checkForWin = () => {
    const previousPlayer = player === 1 ? 2 : 1;
    const slice = fields.map((f) => (f.value === previousPlayer ? 1 : 0));
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
      setWinner(true);
      setWPlayer(players.find((p) => p.id === previousPlayer).name);
      const token = players[0].token || players[1].token;
      const loserT = players.find((p) => p.id !== previousPlayer);
      dispatch(newMatch({
        token,
        matchData: {
          game: 'tic_tac_toe', winnerId: previousPlayer, loserId: loserT.id,
        },
      }));
      handleOpen();
    }
  };

  const setRandomPlayer = () => {
    const i = Math.floor(Math.random() * 2);
    const p = [1, 2][i];
    setPlayer(p);
  };

  const handleNewGame = () => {
    setRender(!render);
    setRandomPlayer();
    setWPlayer('');
    setWinner(false);
    setFields(startFields);
  };

  useEffect(() => {
    setRandomPlayer();
  }, []);

  useEffect(() => {
    checkForWin();
  }, [fields]);

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{ maxHeight: 600 }}
      key={render}
    >
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{
          height: '19vw',
          width: '68vw',
          maxWidth: 600,
          minHeight: 60,
          mb: 2,
        }}
      >
        <Item
          field={fields[0]}
          player={player}
          setPlayer={setPlayer}
          fields={fields}
          setFields={setFields}
          winner={winner}
          players={players}
        />
        <Item
          field={fields[1]}
          player={player}
          setPlayer={setPlayer}
          fields={fields}
          setFields={setFields}
          winner={winner}
          players={players}
        />
        <Item
          field={fields[2]}
          player={player}
          setPlayer={setPlayer}
          fields={fields}
          setFields={setFields}
          winner={winner}
          players={players}
        />
      </Stack>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{
          height: '19vw',
          width: '68vw',
          maxWidth: 600,
          minHeight: 60,
          mb: 2,
        }}
      >
        <Item
          field={fields[3]}
          player={player}
          setPlayer={setPlayer}
          fields={fields}
          setFields={setFields}
          winner={winner}
          players={players}
        />
        <Item
          field={fields[4]}
          player={player}
          setPlayer={setPlayer}
          fields={fields}
          setFields={setFields}
          winner={winner}
          players={players}
        />
        <Item
          field={fields[5]}
          player={player}
          setPlayer={setPlayer}
          fields={fields}
          setFields={setFields}
          winner={winner}
          players={players}
        />
      </Stack>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{
          height: '19vw',
          width: '68vw',
          maxWidth: 600,
          minHeight: 60,
          mb: 2,
        }}
      >
        <Item
          field={fields[6]}
          player={player}
          setPlayer={setPlayer}
          fields={fields}
          setFields={setFields}
          winner={winner}
          players={players}
        />
        <Item
          field={fields[7]}
          player={player}
          setPlayer={setPlayer}
          fields={fields}
          setFields={setFields}
          winner={winner}
          players={players}
        />
        <Item
          field={fields[8]}
          player={player}
          setPlayer={setPlayer}
          fields={fields}
          setFields={setFields}
          winner={winner}
          players={players}
        />
      </Stack>
      <Button variant="contained" size="large" color="success" onClick={handleNewGame}>
        <Typography variant="h6">{dic.newGame}</Typography>
      </Button>
      <WinnerModal winner={wPlayer} open={open} handleClose={handleClose} />
    </Stack>
  );
};

export default TicTacToe;
