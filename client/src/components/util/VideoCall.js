import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { JitsiMeeting } from '@jitsi/react-sdk';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CallIcon from '@mui/icons-material/Call';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import Tooltip from '@mui/material/Tooltip';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import Draggable from 'react-draggable';
import { v4 as uuid } from 'uuid';

export default function VideoCall() {
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.auth);

    const [jitsiApi, setJitsiApi] = useState(null);
    const [workspaceId, setWorkspaceId] = useState(null);
    const nodeRef = React.useRef(null);

    useEffect(() => {
        if (!window.localStorage.getItem('dev')) {
            navigate('/');
        }
        document.title = 'Dev Chat+ Call';
        setWorkspaceId(uuid());
    }, [currentUser]);

    const FRAME_HEIGHT = (window.innerHeight - 28).toString() + 'px';

    return (
        <Box
            sx={{
                width: '100vw',
                height: '100vh',
                overflowX: 'hidden',
                backgroundColor: '#1e1e1e',
            }}
        >
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
                    startWithAudioMuted: true,
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

            <Draggable
                axis='both'
                handle='.handle'
                grid={[25, 25]}
                scale={1}
                bounds='parent'
                nodeRef={nodeRef}
                onMouseDown={() => { }}
            >
                <Box
                    ref={nodeRef}
                    sx={{
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
                    }}
                >
                    <Tooltip title='End Call'>
                        <IconButton
                            onClick={() => {
                                const choice = window.confirm(
                                    'Please click on OK to leave the meeting'
                                );
                                if (choice) {
                                    jitsiApi.executeCommand('hangup');
                                    navigate('/chat');
                                }
                            }}
                        >
                            <CallIcon
                                sx={{
                                    color: '#EE4B2B',
                                }}
                            />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title='WorkSpace'>
                        <IconButton
                            onClick={() => {
                                jitsiApi.executeCommand(
                                    'sendChatMessage',
                                    `Code Playground - ${process.env.REACT_APP_BASE_URL}/workspace/${workspaceId}`,
                                    '',
                                    true
                                );
                                window.open(`/workspace/${workspaceId}`, '_blank');
                            }}
                        >
                            <WorkspacesIcon
                                sx={{
                                    color: '#888786',
                                }}
                            />
                        </IconButton>
                    </Tooltip>

                    <Box
                        className='handle'
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '40px',
                            height: '40px',
                            backgroundColor: 'rgba(41, 41, 41, 0.7)',
                            borderRadius: '10px',
                            '&:hover': {
                                cursor: 'grab',
                            },
                            '&:active': {
                                cursor: 'grabbing',
                            },
                        }}
                    >
                        <DragIndicatorIcon
                            sx={{
                                color: '#888786',
                            }}
                        />
                    </Box>
                </Box>
            </Draggable>
        </Box>
    );
}
