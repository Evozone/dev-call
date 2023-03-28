import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

const GithubStats = ({ mode, userGithub }) => {

    let username = '';

    const [apiUrl, setApiUrl] = useState('');
    const [topLangApiUrl, setTopLangApiUrl] = useState('');

    useEffect(() => {
        // Wait for userGithub to be set
        if (!userGithub) return;

        username = userGithub.split('/').pop();

        setApiUrl(`https://github-readme-stats.vercel.app/api?username=${username}&theme=${mode === 'light' ? 'default' : 'dark'}&show_icons=true`);
        setTopLangApiUrl(`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&theme=${mode === 'light' ? 'default' : 'dark'}&layout=compact`);

    }, [userGithub]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'left',
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
            <img
                src={topLangApiUrl}
                alt="Top Languages"
                style={{
                    borderRadius: 5,
                    width: '70%',
                    marginTop: 10,
                }}
            />
        </Box>
    );
};

export default GithubStats;
