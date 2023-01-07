import React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import MicOffIcon from '@mui/icons-material/MicOff';
import MicIcon from '@mui/icons-material/Mic';
import { IconButton } from '@mui/material';
import {
    useHMSStore,
    useHMSActions,
    selectIsPeerAudioEnabled,
    selectLocalPeer,
} from '@100mslive/hms-video-react';

export default function CoderOnCall({ peer }) {
    const hmsActions = useHMSActions();
    const audioEnabled = useHMSStore(selectIsPeerAudioEnabled(peer.id));
    const localPeer = useHMSStore(selectLocalPeer);
    const isModerator = localPeer.roleName === 'moderator';

    const mutePeer = () => {
        if (isModerator) {
            hmsActions.setRemoteTrackEnabled(peer.audioTrack, false);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'rgb(0 32 93)',
                padding: '0.9rem',
                borderRadius: '10px',
                position: 'relative',
            }}
        >
            {!audioEnabled ? (
                <MicOffIcon
                    sx={{
                        position: 'absolute',
                        top: '10px',
                        right: '8px',
                    }}
                />
            ) : isModerator ? (
                <Tooltip title={`Mute ${peer.name}`}>
                    <IconButton
                        sx={{
                            position: 'absolute',
                            top: '2px',
                            right: 0,
                        }}
                        onClick={mutePeer}
                    >
                        <MicIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <MicIcon
                    sx={{
                        position: 'absolute',
                        top: '10px',
                        right: '8px',
                    }}
                />
            )}

            <Tooltip title={peer.name}>
                <Avatar
                    alt={peer.name?.charAt(0).toUpperCase()}
                    src='/static/images/avatar/1.jpg'
                    sx={{
                        width: 40,
                        height: 40,
                        bgcolor: '#25D366',
                        color: 'white',
                    }}
                />
            </Tooltip>
        </Box>
    );
}
