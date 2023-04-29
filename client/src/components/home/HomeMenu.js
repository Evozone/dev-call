import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

// Actions
import { signOutAction, notifyAction } from '../../actions/actions';

// MUI components
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';

// MUI icons
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DownloadIcon from '@mui/icons-material/Download';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import LogoutIcon from '@mui/icons-material/Logout';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export default function HomeMenu({
  notificationGranted, setNotificationGranted, themeChange, mode
}) {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);

  const logOut = () => {
    const choice = window.confirm('Please click on OK to Log Out.');
    if (choice) {
      signOut(auth)
        .then(() => {
          dispatch(signOutAction());
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error);
          dispatch(
            notifyAction(
              true,
              'error',
              'Log Out action Failed. Please try again'
            )
          );
        });
    }
  };

  const handleInstall = () => {
    dispatch(notifyAction(true, 'info', 'Install feature coming soon...'));
  };

  const notificationPrompt = () => {
    Notification.requestPermission().then((result) => {
      if (result === 'granted') {
        setNotificationGranted(true);
        const notification = new Notification('Dev Chat+', {
          body: 'You will be notified like this when you receive a new message',
          icon: '/assets/icons/maskable_icon_x48.png',
        });
        const audio = new Audio('/assets/sounds/notification.mp3');
        audio.play();
        notification.onclick = () => {
          window.focus();
          audio.pause();
        };
      }
    });
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mr: 1,
      }}
    >
      <IconButton onClick={handleMenuClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={notificationPrompt}>
          <ListItemIcon>
            <NotificationsActiveIcon
              sx={{ color: mode === 'dark' ? 'whitesmoke' : 'primary.dark' }}
            />
          </ListItemIcon>
          <ListItemText primary="Notifications" />
        </MenuItem>
        <MenuItem onClick={themeChange}>
          <ListItemIcon>
            {mode === 'dark' ? (
              <LightModeIcon
                sx={{ color: mode === 'dark' ? 'whitesmoke' : 'primary.dark' }}
              />
            ) : (
              <DarkModeIcon
                sx={{ color: mode === 'dark' ? 'whitesmoke' : 'primary.dark' }}
              />
            )}
          </ListItemIcon>
          <ListItemText primary="Toggle Theme" />
        </MenuItem>
        <MenuItem onClick={handleInstall}>
          <ListItemIcon>
            <DownloadIcon
              sx={{ color: mode === 'dark' ? 'whitesmoke' : 'primary.dark' }}
            />
          </ListItemIcon>
          <ListItemText primary="Install App" />
        </MenuItem>
      </Menu>
      <Divider
        orientation='vertical'
        sx={{
          backgroundColor: mode === 'dark' ? 'whitesmoke' : 'primary.dark',
          opacity: 0.5,
          height: '40px',
          width: '1px',
          my: 1,
          mr: 0.5
        }}
      />
      <Tooltip title='Logout'>
        <IconButton onClick={logOut}>
          <LogoutIcon sx={{ color: 'lightsteelblue' }} />
        </IconButton>
      </Tooltip>
    </Box>
  )
}
