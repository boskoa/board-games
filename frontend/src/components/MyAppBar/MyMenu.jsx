import {
  styled, MenuItem, Menu, Slide, Typography,
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectDic } from '../../features/dictionary/dictionarySlice';
import { logout, selectLoginsById } from '../../features/login/loginSlice';

export const MyStyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiMenu-paper': {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    marginTop: 6,
  },
  zIndex: 1099,
}));

const MyMenu = ({
  anchorEl, handleClose, id, handleOpenModal,
}) => {
  const loggedIn = useSelector((state) => selectLoginsById(state, id));
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
      keepMounted
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
            <Typography>{loggedIn.name}</Typography>
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
