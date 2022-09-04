import React from 'react';
import { useSelector } from 'react-redux';
import {
  Paper, Slide, Stack, styled, TextField,
} from '@mui/material';
import { selectDic } from '../../../features/dictionary/dictionarySlice';

const MyPaper = styled(Paper)(({ theme }) => ({
  transform: 'translate(-50%, -50%)',
  width: '40%',
  minWidth: 200,
  backgroundColor: theme.palette.background.paper,
  padding: 10,
  borderRadius: 3,
  marginBottom: 10,
}));

const WordInput = ({
  timeUp, open, setWord, word, side,
}) => {
  const dic = useSelector(selectDic);

  return (
    <Slide in={open} direction="up">
      <MyPaper elevation={5} sx={side === 'left' ? { ml: 'auto' } : null}>
        <Stack>
          <TextField
            InputProps={{
              readOnly: timeUp,
            }}
            type={timeUp ? 'text' : 'password'}
            value={word}
            label={dic.inputWord}
            variant="outlined"
            onChange={(e) => setWord(e.target.value)}
            sx={{ m: 1 }}
          />
        </Stack>
      </MyPaper>
    </Slide>
  );
};

export default WordInput;
