import { styled, MenuItem, Menu } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectDic } from '../../features/dictionary/dictionarySlice';
import { logout, selectLoginsById } from '../../features/login/loginSlice';

const MyStyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiMenu-paper': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

// dodati dole da prikazuje Item "login" ukoliko igrač nije ulogovan

const MyMenu = ({
  anchorEl, handleClose, id, handleOpenModal,
}) => {
  const loggedIn = useSelector((state) => selectLoginsById(state, id));
  const dispatch = useDispatch();
  console.log('LOGGEDIN', loggedIn);
  const dic = useSelector(selectDic);

  const handleLogout = () => {
    console.log('dodati logout u reducer');
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
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      {loggedIn ? (
        <div>
          <MenuItem onClick={handleClose}>{dic.profile}</MenuItem>
          <MenuItem onClick={handleLogout}>{dic.logout}</MenuItem>
        </div>
      ) : (
        <MenuItem onClick={handleLogin}>{dic.login}</MenuItem>
      )}
    </MyStyledMenu>
  );
};

export default MyMenu;
