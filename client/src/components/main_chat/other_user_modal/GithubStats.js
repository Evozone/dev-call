import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

const GithubStats = ({ mode, userGithub }) => {

    let username = '';

    const [apiUrl, setApiUrl] = useState('');

    useEffect(() => {
        // Wait for userGithub to be set
        if (!userGithub) return;

        username = userGithub.split('/').pop();

        setApiUrl(`https://github-readme-stats.vercel.app/api?username=${username}&theme=${mode === 'light' ? 'default' : 'dark'}&show_icons=true`);

    }, [userGithub]);

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
            }}
        >
            <img
                src={apiUrl}
                alt="Github Stats"
                style={{
                    borderRadius: 5,
                    width: '100%',
                }}
            />
        </Box>
    );
};

export default GithubStats;
