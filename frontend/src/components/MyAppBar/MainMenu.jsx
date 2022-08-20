import {
  Button, Chip, Menu, MenuItem, Stack, styled,
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeDic, selectDic } from '../../features/dictionary/dictionarySlice';

const StyledButton = styled(Button)(() => ({
  width: 130,
}));

const MainMenu = () => {
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
        {dic.menu}
      </StyledButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>{dic.players}</MenuItem>
        <MenuItem onClick={handleClose}>{dic.statistics}</MenuItem>
        <MenuItem onClick={handleClose}>
          <Stack direction="row" spacing={1}>
            <Chip size="small" label="ENG" onClick={() => dispatch(changeDic(0))} />
            <Chip size="small" label="SRB" onClick={() => dispatch(changeDic(1))} />
          </Stack>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MainMenu;
