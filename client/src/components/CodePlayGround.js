import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import Coder from './Coder';
import CodeEditor from './CodeEditor';
import { Typography } from '@mui/material';

export default function CodePlayGround() {
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.auth);

    const [coders, setCoders] = useState([
        { socketId: 8, username: 'Shantanu' },
        { socketId: 1, username: 'Bhargav' },
        { socketId: 2, username: 'Vishal' },
        { socketId: 4, username: 'Anushka' },
        { socketId: 6, username: 'Shruti' },
        { socketId: 9, username: 'Aakoo' },
        { socketId: 3, username: 'Shreyashka' },
        { socketId: 9, username: 'Aakoo' },
    ]);

    useEffect(() => {
        if (!window.localStorage.getItem('dev')) {
            navigate('/');
        }
        document.title = 'Dev Chat+ Code';
    }, [currentUser]);

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: '250px 1fr',
                height: '100vh',
                overflowX: 'hidden',
            }}
            className='mainWrap'
        >
            <Box
                sx={{
                    backgroundColor: '#0288d1',
                    p: 2,
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                }}
                className='aside'
            >
                <Box sx={{ flex: 1 }} className='asideInner'>
                    <Box className='logo'>
                        <img
                            style={{ height: '50px' }}
                            className='logoImg'
                            src='/logo192.png'
                            alt='logo'
                        />
                    </Box>
                    <Typography sx={{ mb: 2, mt: 3 }} variant='h6'>
                        Dev&apos;s Connected
                    </Typography>
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns:
                                'repeat(auto-fill, minmax(60px, 1fr))',
                            gap: '16px 8px',
                            gridAutoFlow: 'dense',
                            maxHeight: '400px',
                            overflowY: 'auto',
                        }}
                        className='codersList'
                    >
                        {coders.map((coder) => (
                            <Coder
                                key={coder.socketId}
                                username={coder.username}
                            />
                        ))}
                    </Box>
                </Box>
                <Button
                    variant='contained'
                    sx={{ bgcolor: '#25D366', mb: 2, color: 'white' }}
                    color='success'
                    disableElevation
                    endIcon={<ContentCopyIcon />}
                >
                    Copy Room URL
                </Button>
                <Button
                    variant='contained'
                    sx={{ bgcolor: '#25D366', color: 'white', width: '75%' }}
                    color='success'
                    disableElevation
                    endIcon={<LogoutIcon />}
                >
                    Leave Editor
                </Button>
            </Box>

            <CodeEditor />
        </Box>
    );
}
