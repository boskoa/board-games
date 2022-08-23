/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
import { Button, Typography, Stack } from '@mui/material';
import React, { useState } from 'react';

const Item = ({
  field, player = 0, fields, setFields, setPlayer, winner, players,
}) => {
  const [color, setColor] = useState('primary');
  const disabled = [1, 2].includes(field.value) || winner || players.length !== 2;

  const handleClick = () => {
    if (!disabled) {
      const name = player === 1 ? 'X' : 'O';
      const newField = { ...fields[field.id], value: player, name };
      setFields((existingFields) => existingFields.map(
        (f) => (f.id !== field.id ? f : newField),
      ));
      newField.value === 1
        ? setColor('player1')
        : newField.value === 2
          ? setColor('player2')
          : setColor('primary');
      player === 1 ? setPlayer(2) : setPlayer(1);
    }
  };

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{
        width: '32%', height: '100%', maxHeight: 200, m: 1,
      }}
    >
      <Button
        variant="contained"
        color={color}
        onClick={handleClick}
        sx={{ width: '100%', height: '100%' }}
      >
        <Typography variant="h2">{field.name}</Typography>
      </Button>
    </Stack>
  );
};

export default Item;
