import { Box, Typography } from '@mui/material';
import React from 'react';

export default function TextBody({ owner }) {
    return (
        <Box
            sx={{
                backgroundColor: 'info.main',
                borderRadius: '5px',
                maxWidth: '30rem',
                p: 1,
                color: 'white',
                mb: 1,

                ...(owner && {
                    alignSelf: 'flex-end',
                }),
            }}
        >
            <Typography>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni
                neque voluptate odit enim fugiat pariatur earum cupiditate
                laborum ipsum soluta? Ducimus facilis labore sit. Nesciunt ea
                accusantium qui. Recusandae, inventore.
            </Typography>
        </Box>
    );
}
