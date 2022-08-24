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
    warning: {
      dark: '#FFFFFF',
      main: '#DDDDDD',
      light: '#AAAAAA',
      contrastText: '#000000',
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
      dark: '#000000',
      main: '#333333',
    },
    background: {
      default: '#005052',
      paper: '#399106',
    },
    text: {
      primary: '#FFFFFF',
    },
    primary: {
      dark: '#065471',
      main: '#09708A',
    },
    player1: {
      dark: '#1A690A',
      main: '#399106',
      light: '#7DCE13',
      contrastText: '#FFFFFF',
    },
    player2: {
      dark: '#660956',
      main: '#71107C',
      light: '#B4AEE8',
      contrastText: '#FFFFFF',
    },
  },
});
