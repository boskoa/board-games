import AccountCircle from '@mui/icons-material/AccountCircle';
import {
  Avatar,
  ClickAwayListener,
  IconButton, Tooltip, Typography, Zoom,
} from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import LoginModal from '../../features/login/LoginModal';
import { selectAllLogins } from '../../features/login/loginSlice';
import { selectAllUsers } from '../../features/users/usersSlice';
import MyMenu from './MyMenu';

const PlayerIcon = ({ player, num, l }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const loggedIn = useSelector(selectAllLogins);
  const users = useSelector(selectAllUsers);

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const loggedUser = users.find((u) => u.username === loggedIn[player - 1].username);
  const avatar = `/${loggedUser?.avatar}`;
  const avatarCondition = avatar === '/public/data/defaults/user_avatar';

  return (
    <div>
      <Tooltip
        TransitionComponent={Zoom}
        placement="right"
        title={<Typography variant="body2">{num}</Typography>}
      >
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={anchorEl ? handleClose : handleMenu}
          color="inherit"
        >
          <ClickAwayListener onClickAway={handleClose}>
            {!avatarCondition
              ? <Avatar src={avatar} />
              : <AccountCircle />}
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
