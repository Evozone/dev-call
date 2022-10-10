import React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

export default function Coder({ username }) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                wordBreak: 'break-word',
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                padding: '0.5rem',
                borderRadius: '10px',
            }}
        >
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
            <span>{username}</span>
        </Box>
    );
}
