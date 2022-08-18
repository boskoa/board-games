import styled from '@emotion/styled';
import {
  Backdrop, Modal, Fade, Button, TextField, Stack, Paper,
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from './loginSlice';

const MyPaper = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: theme.palette.info.dark,
  padding: 10,
  borderRadius: 3,
}));

const LoginModal = ({ user }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleLogin = () => {
    dispatch(loginUser({ username, password, user }));
    handleClose();
  };
  // Prevesti tekst

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
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
        <Fade in={open}>
          <MyPaper elevation={5}>
            <Stack>
              <TextField
                type="text"
                value={username}
                label="username"
                variant="outlined"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                value={password}
                type="password"
                label="password"
                variant="outlined"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <Stack direction="row" justifyContent="space-between">
                <Button onClick={handleClose}>Cancel</Button>
                <Button
                  onClick={handleLogin}
                  disabled={!(username && password)}
                >
                  Login
                </Button>
              </Stack>
            </Stack>
          </MyPaper>
        </Fade>
      </Modal>
    </div>
  );
};

export default LoginModal;
