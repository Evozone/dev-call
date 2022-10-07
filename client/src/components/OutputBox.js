import { Box, Typography } from '@mui/material';
import React from 'react';

const OutputBox = () => {
    return (
        <React.Fragment>
            <Typography variant='body1'>Output </Typography>
            <Box
                sx={{
                    bgcolor: '#1e1e1e',
                    height: '250px',
                    p: 1,
                    pt: 0,
                    overflow: 'auto',
                    borderRadius: '5px',
                    mb: 1,
                    color: 'lightgreen',
                }}
            >
                <p>here comes the output</p>
            </Box>
        </React.Fragment>
    );
};

export default OutputBox;
