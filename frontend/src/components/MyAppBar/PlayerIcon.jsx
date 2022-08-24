import AccountCircle from '@mui/icons-material/AccountCircle';
import {
  ClickAwayListener,
  IconButton, Tooltip, Typography, Zoom,
} from '@mui/material';
import React, { useState } from 'react';
import LoginModal from '../../features/login/LoginModal';
import MyMenu from './MyMenu';

const PlayerIcon = ({ player, num, l }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Tooltip
        TransitionComponent={Zoom}
        placement="right"
        title={<Typography variant="body2">{num}</Typography>}
      >
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={anchorEl ? handleClose : handleMenu}
          color="inherit"
        >
          <ClickAwayListener onClickAway={handleClose}>
            <AccountCircle />
          </ClickAwayListener>
        </IconButton>
      </Tooltip>
      <MyMenu
        anchorEl={anchorEl}
        handleClose={handleClose}
        handleOpenModal={handleOpenModal}
        id={player}
        l={l}
      />
      <LoginModal user={player} open={open} handleClose={handleCloseModal} />
    </div>
  );
};

export default PlayerIcon;
