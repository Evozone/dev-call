import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import GroupsIcon from '@mui/icons-material/Groups';
import ChatIcon from '@mui/icons-material/Chat';
import InterpreterModeIcon from '@mui/icons-material/InterpreterMode';

import Coder from './Coder';
import WorkspaceChat from './WorkspaceChat';
import StartCall from './StartCall';

export default function SessionSidePanel({
    coders,
    params,
    messages,
    setMessages,
}) {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
                <WorkspaceChat
                    params={params}
                    messages={messages}
                    setMessages={setMessages}
                />
            )}
            {value === 2 && <StartCall />}
        </Box>
    );
}
