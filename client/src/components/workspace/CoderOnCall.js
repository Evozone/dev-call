import React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import MicOffIcon from '@mui/icons-material/MicOff';
import MicIcon from '@mui/icons-material/Mic';
import { IconButton } from '@mui/material';

export default function CoderOnCall({
    username,
    provideRef,
    uid,
    handleMuteClick,
    muted,
}) {
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
            <audio
                controls
                autoPlay
                ref={(instance) => {
                    provideRef(instance, uid);
                }}
            />

            <IconButton
                sx={{
                    position: 'absolute',
                    top: '5px',
                    right: '3px',
                }}
                onClick={() => handleMuteClick(uid)}
            >
                {muted ? <MicOffIcon /> : <MicIcon />}
            </IconButton>

            <Tooltip title={username}>
                <Avatar
                    alt={username?.charAt(0).toUpperCase()}
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
