import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';

function OutputDetails() {
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
                    Accepted
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
                    2.3kb
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
                    0.7s
                </span>
            </Typography>
        </Box>
    );
}

export default OutputDetails;
