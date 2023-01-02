import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import ShareIcon from '@mui/icons-material/Share';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import HeadsetIcon from '@mui/icons-material/Headset';
import HeadsetOffIcon from '@mui/icons-material/HeadsetOff';
import CallEndIcon from '@mui/icons-material/CallEnd';

import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import InfoIcon from '@mui/icons-material/Info';
import CodeIcon from '@mui/icons-material/Code';
import BrushIcon from '@mui/icons-material/Brush';

import WorkSpaceSidePanel from './WorkSpaceSidePanel';
import Whiteboard from './whiteboard/Whiteboard';
import CodeEditor from './CodeEditor';
import { initSocket } from '../../socket';
import { notifyAction } from '../../actions/actions';

import { languageOptions } from '../../constants/languageOptions';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(() => ({
    '& .MuiToggleButtonGroup-grouped': {
        margin: 0,
        border: 0,
        '&:not(:first-of-type)': {
            borderRadius: 0,
        },
        '&:first-of-type': {
            borderRadius: 0,
        },
    },
    '& .MuiToggleButton-root': {
        borderRadius: 0,
        border: 0,
        '&.Mui-selected': {
            backgroundColor: '#03256C',
            color: 'white',
            '&:hover': {
                backgroundColor: '#03256C',
                color: 'white',
            },
        },
    },
}));

export default function WorkSpace() {
    const SIDE_STRIP_WIDTH = 60;
    const dispatch = useDispatch();
    const params = useParams();
    const codeRef = useRef(null);
    const canvasRef = useRef(null);
    const socketRef = useRef();
    const currentUser = useSelector((state) => state.auth);

    const [selected, setSelected] = useState('code');
    const [mainComponent, setMainComponent] = useState('code');
    const [open, setOpen] = useState(false);
    const [lang, setLang] = useState(languageOptions[0]);
    const [theme, setTheme] = useState('vs-dark');
    const [coders, setCoders] = useState([]);

    useEffect(() => {
        if (!window.localStorage.getItem('dev')) {
            window.location.href = '/';
        }

        const init = async () => {
            socketRef.current = await initSocket('workspace');
            socketRef.current.on('connect_error', (error) =>
                handleErrors(error)
            );
            socketRef.current.on('connect_failed', (error) =>
                handleErrors(error)
            );
            function handleErrors(error) {
                // eslint-disable-next-line no-console
                console.log('socket error', error);
                alert(
                    'Socket connection failed, Please refresh the app after ~2 minutes.'
                );
            }
            socketRef.current.emit('join', {
                roomId: params.workspaceId,
                username: currentUser.username,
            });
            socketRef.current.on(
                'addUser',
                ({ clients, username, socketId }) => {
                    if (username !== currentUser.username) {
                        dispatch(
                            notifyAction(
                                true,
                                'success',
                                `${username} joined the Canvas.`
                            )
                        );
                    }
                    setCoders(clients);
                    if (username !== currentUser.username) {
                        let drawingData = '';
                        if (
                            localStorage.getItem(
                                `${params.workspaceId}-drawing`
                            )
                        ) {
                            drawingData = localStorage.getItem(
                                `${params.workspaceId}-drawing`
                            );
                        } else {
                            drawingData = canvasRef?.current?.toDataURL();
                        }
                        setTimeout(() => {
                            socketRef.current.emit('syncCanvas', {
                                drawingData,
                                socketId,
                            });
                            socketRef.current.emit('syncCode', {
                                code:
                                    localStorage.getItem(
                                        `${params.workspaceId}-code`
                                    ) || codeRef.current,
                                socketId,
                            });
                        }, 1500);
                    }
                }
            );
            socketRef.current.on(
                'drawingChange',
                ({ drawingData, socketId }) => {
                    if (socketId) {
                        localStorage.setItem(
                            `${params.workspaceId}-drawing`,
                            drawingData
                        );
                    }
                }
            );
            socketRef.current.on('disconnected', ({ socketId, username }) => {
                dispatch(notifyAction(true, 'info', `${username} left.`));
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
            if (socketRef.current) {
                socketRef.current?.disconnect();
                socketRef.current.off('drawingChange');
                socketRef.current.off('syncCanvas');
                socketRef.current?.off('addUser');
                socketRef.current?.off('connect_error');
                socketRef.current?.off('connect_failed');
                socketRef.current?.off('disconnected');
            }
        };
    }, [currentUser.username]);

    const handleSelect = (event, newSelected) => {
        if (newSelected !== null) {
            setSelected(newSelected);
            if (newSelected === 'code') {
                setMainComponent('code');
            } else if (newSelected === 'whiteboard') {
                setMainComponent('whiteboard');
            }
            if (newSelected === 'whiteboard') {
                setOpen(false);
            } else {
                setOpen(true);
            }
        } else {
            if (selected === 'whiteboard') {
                setOpen(false);
            } else {
                toggleSidebar();
            }
        }
    };

    const toggleSidebar = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#010101' }}>
            <CssBaseline />
            {/* Placed here because of z-index issues */}
            <WorkSpaceSidePanel
                {...{
                    lang,
                    setLang,
                    theme,
                    setTheme,
                    selected,
                    open,
                    codeRef,
                    setOpen,
                    coders,
                }}
            />
            {/* A side strip which controls the sidebar */}
            <Drawer
                PaperProps={{
                    style: {
                        backgroundColor: '#2196f3',
                        display: 'flex',
                        alignItems: 'center',
                        border: 'none',
                    },
                }}
                variant='permanent'
                sx={{
                    width: SIDE_STRIP_WIDTH,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: SIDE_STRIP_WIDTH,
                        boxSizing: 'border-box',
                    },
                }}
            >
                <a
                    href='https://github.com/Evozone/dev-call'
                    target='_blank'
                    rel='noreferrer'
                >
                    <img
                        style={{
                            height: '40px',
                            margin: '10px auto 10px auto',
                        }}
                        src='/assets/landing-logo.svg'
                        alt='logo'
                    />
                </a>
                <StyledToggleButtonGroup
                    orientation='vertical'
                    value={selected}
                    exclusive
                    onChange={handleSelect}
                    sx={{
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                    }}
                >
                    <ToggleButton
                        value='session'
                        sx={{
                            width: '100%',
                            height: '100%',
                        }}
                    >
                        <Tooltip title='Session Info' placement='right' arrow>
                            <InfoIcon sx={{ fontSize: '35px' }} />
                        </Tooltip>
                    </ToggleButton>
                    <ToggleButton
                        value='code'
                        sx={{ width: '100%', height: '100%' }}
                    >
                        <Tooltip title='Code Editor' placement='right' arrow>
                            <CodeIcon sx={{ fontSize: '35px' }} />
                        </Tooltip>
                    </ToggleButton>
                    <ToggleButton
                        value='whiteboard'
                        sx={{ width: '100%', height: '100%' }}
                    >
                        <Tooltip title='Whiteboard' placement='right' arrow>
                            <BrushIcon sx={{ fontSize: '35px' }} />
                        </Tooltip>
                    </ToggleButton>
                </StyledToggleButtonGroup>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        height: '100%',
                    }}
                >
                    <Tooltip title='Start a call' placement='right' arrow>
                        <IconButton sx={{ color: 'white' }}>
                            <AddIcCallIcon sx={{ fontSize: '35px' }} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip
                        title='Share Workspace Link'
                        placement='right'
                        arrow
                    >
                        <IconButton sx={{ color: 'white' }}>
                            <ShareIcon sx={{ fontSize: '35px' }} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Leave Workspace' placement='right' arrow>
                        <IconButton
                            sx={{ color: 'lightsteelblue' }}
                            onClick={() => {
                                window.location.href = '/chat';
                            }}
                        >
                            <ExitToAppIcon sx={{ fontSize: '35px' }} />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Drawer>
            {mainComponent === 'whiteboard' && (
                <Whiteboard socketRef={socketRef} canvasRef={canvasRef} />
            )}
            {mainComponent === 'code' && (
                <Box
                    component='main'
                    sx={{
                        flexGrow: 1,
                        bgcolor: '#F5F5F522',
                        color: 'white',
                        margin: '5px',
                        borderRadius: '5px',
                        transition: 'margin-left 0.3s ease-in-out',
                        marginLeft: open ? '405px' : '5px',
                    }}
                >
                    <CodeEditor
                        {...{ socketRef, open, lang, theme }}
                        onCodeChange={(code) => {
                            codeRef.current = code;
                        }}
                    />
                </Box>
            )}
            {/* Currently not Draggable component for microphone, deafen, and end call buttons */}
            <Box
                sx={{
                    backgroundColor: '#2196f3',
                    borderRadius: '10px',
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Tooltip title='Mute'>
                    <IconButton sx={{ color: 'white' }}>
                        <MicIcon sx={{ fontSize: '25px' }} />
                    </IconButton>
                </Tooltip>
                <Tooltip title='Deafen'>
                    <IconButton sx={{ color: 'white' }}>
                        <HeadsetIcon sx={{ fontSize: '25px' }} />
                    </IconButton>
                </Tooltip>
                <Tooltip title='End Call'>
                    <IconButton sx={{ color: 'red' }} onClick={() => {}}>
                        <CallEndIcon sx={{ fontSize: '25px' }} />
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    );
}
