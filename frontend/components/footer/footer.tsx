/**
 * File Name: theme.js
 * 
 * 
 * About: 
 * This file contains the footer component of the app
 * This is a static component that is present all through the application
 */
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import styles from './_footer.module.scss';
import CopyrightIcon from '@mui/icons-material/Copyright';

export default function FooterComponent() {
  return (
    <div className={styles.positioner}>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" 
       sx={{
        bgcolor : '#FFFFFF',
        color : 'teal'
      }} >
        <Toolbar className={styles.wrapper}>
        <CopyrightIcon/>
          IncidentNinja
        </Toolbar>
      </AppBar>
    </Box>
    </div>

  );
}