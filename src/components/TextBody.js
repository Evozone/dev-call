import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import React from 'react';

export default function TextBody({ message }) {
    const currentUser = useSelector((state) => state.auth);

    return (
        <Box
            sx={{
                // edit the below @bhargav
                backgroundColor: 'info.main',
                borderRadius: '5px',
                maxWidth: '30rem',
                width: 'fit-content',
                p: 1,
                color: 'white',
                mb: 1,

                ...(currentUser.uid === message.senderid && {
                    alignSelf: 'flex-end',
                }),
            }}
        >
            <Typography>{message.text}</Typography>
        </Box>
    );
}
