import React from 'react';
import {
  Typography,
  AppBar,
  CssBaseline,
  Grid,
  Toolbar,
  Container,
  Button,
  Box,
  Menu,
  MenuItem,
  Avatar,
  CardHeader
} from '@mui/material'
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic'
import Signout from "./Signout"

const drawerWidth = 240;


export default function Banner({ userDetails, setUserDetails }) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
        <CssBaseline>
      <AppBar
        color = 'primary' enableColorOnDark
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>

            <LibraryMusicIcon />
            <Typography variant="h5" noWrap component="div" sx={{ flexGrow: 1 }}>
              Song Share
            </Typography>
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              color="inherit"
            >
              <CardHeader
                avatar={
                  <Avatar
                    alt="Profile Picture"
                    src={userDetails.profilePicture}
                    crossOrigin = "anonymous"
                  />}
                title={userDetails.userName}
              />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleClose}>Settings</MenuItem>
              <MenuItem onClick={handleClose}><Signout userDetails={userDetails} setUserDetails={setUserDetails} /></MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </Box>
    </CssBaseline>
  );
}