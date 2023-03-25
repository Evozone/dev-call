import React, { useState, useEffect } from 'react';

// MUI components
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';

import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import DownloadIcon from '@mui/icons-material/Download';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import LogoutIcon from '@mui/icons-material/Logout';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import { useDispatch, useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { collection, onSnapshot } from 'firebase/firestore';

import { notifyAction, signOutAction } from '../actions/actions';
import { auth } from '../firebaseConfig';
import { db } from '../firebaseConfig';

// Custom components
import ChatInterface from './ChatInterface';
import TabsNav from './TabsNav';
import UserProfileModal from './UserProfileModal';

const drawerWidth = 470;

// Component
export default function Home({ themeChange, mode }) {

    const dispatch = useDispatch();

    const currentUser = useSelector((state) => state.auth);

    const [modalOpen, setModalOpen] = useState(false);
    const [chat, setChat] = useState([]);
    const [senderid, setSenderid] = useState('');
    const [notificationGranted, setNotificationGranted] = useState(
        Notification.permission === 'granted'
    );
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        const unsub2 = onSnapshot(collection(db, 'chats'), (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === 'modified') {
                    const modifiedData = change.doc.data();
                    const length = modifiedData.messages.length;
                    const newMessage = modifiedData.messages[length - 1];
                    const sid = newMessage.senderid;
                    const senderUsername = newMessage?.senderUsername;
                    if (
                        sid !== currentUser.uid &&
                        chat[1]?.userInfo?.uid !== sid
                    ) {
                        if (notificationGranted) {
                            const audio = new Audio(
                                '/assets/sounds/notification.mp3'
                            );
                            const notification = new Notification('Dev Chat+', {
                                body:
                                    'New message from ' +
                                    (senderUsername ? senderUsername : sid),
                                icon: '/logo192.png',
                                tag: sid,
                            });
                            audio.play();
                            notification.onclick = () => {
                                window.focus();
                            };
                        } else {
                            dispatch(
                                notifyAction(
                                    true,
                                    'info',
                                    'New message from ' +
                                    (senderUsername ? senderUsername : sid)
                                )
                            );
                        }
                        setSenderid(sid);
                    }
                }
            });
        });

        return () => {
            unsub2();
        };
    }, [chat, notificationGranted]);

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

    // Layout
    return (
        // Parent Box
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            {/* Left side */}
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        borderRight: 'none',
                        overflow: 'hidden',
                    },
                }}
                variant='permanent'
                anchor='left'
            >
                {/* The header with the name of the person. */}
                <Box
                    sx={{
                        height: '75px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        pl: 1,
                        backgroundColor: mode === 'light' ? 'primary.main' : 'info.dark',
                        borderRight: '1px solid',
                        borderColor: 'primary.dark',
                    }}
                >
                    {/* The profile icon and name */}
                    <IconButton
                        sx={{ borderRadius: '0' }}
                        onClick={() => setModalOpen(true)}
                    >
                        <Avatar
                            sx={{
                                width: 50,
                                height: 50,
                                mr: 2,
                            }}
                            alt={currentUser.username.charAt(0).toUpperCase()}
                            src={currentUser.photoURL}
                        />
                        <Typography sx={{ color: 'whitesmoke' }} variant='h5'>
                            {currentUser.username}
                        </Typography>
                    </IconButton>

                    {modalOpen && (
                        <UserProfileModal
                            modalOpen={modalOpen}
                            setModalOpen={setModalOpen}
                            themeChange={themeChange}
                            mode={mode}
                        />
                    )}

                    {/* The Menu and Logout Button*/}
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
                </Box>

                {/* Not the header */}
                <Box
                    sx={{
                        height: 'calc(100% - 75px)',
                        ...(mode === 'dark'
                            ? {
                                borderRight:
                                    '1px solid rgba(255, 255, 255, 0.12)',
                            }
                            : {
                                borderRight: '1px solid rgba(0, 0, 0, 0.12)',
                            }),
                    }}
                >
                    <TabsNav
                        {...{ mode, chat, setChat, senderid, setSenderid }}
                    />
                </Box>
            </Drawer>

            {/* Right side */}
            {chat.length === 0 ? (
                <Box
                    sx={{
                        height: '100vh',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor:
                            mode === 'dark' ? '#1f1f1f' : 'whitesmoke',
                    }}
                >
                    <img
                        src={
                            mode === 'dark'
                                ? '/assets/welcome-screen-dark.svg'
                                : '/assets/welcome-screen.svg'
                        }
                        alt='chat'
                        style={{ width: '400px', height: '400px' }}
                    />
                    <Typography
                        sx={{
                            color: mode === 'dark' ? '#0288d1' : '#1976d2',
                            fontFamily: 'Comfortaa',
                            fontWeight: '700',
                            fontSize: '2rem',
                        }}
                    >
                        welcome to dev chat +
                    </Typography>
                </Box>
            ) : (
                <ChatInterface chat={chat} mode={mode} />
            )}
        </Box>
    );
}
