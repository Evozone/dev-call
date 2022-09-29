import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { JitsiMeeting } from '@jitsi/react-sdk';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { v4 as uuid } from 'uuid';

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
            <button
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
                end Vc
            </button>
            <button
                onClick={() => {
                    jitsiApi.executeCommand(
                        'sendChatMessage',
                        `http://localhost:3000/code/${codeGroundId}`,
                        '',
                        true
                    );
                    window.open(`/code/${codeGroundId}`, '_blank');
                }}
            >
                Code
            </button>
            <button>Whiteboard</button>
        </Box>
    );
}
