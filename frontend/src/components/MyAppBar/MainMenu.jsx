import {
  Chip, Divider, IconButton, MenuItem, Slide, Stack, styled, Switch, Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';
import { changeDic, selectDic } from '../../features/dictionary/dictionarySlice';
import { MyStyledMenu } from './MyMenu';

const StyledButton = styled(IconButton)(() => ({
  color: 'inherit',
  borderRadius: 0,
}));

const MainMenu = ({ dark, setDark }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dic = useSelector(selectDic);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTheme = () => {
    setDark(!dark);
    window.localStorage.setItem('gamesTheme', JSON.stringify(Number(!dark)));
  };

  const handleLang = (e) => {
    const l = e.target.innerHTML === 'ENG' ? 0 : 1;
    dispatch(changeDic(l));
    window.localStorage.setItem('gamesLanguage', JSON.stringify(l));
  };

  return (
    <div>
      <StyledButton
        variant="filled"
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MenuIcon fontSize="large" />
      </StyledButton>
      <MyStyledMenu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        sx={{ mt: 5 }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClose={handleClose}
        TransitionComponent={Slide}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem>
          <Typography sx={{ m: 'auto' }}>{dic.menu}</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <Typography>{dic.players}</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Typography>{dic.statistics}</Typography>
        </MenuItem>
        <MenuItem>
          <Typography sx={{ mr: 1 }}>{dic.darkTheme}</Typography>
          <Switch
            checked={dark}
            color="primary"
            size="small"
            onChange={handleTheme}
          />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Stack direction="row" spacing={1}>
            <Chip
              clickable
              size="small"
              label={<Typography>ENG</Typography>}
              onClick={(e) => handleLang(e)}
              color="success"
            />
            <Chip
              clickable
              size="small"
              label={<Typography>SRB</Typography>}
              onClick={(e) => handleLang(e)}
              color="success"
            />
          </Stack>
        </MenuItem>
      </MyStyledMenu>
    </div>
  );
};

export default MainMenu;
