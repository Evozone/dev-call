import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const FeatureCard = ({ image, title, description, index }) => (
    <Box
        sx={{
            width: '100%',
            height: '500px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
            '@media (max-width: 800px)': {
                flexDirection: 'column',
            },
        }}
    >
        {/* FeatureCard: Image */}
        <Box
            sx={{
                width: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '@media (max-width: 800px)': {
                    width: '100%',
                },
            }}
        >
            <img src={image} alt={title} />
        </Box>
        {/* FeatureCard: Text */}
        <Box
            sx={{
                width: '50%',
                px: 8,
                '@media (max-width: 800px)': {
                    width: '100%',
                },
            }}
        >
            <Typography variant="h3" sx={{
                fontFamily: 'Work Sans', fontWeight: '500',
            }}>{title}</Typography>
            <Typography variant="body1" sx={{
                fontFamily: 'Work Sans', fontWeight: '400', mt: 2,
            }}
            >{description}</Typography>
        </Box>
    </Box >
);

export default FeatureCard;
