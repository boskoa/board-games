import styled from '@emotion/styled';
import {
  Backdrop, Modal, Button, TextField, Stack, Paper, Slide,
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectDic } from '../dictionary/dictionarySlice';
import { registerUser } from './usersSlice';

const MyPaper = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  top: '25%',
  left: '25%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: theme.palette.background.paper,
  padding: 10,
  borderRadius: 3,
}));

const RegistrationModal = ({ open, handleClose }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const dic = useSelector(selectDic);

  const handleRegistration = () => {
    dispatch(registerUser({ name, username, password }));
    setName('');
    setUsername('');
    setPassword('');
    handleClose();
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Slide in={open}>
          <MyPaper elevation={5}>
            <Stack>
              <TextField
                type="text"
                value={name}
                label={dic.name}
                variant="outlined"
                required
                onChange={(e) => setName(e.target.value)}
                sx={{ m: 1 }}
              />
              <TextField
                type="text"
                value={username}
                label={dic.username}
                variant="outlined"
                required
                onChange={(e) => setUsername(e.target.value)}
                sx={{ m: 1 }}
              />
              <TextField
                value={password}
                type="password"
                label={dic.password}
                variant="outlined"
                required
                onChange={(e) => setPassword(e.target.value)}
                sx={{ m: 1 }}
              />
              <Stack direction="row" justifyContent="space-between" sx={{ m: 1 }}>
                <Button onClick={handleClose}>{dic.cancel}</Button>
                <Button
                  onClick={handleRegistration}
                  disabled={!(name && username && password)}
                >
                  {dic.login}
                </Button>
              </Stack>
            </Stack>
          </MyPaper>
        </Slide>
      </Modal>
    </div>
  );
};

export default RegistrationModal;
