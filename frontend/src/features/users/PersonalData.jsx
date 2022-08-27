import {
  Button, Paper, TextField, Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectDic } from '../dictionary/dictionarySlice';
import { selectAllLogins } from '../login/loginSlice';
import { updateUser } from './usersSlice';

const PersonalData = ({ user }) => {
  const dic = useSelector(selectDic);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const players = useSelector(selectAllLogins);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  const handleSend = async () => {
    const token = players[0].token || players[1].token;
    dispatch(updateUser({
      id: user.id,
      token,
      newData: {
        name,
        password,
      },
    }));
  };

  return (
    <Paper sx={{ mb: 2, padding: 2 }}>
      <Typography variant="body1" sx={{ mb: 2 }}>{dic.changeUserData}</Typography>
      <TextField
        id="name"
        label={dic.name}
        variant="outlined"
        sx={{ mb: 2 }}
        fullWidth
        value={name}
        size="small"
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        id="password"
        type="password"
        label={dic.password}
        variant="outlined"
        sx={{ mb: 2 }}
        fullWidth
        value={password}
        size="small"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        size="small"
        sx={{ textTransform: 'none' }}
        onClick={handleSend}
      >
        {dic.change}
      </Button>
    </Paper>
  );
};

export default PersonalData;
