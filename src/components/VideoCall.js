import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { JitsiMeeting } from '@jitsi/react-sdk';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';

export default function VideoCall() {
    const navigate = useNavigate();
    const roomName = '123-3431-23';

    const currentUser = useSelector((state) => state.auth);

    const [jitsiApi, setJitsiApi] = useState(null);

    useEffect(() => {
        if (!window.localStorage.getItem('dev')) {
            navigate('/');
        }
    }, [currentUser]);

    const FRAME_HEIGHT = (window.innerHeight - 18).toString() + 'px';

    return (
        <Box sx={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
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
            <button>Whiteboard</button>
            <button>Code</button>
            <JitsiMeeting
                roomName={roomName}
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
        </Box>
    );
}
