import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';

export default function OutputDetails({ outputDetails }) {
    return (
        <Box sx={{ mt: 2 }}>
            <Typography sx={{ mb: 2 }}>
                Status :{' '}
                <span
                    style={{
                        fontWeight: 500,
                        background: '#e7e7e7',
                        color: 'black',
                        padding: '4px',
                        borderRadius: '3px',
                    }}
                >
                    {outputDetails ? outputDetails.status.description : '-'}
                </span>
            </Typography>
            <Typography sx={{ mb: 2 }}>
                Memory :{' '}
                <span
                    style={{
                        fontWeight: 500,
                        background: '#e7e7e7',
                        color: 'black',
                        padding: '4px',
                        borderRadius: '3px',
                    }}
                >
                    {outputDetails ? outputDetails.memory + 'kb' : '-'}
                </span>
            </Typography>
            <Typography>
                Time :{' '}
                <span
                    style={{
                        fontWeight: 500,
                        background: '#e7e7e7',
                        color: 'black',
                        padding: '4px',
                        borderRadius: '3px',
                    }}
                >
                    {outputDetails ? outputDetails.time + 's' : '-'}
                </span>
            </Typography>
        </Box>
    );
}
