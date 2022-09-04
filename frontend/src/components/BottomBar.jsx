import React from 'react';
import { Typography, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { selectDic } from '../features/dictionary/dictionarySlice';

const MyStack = styled(Stack)(({ theme }) => ({
  position: 'absolute',
  top: 'auto',
  bottom: 0,
  right: 0,
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.error.main,
  flexDirection: 'row',
  justifyContent: 'center',
  width: '100%',
  flexWrap: 'wrap',
}));

const BottomBar = ({ game }) => {
  const dic = useSelector(selectDic);

  return (
    <MyStack>
      <Typography variant="h6">{dic[game]}</Typography>
    </MyStack>
  );
};

export default BottomBar;
