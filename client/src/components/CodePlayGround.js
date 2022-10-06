import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import Coder from './Coder';
import CodeEditor from './CodeEditor';
import { Typography } from '@mui/material';
import { initSocket } from '../socket';
import CodeCompiler from './CodeCompiler';

export default function CodePlayGround() {
    let params = useParams();
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.auth);
    const socketRef = useRef(null);
    const codeRef = useRef(null);

    const [coders, setCoders] = useState([]);

    useEffect(() => {
        if (!window.localStorage.getItem('dev')) {
            navigate('/');
        }
        document.title = 'Dev Chat+ Code';

        const init = async () => {
            socketRef.current = await initSocket();

            socketRef.current.on('connect_error', (error) =>
                handleErrors(error)
            );
            socketRef.current.on('connect_failed', (error) =>
                handleErrors(error)
            );
            function handleErrors(error) {
                // eslint-disable-next-line no-console
                console.log('socket error', error);
                alert('Socket connection failed, try again later.');
                navigate('/');
            }

            socketRef.current.emit('join', {
                roomId: params.groundId,
                username: currentUser.username,
            });

            socketRef.current.on(
                'joined',
                ({ clients, username, socketId }) => {
                    if (username !== currentUser.username) {
                        alert(`${username} joined the room.`);
                    }
                    setCoders(clients);
                    socketRef.current.emit('syncCode', {
                        code: codeRef.current,
                        socketId,
                    });
                }
            );

            socketRef.current.on('disconnected', ({ socketId, username }) => {
                alert(`${username} left the room.`);
                setCoders((prev) => {
                    return prev.filter(
                        (client) => client.socketId !== socketId
                    );
                });
            });
        };

        if (currentUser.username) {
            init();
        }

        return () => {
            socketRef.current?.disconnect();
            socketRef.current?.off('joined');
            socketRef.current?.off('disconnected');
        };
    }, [currentUser]);

    const leaveCodePlayGround = () => {
        window.close();
    };

    const copyRoomURL = () => {
        navigator.clipboard.writeText(window.location.href);
        alert('Room URL copied to clipboard.');
    };

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: '250px 2.5fr 1fr',
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
                    onClick={copyRoomURL}
                >
                    Copy Room URL
                </Button>
                <Button
                    variant='contained'
                    sx={{ bgcolor: '#25D366', color: 'white', width: '75%' }}
                    color='success'
                    disableElevation
                    endIcon={<LogoutIcon />}
                    onClick={leaveCodePlayGround}
                >
                    Leave Editor
                </Button>
            </Box>
            <CodeEditor
                socketRef={socketRef}
                params={params}
                onCodeChange={(code) => {
                    codeRef.current = code;
                }}
            />
            <CodeCompiler />
        </Box>
    );
}
