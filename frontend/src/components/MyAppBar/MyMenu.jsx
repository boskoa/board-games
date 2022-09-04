import {
  styled, MenuItem, Menu, Slide, Typography,
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectDic } from '../../features/dictionary/dictionarySlice';
import { logout, selectLoginsById } from '../../features/login/loginSlice';
import { selectAllUsers } from '../../features/users/usersSlice';

export const MyStyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiMenu-paper': {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
  },
  zIndex: 1099,
}));

const MyMenu = ({
  anchorEl, handleClose, id, handleOpenModal,
}) => {
  const loggedIn = useSelector((state) => selectLoginsById(state, id));
  const user = useSelector(selectAllUsers).find((u) => u.username === loggedIn?.username);
  const dispatch = useDispatch();
  const dic = useSelector(selectDic);

  const handleLogout = () => {
    window.localStorage.removeItem(`loggedGamerUser${id}`);
    dispatch(logout(id));
    handleClose();
  };

  const handleLogin = () => {
    handleOpenModal();
    handleClose();
  };

  return (
    <MyStyledMenu
      id={id}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      TransitionComponent={Slide}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      {loggedIn ? (
        <div>
          <MenuItem onClick={handleClose}>
            <Typography>
              <Link
                to={`/users/${user?.username}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                {user?.name}
              </Link>
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <Typography>{dic.logout}</Typography>
          </MenuItem>
        </div>
      ) : (
        <MenuItem onClick={handleLogin}>
          <Typography>{dic.login}</Typography>
        </MenuItem>
      )}
    </MyStyledMenu>
  );
};

export default MyMenu;
