import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { JitsiMeeting } from '@jitsi/react-sdk';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { ContentCutOutlined } from '@mui/icons-material';

export default function VideoCall() {
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.auth);

    const [jitsiApi, setJitsiApi] = useState(null);

    useEffect(() => {
        if (!window.localStorage.getItem('dev')) {
            navigate('/');
        }
        console.log(window.innerHeight);
    }, [currentUser, window.innerHeight]);

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
                    // iframeRef.style.height = frameHeight;
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
                    jitsiApi.executeCommand('sendChatMessage', 'hi', '', true);
                }}
            >
                Whiteboard
            </button>
            <button>Code</button>
        </Box>
    );
}
