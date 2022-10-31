import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import SendIcon from '@mui/icons-material/Send';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import { useSelector } from 'react-redux';
import {
    doc,
    updateDoc,
    arrayUnion,
    Timestamp,
    serverTimestamp,
    onSnapshot,
} from 'firebase/firestore';
import { v4 as uuid } from 'uuid';

import { db } from '../firebaseConfig';
import TextBody from './TextBody';

export default function RightPart({ mode, chat }) {
    const inputRef = React.useRef();
    const currentUser = useSelector((state) => state.auth);

    const [inputMessage, setInputMessage] = useState('');
    const [messages, setMessages] = useState([]);

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

    const handleSend = async (text) => {
        const lastText = text;
        setInputMessage('');
        if (lastText.length > 0) {
            await updateDoc(doc(db, 'chats', chat[0]), {
                messages: arrayUnion({
                    id: uuid(),
                    text: lastText,
                    senderid: currentUser.uid,
                    date: Timestamp.now(),
                }),
            });
        } else {
            return alert('Please enter some text');
        }
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
        e.code === 'Enter' && e.ctrlKey && handleSend(inputMessage);
    };

    const INVITE_TEMPLATE = `Hey, I'm using Dev Chat+ for Video Calling
                            and much more. Join me on this room: 
                            ${process.env.REACT_APP_BASE_URL}/meet/${chat[0]}`;

    const startVideoCall = () => {
        // handleSend(INVITE_TEMPLATE);
        window.location.href = `/meet/${chat[0]}`;
    };

    return (
        <Box
            component='main'
            sx={{
                flexGrow: 1,
                p: 0,
                width: '100%',
                height: '100vh',
                overflow: 'hidden',
                backgroundColor: mode === 'dark' ? '#1a1a1a' : '#f5f5f5',
            }}
        >
            <Box
                sx={{
                    height: '75px',
                    display: 'flex',
                    alignItems: 'center',
                    pl: 2,
                    ...(mode === 'dark'
                        ? {
                              backgroundColor: 'info.dark',
                          }
                        : {
                              backgroundColor: 'primary.main',
                          }),
                    position: 'sticky',
                    top: 0,
                }}
            >
                {chat.length > 0 ? (
                    <Avatar
                        alt={chat[1].userInfo.username.charAt(0).toUpperCase()}
                        src={chat[1].userInfo.photoURL}
                        sx={{ width: 50, height: 50, mr: 2 }}
                    />
                ) : (
                    <Avatar sx={{ width: 50, height: 50, mr: 2 }}>i</Avatar>
                )}
                <Typography
                    sx={{ color: 'whitesmoke', fontWeight: '400' }}
                    variant='h6'
                >
                    {chat.length > 0 ? chat[1].userInfo.username : 'Chat'}
                </Typography>
                <Grid pr='20px' container justifyContent='flex-end'>
                    <Tooltip title='Video Call'>
                        <IconButton onClick={startVideoCall}>
                            <VideoCallIcon
                                fontSize='large'
                                sx={{ color: 'whitesmoke' }}
                            />
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Box>
            <Box
                sx={{
                    pt: '20px',
                    px: '20px',
                    height: 'calc(100vh - 140px)',
                    overflowY: 'scroll',
                    overflowX: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundImage:
                        mode === 'dark'
                            ? `url('/assets/chat-background-dark.svg')`
                            : `url('/assets/chat-background.svg')`,
                    backgroundSize: '125px',
                }}
            >
                {messages &&
                    messages.map((message) => {
                        return (
                            <TextBody
                                inputRef={inputRef}
                                message={message}
                                key={message.id}
                            />
                        );
                    })}
            </Box>
            <Divider />
            <Box
                sx={{
                    position: 'sticky',
                    bottom: '0',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor:
                            mode === 'dark' ? '#1a1a1a' : '#f5f5f5',
                        p: 1,
                    }}
                >
                    <TextField
                        inputRef={inputRef}
                        sx={{
                            width: '100%',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '15px',
                                backgroundColor:
                                    mode === 'dark' ? '#101010' : '#f0f0f0',
                            },
                            border: 'none',
                        }}
                        size='small'
                        multiline
                        maxRows={2}
                        placeholder='Message'
                        autoFocus
                        onChange={(e) => setInputMessage(e.target.value)}
                        value={inputMessage}
                        onKeyDown={handleKey}
                        focused
                    />
                    <IconButton
                        onClick={() => {
                            handleSend(inputMessage);
                        }}
                        sx={{ mx: '10px' }}
                    >
                        <Tooltip title='Hit Ctrl + Enter to send'>
                            <SendIcon
                                sx={{
                                    fontSize: '33px',
                                    color: 'info.main',
                                }}
                            />
                        </Tooltip>
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
}
