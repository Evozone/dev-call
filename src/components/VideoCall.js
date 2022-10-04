import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { JitsiMeeting } from '@jitsi/react-sdk';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CallIcon from '@mui/icons-material/Call';
import TerminalIcon from '@mui/icons-material/Terminal';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import Draggable from 'react-draggable';
import { v4 as uuid } from 'uuid';
import { Tooltip } from '@mui/material';

export default function VideoCall() {
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.auth);

    const [jitsiApi, setJitsiApi] = useState(null);
    const [codeGroundId, setCodeGroundId] = useState(null);

    useEffect(() => {
        if (!window.localStorage.getItem('dev')) {
            navigate('/');
        }
        document.title = 'Dev Chat+ Call';
        setCodeGroundId(uuid());
    }, [currentUser]);

    const FRAME_HEIGHT = (window.innerHeight - 28).toString() + 'px';

    return (
        <Box sx={{ width: '100vw', height: '100vh', overflowX: 'hidden' }}>
            <JitsiMeeting
                roomName='Dev Call'
                displayName={currentUser.name}
                interfaceConfigOverwrite={{
                    DEFAULT_BACKGROUND: '#000000',
                    TOOLBAR_BUTTONS: [
                        'camera',
                        'chat',
                        'desktop',
                        'feedback',
                        'fullscreen',
                        'invite',
                        'microphone',
                        'noisesuppression',
                        'participants-pane',
                        'profile',
                        'raisehand',
                        'recording',
                        'select-background',
                        'settings',
                        'shareaudio',
                        'sharedvideo',
                        'shortcuts',
                        'tileview',
                        'toggle-camera',
                    ],
                }}
                configOverwrite={{
                    enableInsecureRoomNameWarning: false,
                    prejoinPageEnabled: false,
                    disableDeepLinking: true,
                    startAudioOnly: true,
                }}
                getIFrameRef={(iframeRef) => {
                    iframeRef.style.height = FRAME_HEIGHT;
                }}
                onApiReady={(externalApi) => {
                    setJitsiApi(externalApi);
                }}
                userInfo={{
                    displayName: currentUser.name,
                }}
            />

            <Draggable>
                <Box sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    backgroundColor: 'rgba(41, 41, 41, 0.7)',
                    boxShadow: '0px 0px 10px 0px #000000',
                    display: 'flex',
                    justifyContent: 'center',
                    borderRadius: '10px',
                    margin: '10px',
                    zIndex: '1000',
                }}>
                    <Tooltip title='End Call'>
                        <IconButton onClick={
                            () => {
                                const choice = window.confirm(
                                    'Please click on OK to leave the meeting'
                                );
                                if (choice) {
                                    jitsiApi.executeCommand('hangup');
                                    navigate('/chat');
                                }
                            }
                        }>
                            <CallIcon
                                sx={{
                                    color: '#EE4B2B',
                                }} />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title='Code Ground'>
                        <IconButton onClick={
                            () => {
                                jitsiApi.executeCommand(
                                    'sendChatMessage',
                                    `http://localhost:3000/code/${codeGroundId}`,
                                    '',
                                    true
                                );
                                window.open(`/code/${codeGroundId}`, '_blank');
                            }
                        }>
                            <TerminalIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title='Whiteboard'>
                        <IconButton onClick={
                            () => {
                                // TODO: Add whiteboard
                            }
                        }>
                            <DriveFileRenameOutlineIcon />
                        </IconButton>
                    </Tooltip>

                    {/* Create a component used to drag the box around */}
                    <Tooltip title='Drag to move'>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '40px',
                            height: '40px',
                            backgroundColor: 'rgba(41, 41, 41, 0.7)',
                            borderRadius: '10px',
                            '&:hover': {
                                cursor: 'move',
                            },
                        }}>
                            <DragIndicatorIcon />
                        </Box>
                    </Tooltip>
                </Box>
            </Draggable>
        </Box>
    );
}
