import React from 'react';
import {Typography, AppBar, CssBaseline, Grid, Toolbar, Container} from  '@mui/material'
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic'

const drawerWidth = 240;
export default function Banner() {
    return (
        <CssBaseline>
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
            <LibraryMusicIcon />
          <Typography variant="h6" noWrap component="div">
            Song Share
          </Typography>
        </Toolbar>
      </AppBar>
        </CssBaseline>
    );
}