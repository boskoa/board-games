import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  typography: {
    fontFamily: [
      'Roboto',
      'Bangers',
    ],
  },
});

export const darkTheme = createTheme({
  typography: {
    fontFamily: [
      'Roboto',
      'Bangers',
    ],
  },
  palette: {
    error: {
      main: '#000000',
    },
    background: {
      default: '#008385',
      paper: '#005152',
    },
    text: {
      primary: '#80B425',
    },
  },
});
