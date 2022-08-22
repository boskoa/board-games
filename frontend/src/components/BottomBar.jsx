import React from 'react';
import { Typography, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { selectDic } from '../features/dictionary/dictionarySlice';

const MyStack = styled(Stack)(({ theme }) => ({
  position: 'fixed',
  top: 'auto',
  bottom: 0,
  right: 0,
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.error.main,
  flexDirection: 'row',
  justifyContent: 'center',
  width: '100vw',
  flexWrap: 'wrap',
}));

const BottomBar = () => {
  const dic = useSelector(selectDic);

  return (
    <MyStack>
      <Typography variant="h6">{dic.ticTacToe}</Typography>
    </MyStack>
  );
};

export default BottomBar;
