import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download';
import LogoutIcon from '@mui/icons-material/Logout';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch } from 'react-redux';

import TabsNav from './TabsNav';
import TextBody from './TextBody';
import { signOutAction } from '../actions/actions';

const drawerWidth = 470;

export default function Home({ themeChange, mode }) {
    const dispatch = useDispatch();

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        borderRight: 'none',
                    },
                }}
                variant='permanent'
                anchor='left'
            >
                <Box
                    sx={{
                        height: '75px',
                        display: 'flex',
                        alignItems: 'center',
                        pl: 2,
                        backgroundColor: 'info.main',
                        // edit the below @bhargav
                        borderRight: '5px solid red',
                    }}
                >
                    <Avatar sx={{ width: 50, height: 50, mr: 2 }}>i</Avatar>
                    <Typography sx={{ color: 'white' }} variant='h5'>
                        itsvishal2417
                    </Typography>
                    <Grid pr='10px' container justifyContent='flex-end'>
                        <Tooltip title='Toggle Theme'>
                            <IconButton
                                onClick={themeChange}
                                sx={{ mr: '10px' }}
                            >
                                {mode === 'dark' ? (
                                    <LightModeIcon />
                                ) : (
                                    <DarkModeIcon sx={{ color: 'white' }} />
                                )}
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Install App '>
                            <IconButton sx={{ mr: '10px' }}>
                                <DownloadIcon sx={{ color: 'white' }} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Logout'>
                            <IconButton
                                onClick={() => dispatch(signOutAction())}
                            >
                                <LogoutIcon color='error' />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Box>
                <Box
                    sx={{
                        height: 'calc(100% - 75px)',
                        ...(mode === 'dark'
                            ? {
                                  borderRight:
                                      '1px solid rgba(255, 255, 255, 0.12)',
                              }
                            : { borderRight: '1px solid rgba(0, 0, 0, 0.12)' }),
                    }}
                >
                    <TabsNav mode={mode} />
                </Box>
            </Drawer>
            <Box
                component='main'
                sx={{
                    flexGrow: 1,
                    bgcolor: 'background.default',
                    p: 0,
                    width: '100%',
                    height: '100vh',
                    overflow: 'hidden',
                }}
            >
                <Box
                    sx={{
                        height: '75px',
                        display: 'flex',
                        alignItems: 'center',
                        pl: 2,
                        backgroundColor: 'info.main',
                    }}
                >
                    <Avatar sx={{ width: 50, height: 50, mr: 2 }}>i</Avatar>
                    <Typography sx={{ color: 'white' }} variant='h6'>
                        thebrahmnicboy
                    </Typography>
                    <Grid pr='20px' container justifyContent='flex-end'>
                        <Tooltip title='Video Call'>
                            <IconButton>
                                <VideoCallIcon
                                    fontSize='large'
                                    sx={{ color: 'white' }}
                                />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Box>
                <Box
                    sx={{
                        pt: 3,
                        px: '20px',
                        height: 'calc(100vh - 131px)',
                        overflow: 'scroll',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <TextBody />
                    <TextBody owner='owner' />
                    <TextBody />
                    <TextBody />
                    <TextBody owner='owner' />
                    <TextBody owner='owner' />
                    <TextBody />
                    <TextBody />
                    <TextBody owner='owner' />
                </Box>
                <Box
                    sx={{
                        bottom: '0',
                        width: '100%',
                    }}
                >
                    <Divider />
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            sx={{
                                width: '100%',
                                m: 1,
                                ml: '20px',
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '20px',
                                },
                            }}
                            size='small'
                            multiline
                            maxRows={1}
                        />
                        <IconButton sx={{ mr: '20px' }}>
                            <SendIcon
                                sx={{
                                    fontSize: '33px',
                                    color: 'info.main',
                                }}
                            />
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
