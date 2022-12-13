import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import createTheme from '@mui/material/styles/createTheme';

import GoogleOneTapLogin from './components/GoogleOneTapLogIn';

import { customGlobalScrollBars } from './components/CustomGlobalCSS';
import { TypewriterCycle } from './components/TypewriterCycle';

const LandingPage = () => {
    const theme = createTheme();

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    overflowX: 'hidden',
                }}
            >
                {customGlobalScrollBars('teal')}
                <CssBaseline />

                {/* Section : Hero */}
                <Box
                    id='hero'
                    sx={{
                        boxSizing: 'border-box',
                        width: '100%',
                        minHeight: '100vh',
                        padding: '3rem',
                        background:
                            'linear-gradient(116.82deg, #0288d1 0%, #1976d2 100%)',
                        display: 'flex',
                        flexFlow: 'row wrap',
                        alignItems: 'center',
                        color: 'white',
                    }}
                >
                    {/* LogoMark */}
                    <Box
                        sx={{
                            flex: '0 0 500px',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'left',
                            margin: '2rem',
                        }}
                    >
                        <Box>
                            <img
                                src='/assets/landing-logo.svg'
                                alt='Logomark'
                            />
                        </Box>
                        <Typography
                            variant='h4'
                            component='div'
                            sx={{
                                fontFamily: 'Comfortaa, sans-serif',
                                fontWeight: '700',
                                padding: '1rem 0 0 0',
                                fontSize: '3rem',
                            }}
                        >
                            dev chat + <TypewriterCycle strings={['call', 'code', 'draw']} />
                        </Typography>
                        <hr
                            align='left'
                            style={{
                                backgroundColor: '#03256C',
                                height: 7,
                                width: '80%',
                                border: '1px solid #03256C',
                                borderRadius: 10,
                                margin: '1rem 0',
                            }}
                        />
                        <Typography
                            variant='h6'
                            component='div'
                            sx={{
                                fontFamily: 'Work Sans, sans-serif',
                                fontWeight: '400',
                                padding: '0',
                                fontSize: '1.4rem',
                                color: '#EFF6EE',
                            }}
                        >
                            Optimize your workflow.
                        </Typography>
                    </Box>

                    {/* Description */}
                    <Box
                        sx={{
                            flex: '1 0 500px',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'left',
                            margin: '2rem',
                        }}
                    >
                        <Typography
                            variant='h2'
                            component='div'
                            sx={{
                                fontFamily: 'Work Sans, sans-serif',
                                fontWeight: '400',
                                fontSize: '3rem',
                            }}
                        >
                            Interact with your team
                        </Typography>
                        <Typography
                            variant='h4'
                            component='div'
                            sx={{
                                fontFamily: 'Work Sans',
                                fontWeight: '400',
                                padding: '0 0 1rem 0',
                                color: 'rgba(255, 255, 255, 0.6)',
                            }}
                        >
                            and get work done
                        </Typography>
                        <br />
                        <Typography
                            variant='h5'
                            component='div'
                            sx={{
                                fontFamily: 'Work Sans',
                                fontWeight: '500',
                                color: '#03256C',
                                fontSize: '1.5rem',
                                p: 2,
                                mb: 2,
                                mr: 5,
                                background: ' rgba(255, 255, 255, 0.46)',
                                borderRadius: '6px',
                                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                                backdropFilter: 'blur(7.1px)',
                                webKitBackdropFilter: 'blur(7.1px)',
                                border: '1px solid rgba(255, 255, 255, 0.8)',
                            }}
                        >
                            DevChat+ is a great productivity tool that combines all the awesome
                            features of video-calling with useful tools such as whiteboarding and
                            a built in IDE to help you get your point across.
                        </Typography>
                        <GoogleOneTapLogin />
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default LandingPage;
