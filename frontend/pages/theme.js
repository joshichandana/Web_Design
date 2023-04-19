/**
 * File Name: theme.js
 * 
 * About: 
 * This file contains the base theme of the application
 */
// import {Roboto} from '@next/font/google'
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';



// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      // main: '#556cd6',
      main: '#12344d'
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },

  },
  autocomplete : {
    height : '35px',
    padding : 0
  }
//   typography: {
//     fontFamily: roboto.style.fontFamily,
//   },
});

export default theme;