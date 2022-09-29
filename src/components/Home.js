import React, { useEffect, useState } from 'react';
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
import GlobalStyles from '@mui/material/GlobalStyles';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import {
    onSnapshot,
    doc,
    updateDoc,
    arrayUnion,
    Timestamp,
    serverTimestamp,
} from 'firebase/firestore';
import { v4 as uuid } from 'uuid';

import TabsNav from './TabsNav';
import TextBody from './TextBody';
import { signOutAction } from '../actions/actions';
import { auth, db } from '../firebaseConfig';

const drawerWidth = 470;

export default function Home({ themeChange, mode }) {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth);
    const [chat, setChat] = useState([]);
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');

    useEffect(() => {
        const getUserMesaages = () => {
            const unsub = onSnapshot(doc(db, 'chats', chat[0]), (doc) => {
                doc.exists() && setMessages(doc.data().messages);
            });
            return () => {
                unsub();
            };
        };
        chat.length > 0 && getUserMesaages();
    }, [chat]);

    const logOut = () => {
        signOut(auth)
            .then(() => {
                dispatch(signOutAction());
            })
            .catch((error) => {
                alert(error);
            });
    };

    const handleSend = async () => {
        if (text.length > 0) {
            await updateDoc(doc(db, 'chats', chat[0]), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderid: currentUser.uid,
                    date: Timestamp.now(),
                }),
            });
        } else {
            alert('Please enter some text');
        }
        const lastText = text;
        setText('');
        await updateDoc(doc(db, 'userChats', currentUser.uid), {
            [chat[0] + '.lastMessage']: {
                text: lastText,
            },
            [chat[0] + '.date']: serverTimestamp(),
        });
        await updateDoc(doc(db, 'userChats', chat[1].userInfo.uid), {
            [chat[0] + '.lastMessage']: {
                text: lastText,
            },
            [chat[0] + '.date']: serverTimestamp(),
        });
    };

    const handleKey = (e) => {
        e.code === 'Enter' && handleSend();
    };

    const startVideoCall = () => {
        window.open('/meet/123-3431-23', '_blank');
    };

    // This section is for changing default CSS styles for HTML elements
    // @vishal see https://mui.com/customization/how-to-customize/#global-css-override
    const inputGlobalStyles = <GlobalStyles styles={{

        '*::-webkit-scrollbar': {
            width: '0.6rem',
        },
        '*::-webkit-scrollbar-track': {
            color: 'transparent',
            border: 'none',
        },
        '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',
            borderRadius: '0.3rem',
        },
        '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#555',
        },
        ...(mode === 'dark'
            ? {
                '::-webkit-scrollbar-thumb': {
                    border: '2px solid #1a1a1a',
                }
            }
            : {
                '::-webkit-scrollbar-thumb': {
                    border: '2px solid #f5f5f5',
                },
            }),
    }} />;

    return (
        <Box sx={{ display: 'flex' }}>

            {/* Changes default CSS styles for scrollbars, search keyword*/}
            {inputGlobalStyles}

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
                        pl: 1,
                        backgroundColor: 'info.main',
                        borderRight: '1px solid',
                        borderColor: 'info.dark',
                    }}
                >
                    <IconButton sx={{ borderRadius: '0' }}>
                        <Avatar
                            sx={{
                                width: 50,
                                height: 50,
                                mr: 2,
                            }}
                            alt={currentUser.username.charAt(0).toUpperCase()}
                            src={currentUser.photoURL}
                        />
                        <Typography sx={{ color: 'white' }} variant='h5'>
                            {currentUser.username}
                        </Typography>
                    </IconButton>
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
                            <IconButton onClick={logOut}>
                                <LogoutIcon sx={{ color: 'lightsteelblue' }} />
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
                            : {
                                borderRight: '1px solid rgba(0, 0, 0, 0.12)',
                            }),
                    }}
                >
                    <TabsNav mode={mode} setChat={setChat} />
                </Box>
            </Drawer>
            <Box
                component='main'
                sx={{
                    flexGrow: 1,
                    p: 0,
                    width: '100%',
                    height: '100vh',
                    overflow: 'hidden',
                    ...(mode === 'dark'
                        ? {
                            backgroundColor: '#1a1a1a',
                            color: 'white',
                        }
                        : {
                            backgroundColor: '#f5f5f5',
                            color: 'black',
                        }),
                }}
            >
                <Box
                    sx={{
                        height: '75px',
                        display: 'flex',
                        alignItems: 'center',
                        pl: 2,
                        position: 'inherit',
                        backgroundColor: 'info.main',
                        // boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.4)',
                    }}
                >
                    {chat.length > 0 ? (
                        <Avatar
                            alt={chat[1].userInfo.username
                                .charAt(0)
                                .toUpperCase()}
                            src={chat[1].userInfo.photoURL}
                            sx={{ width: 50, height: 50, mr: 2 }}
                        />
                    ) : (
                        <Avatar sx={{ width: 50, height: 50, mr: 2 }}>i</Avatar>
                    )}
                    <Typography
                        sx={{ color: 'white', fontWeight: '400' }}
                        variant='h6'
                    >
                        {chat.length > 0 ? chat[1].userInfo.username : 'Chat'}
                    </Typography>
                    <Grid pr='20px' container justifyContent='flex-end'>
                        <Tooltip title='Video Call'>
                            <IconButton onClick={startVideoCall}>
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
                        overflowX: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    {messages.map((message) => {
                        return <TextBody message={message} key={message.id} />;
                    })}
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
                            placeholder='Message'
                            autoFocus
                            onChange={(e) => setText(e.target.value)}
                            value={text}
                            onKeyDown={handleKey}
                        />
                        <IconButton onClick={handleSend} sx={{ mr: '20px' }}>
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
        </Box >
    );
}
