import React from 'react';
import { Box, styled, Typography } from '@mui/material';

const StyledBox = styled(Box)(({ theme }) => ({
  width: '10%',
  maxWidth: 40,
  margin: 3,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderRadius: 3,
}));

const LetterBox = ({ letter }) => (
  <StyledBox sx={{ boxShadow: 3 }}>
    <Typography align="center" variant="h5">{letter}</Typography>
  </StyledBox>
);

export default LetterBox;
