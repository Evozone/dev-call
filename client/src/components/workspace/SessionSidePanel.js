import React, { useRef, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import GroupsIcon from '@mui/icons-material/Groups';
import ChatIcon from '@mui/icons-material/Chat';
import InterpreterModeIcon from '@mui/icons-material/InterpreterMode';
import { Typography } from '@mui/material';

import Coder from './Coder';
import CoderOnCall from './CoderOnCall';
import MessageInput from '../MessageInput';
import StartCall from './StartCall';

export default function SessionSidePanel({ coders }) {
    // create an example array of length 50 named coders which will have the random names starting with different alphabetof the coders and a radnom id
    // const clients = [
    //     { id: 1, name: 'A' },
    //     { id: 2, name: 'B' },
    //     { id: 3, name: 'C' },
    //     { id: 4, name: 'D' },
    //     { id: 5, name: 'E' },
    //     { id: 6, name: 'F' },
    //     { id: 7, name: 'G' },
    //     { id: 8, name: 'H' },
    //     { id: 9, name: 'I' },
    //     { id: 10, name: 'J' },
    //     { id: 11, name: 'K' },
    //     { id: 12, name: 'L' },
    //     { id: 13, name: 'M' },
    //     { id: 14, name: 'N' },
    //     { id: 15, name: 'O' },
    //     { id: 16, name: 'P' },
    //     { id: 17, name: 'Q' },
    //     { id: 18, name: 'R' },
    //     { id: 19, name: 'S' },
    //     { id: 20, name: 'T' },
    //     // { id: 21, name: 'U' },
    //     // { id: 22, name: 'V' },
    //     // { id: 23, name: 'W' },
    //     // { id: 24, name: 'X' },
    //     // { id: 25, name: 'Y' },
    //     // { id: 26, name: 'Z' },
    //     // { id: 27, name: 'A' },
    //     // { id: 28, name: 'B' },
    //     // { id: 29, name: 'C' },
    //     // { id: 30, name: 'D' },
    //     // { id: 31, name: 'E' },
    //     // { id: 32, name: 'F' },
    //     // { id: 33, name: 'G' },
    //     // { id: 34, name: 'H' },
    //     // { id: 35, name: 'I' },
    //     // { id: 36, name: 'J' },
    //     // { id: 37, name: 'K' },
    //     // { id: 38, name: 'L' },
    //     // { id: 39, name: 'M' },
    //     // { id: 40, name: 'N' },
    //     // { id: 41, name: 'O' },
    //     // { id: 42, name: 'P' },
    //     // { id: 43, name: 'Q' },
    //     // { id: 44, name: 'R' },
    //     // { id: 45, name: 'S' },
    //     // { id: 46, name: 'T' },
    //     // { id: 47, name: 'U' },
    //     // { id: 48, name: 'V' },
    //     // { id: 49, name: 'W' },
    //     // { id: 50, name: 'X' },
    // ];

    //create an array of messages of length 50 with random messages and numeric id and sender shoulde be true or false
    const messages = [
        {
            id: 1,
            message:
                'Helloppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp',
            sender: true,
        },
        { id: 2, message: 'Hi', sender: false },
        { id: 3, message: 'How are you?', sender: true },
        { id: 4, message: 'I am fine', sender: false },
        { id: 5, message: 'Hello', sender: true },
        { id: 6, message: 'Hi', sender: false },
        { id: 7, message: 'How are you?', sender: true },
        { id: 8, message: 'I am fine', sender: false },
        { id: 9, message: 'Hello', sender: true },
        { id: 10, message: 'Hi', sender: false },
        { id: 11, message: 'How are you?', sender: true },
        { id: 12, message: 'I am fine', sender: false },
        { id: 13, message: 'Hello', sender: true },
        { id: 14, message: 'Hi', sender: false },
        { id: 15, message: 'How are you?', sender: true },
        { id: 16, message: 'I am fine', sender: false },
        { id: 17, message: 'Hello', sender: true },
        { id: 18, message: 'Hi', sender: false },
        { id: 19, message: 'How are you?', sender: true },
        { id: 20, message: 'I am fine', sender: false },
        { id: 21, message: 'Hello', sender: true },
        { id: 22, message: 'Hi', sender: false },
        { id: 23, message: 'How are you?', sender: true },
        { id: 24, message: 'I am fine', sender: false },
        { id: 25, message: 'Hello', sender: true },
        { id: 26, message: 'Hi', sender: false },
        { id: 27, message: 'How are you?', sender: true },
        { id: 28, message: 'I am fine', sender: false },
        { id: 29, message: 'Hello', sender: true },
        { id: 30, message: 'Hi', sender: false },
        // { id: 31, message: 'How are you?', sender: true },
        // { id: 32, message: 'I am fine', sender: false },
        // { id: 33, message: 'Hello', sender: true },
        // { id: 34, message: 'Hi', sender: false },
        // { id: 35, message: 'How are you?', sender: true },
        // { id: 36, message: 'I am fine', sender: false },
        // { id: 37, message: 'Hello', sender: true },
        // { id: 38, message: 'Hi', sender: false },
        // { id: 39, message: 'How are you?', sender: true },
        // { id: 40, message: 'I am fine', sender: false },
        // { id: 41, message: 'Hello', sender: true },
        // { id: 42, message: 'Hi', sender: false },
        // { id: 43, message: 'How are you?', sender: true },
        // { id: 44, message: 'I am fine', sender: false },
        // { id: 45, message: 'Hello', sender: true },
        // { id: 46, message: 'Hi', sender: false },
        // { id: 47, message: 'How are you?', sender: true },
        // { id: 48, message: 'I am fine', sender: false },
        // { id: 49, message: 'Hello', sender: true },
        // { id: 50, message: 'Hi', sender: false },
    ];

    const inputRef = useRef();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        console.log(typeof newValue, newValue);
        setValue(newValue);
    };

    const MODE = 'work';

    return (
        <Box
            sx={{
                height: '97vh',
                overflowY: 'hidden',
                color: 'white',
                mt: '0',
            }}
        >
            <AppBar elevation={0} color='inherit' position='static'>
                <Tabs
                    sx={{
                        height: '57px',
                        alignItems: 'center',
                        backgroundColor: '#00205d',
                    }}
                    value={value}
                    onChange={handleChange}
                    textColor='inherit'
                    variant='fullWidth'
                >
                    <Tab
                        sx={{
                            height: '57px',
                            fontSize: '1.1rem',
                            borderRight: '1px solid rgba(255, 255, 255, 0.12)',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
                        }}
                        icon={<GroupsIcon sx={{ fontSize: '36px' }} />}
                    />
                    <Tab
                        sx={{
                            height: '57px',
                            fontSize: '1.1rem',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
                        }}
                        icon={<ChatIcon sx={{ fontSize: '34px' }} />}
                    />
                    <Tab
                        sx={{
                            height: '57px',
                            fontSize: '1.1rem',
                            borderLeft: '1px solid rgba(255, 255, 255, 0.12)',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
                        }}
                        icon={<InterpreterModeIcon sx={{ fontSize: '34px' }} />}
                    />
                </Tabs>
            </AppBar>
            {value === 0 && (
                <Box sx={{ m: 1, height: '80vh' }}>
                    <h2 style={{ marginTop: '3px' }}>Dev&apos;s Connected</h2>
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(4, 1fr)',
                            gap: '16px 8px',
                            gridAutoFlow: 'dense',
                            maxHeight: '85%',
                            overflowY: 'auto',
                            ...(coders.length > 28 && {
                                border: '2px solid rgb(0 32 93)',
                                borderRadius: '5px',
                                p: 1,
                            }),
                        }}
                    >
                        {coders &&
                            coders.map((coder) => (
                                <Coder
                                    key={coder.socketId}
                                    username={coder.username}
                                />
                            ))}
                    </Box>
                </Box>
            )}
            {value === 1 && (
                <Box
                    sx={{
                        height: '83vh',
                    }}
                >
                    <Box
                        sx={{
                            height: '90%',
                            maxHeight: '90%',
                            overflowY: 'auto',
                            backgroundColor: '#101010',
                            backgroundImage: `url('/assets/chat-background-dark.svg')`,
                            backgroundSize: '115px',
                            display: 'flex',
                            flexDirection: 'column',
                            p: 1,
                        }}
                    >
                        {messages &&
                            messages.map((message) => (
                                <Box
                                    key={message.id}
                                    sx={{
                                        borderRadius: '20px',
                                        borderBottomLeftRadius: '2px',
                                        maxWidth: '15rem',
                                        width: 'fit-content',
                                        p: '12px',
                                        color: 'white',
                                        mb: 1,
                                        display: 'flex',
                                        alignItems: 'end',
                                        ...(message.sender
                                            ? {
                                                  alignSelf: 'flex-end',
                                                  borderBottomLeftRadius:
                                                      '20px',
                                                  borderBottomRightRadius:
                                                      '1px',
                                                  backgroundColor: '#25D366',
                                              }
                                            : { backgroundColor: '#34B7F1' }),
                                    }}
                                >
                                    <Typography
                                        sx={{ wordBreak: 'break-word' }}
                                    >
                                        {message.message}
                                    </Typography>
                                </Box>
                            ))}
                    </Box>
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: '0',
                            left: '0',
                            width: '100%',
                            color: 'black',
                        }}
                    >
                        <MessageInput inputRef={inputRef} mode={MODE} />
                    </Box>
                </Box>
            )}
            {value === 2 && <StartCall handleChange={handleChange} />}
        </Box>
    );
}
