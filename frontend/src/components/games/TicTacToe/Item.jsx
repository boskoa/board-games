/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
import { Button } from '@mui/material';
import React, { useState } from 'react';

const Item = ({
  field, player = 0, fields, setFields, setPlayer,
}) => {
  const [color, setColor] = useState('primary');
  const disabled = [1, 2].includes(field.value);

  const handleClick = () => {
    if (!disabled) {
      const name = player === 1 ? 'X' : 'O';
      const newField = { ...fields[field.id], value: player, name };
      setFields((existingFields) => existingFields.map(
        (f) => (f.id !== field.id ? f : newField),
      ));
      newField.value === 1
        ? setColor('secondary')
        : newField.value === 2
          ? setColor('error')
          : setColor('primary');
      player === 1 ? setPlayer(2) : setPlayer(1);
    }
  };

  return (
    <Button
      sx={{ width: '90%', height: '90%', m: 1 }}
      variant="contained"
      color={color}
      onClick={handleClick}
    >
      {field.name}
    </Button>
  );
};

export default Item;
