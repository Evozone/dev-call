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
                flexDirection: 'row',
                justifyContent: 'center',
                width: '100%',
                mt: 2,
            }}
        >
            <Box
                sx={{
                    width: '80%',
                    backgroundColor: mode === 'light' ? '#D5D7DB' : '#121212',
                    p: 2,
                    borderRadius: 5,
                }}
            >
                <Typography
                    variant="h6"
                    component="h4"
                    sx={{
                        color: mode === 'light' ? 'black' : 'whitesmoke',
                        mb: 1,
                    }}
                >
                    <b>On Github:</b>
                </Typography>
                <img
                    src={apiUrl}
                    alt="Github Stats"
                    style={{
                        borderRadius: 5,
                        width: '100%',
                    }}
                />
            </Box>
        </Box>
    );
};

export default GithubStats;
