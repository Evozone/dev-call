import React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import MicOffIcon from '@mui/icons-material/MicOff';

export default function Coder({ username }) {
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
            <MicOffIcon
                sx={{
                    position: 'absolute',
                    top: '5px',
                    right: '3px',
                }}
            />
            <Tooltip title={username}>
                <Avatar
                    alt={username.charAt(0).toUpperCase()}
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
