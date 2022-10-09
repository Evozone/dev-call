import { Box, Typography } from '@mui/material';
import React from 'react';

export default function OutputBox({ outputDetails }) {
    const getOutput = () => {
        let statusId = outputDetails?.status?.id;

        if (statusId === 6) {
            return (
                <pre style={{ color: 'red' }}>
                    {atob(outputDetails?.compile_output)}
                </pre>
            );
        } else if (statusId === 3) {
            return (
                <pre style={{ color: 'lightgreen' }}>
                    {atob(outputDetails.stdout) !== null
                        ? `${atob(outputDetails.stdout)}`
                        : null}
                </pre>
            );
        } else if (statusId === 5) {
            return <pre style={{ color: 'red' }}>{`Time Limit Exceeded`}</pre>;
        } else {
            return (
                <pre style={{ color: 'red' }}>
                    {atob(outputDetails?.stderr)}
                </pre>
            );
        }
    };
    return (
        <React.Fragment>
            <Typography variant='body1'>Output </Typography>
            <Box
                sx={{
                    bgcolor: '#1e1e1e',
                    height: '250px',
                    width: '100%',
                    maxWidth: '370px',
                    p: 1,
                    pt: 0,
                    overflow: 'auto',
                    borderRadius: '5px',
                    mb: 1,
                    fontSize: '14px',
                }}
            >
                {outputDetails && getOutput()}
            </Box>
        </React.Fragment>
    );
}
