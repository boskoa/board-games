import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  typography: {
    fontFamily: [
      'Roboto',
      'Bangers',
    ],
  },
  palette: {
    background: {
      default: '#D3D3D3',
      paper: '#FFFFFF',
    },
    player1: {
      dark: '#2B7A0B',
      main: '#5BB318',
      light: '#7DCE13',
      contrastText: '#FFFFFF',
    },
    player2: {
      dark: '#770A67',
      main: '#93329E',
      light: '#B4AEE8',
      contrastText: '#FFFFFF',
    },
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
