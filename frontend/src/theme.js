import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark', 
    primary: {
      main: '#BB86FC',
    },
    secondary: {
      main: '#03DAC6',
    },
    background: {
      default: '#424242',
      paper: '#121212',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#E0E0E0',
    },
  },
});


const lightTheme = createTheme({
    palette: {
      mode: 'light', 
      primary: {
        main: '#2C3E50', 
        contrastText: '#ECF0F1',
      },
      secondary: {
        main: '#27AE60', 
      },
      background: {
        default: '#ECF0F1', 
        paper: '#FFFFFF', 
      },
      text: {
        primary: '#2C3E50', 
        secondary: '#000000', 
      },
    },
  });

export  {darkTheme,lightTheme};
