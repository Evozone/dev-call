import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Octokit } from '@octokit/core';

import CircularProgress from '@mui/material/CircularProgress';

const GithubStats = ({ mode, userGithub }) => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const octokit = new Octokit();

        // Wait for userGithub to be set
        if (!userGithub) return;

        const username = userGithub.split('/').pop();

        const fetchStats = async () => {
            try {
                const [
                    repos,
                    user,
                ] = await Promise.all([
                    octokit.request(`GET /users/${username}/repos`),
                    octokit.request(`GET /users/${username}`),
                ]);

                setStats({
                    reposCount: repos.data.length,
                    followersCount: user.data.followers,
                });

                console.log(repos, user);
            } catch (error) {
                console.error(error);
            }
        };

        fetchStats();
    }, [userGithub]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                width: '100%',
            }}
        >
            {stats ? (
                <>
                    <Box
                        sx={{
                            backgroundColor: mode === 'light' ? 'whitesmoke' : '#121212',
                            p: 2,
                            borderRadius: 5,
                        }}
                    >
                        <Typography
                            variant="h6"
                            component="h2"
                            sx={{
                                color: mode === 'light' ? 'black' : 'whitesmoke',
                                mb: 1,
                            }}
                        >
                            <b>Github Stats</b>
                        </Typography>
                        {stats ? (
                            <>
                                <Typography
                                    variant="body1"
                                    component="p"
                                    sx={{
                                        color: mode === 'light' ? 'black' : 'whitesmoke',
                                    }}
                                >
                                    {`Repositories: ${stats.reposCount}`}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    component="p"
                                    sx={{
                                        color: mode === 'light' ? 'black' : 'whitesmoke',
                                    }}
                                >
                                    {`Followers: ${stats.followersCount}`}
                                </Typography>
                            </>
                        ) : (
                            <CircularProgress color="primary" />
                        )}
                    </Box>
                </>
            ) : (
                <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                        color: mode === 'light' ? 'black' : 'whitesmoke',
                    }}
                >
                    <b>Loading Github stats...</b>
                </Typography>
            )}
        </Box>
    );
};

export default GithubStats;