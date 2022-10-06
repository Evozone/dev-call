import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GoogleOneTapLogin from './components/GoogleOneTapLogIn';

import { customGlobalScrollBars } from './components/CustomGlobalCSS';

// Create a list of all the sections on the page
const sections = [
    { title: 'Features', url: '#features' },
    { title: 'Pricing', url: '#pricing' },
    { title: 'Reviews', url: '#reviews' },
    { title: 'Contact', url: '#contact' },
];

const LandingPage = () => {
    return (
        <Box
            sx={{
                overflowX: 'hidden',
            }}
        >
            {customGlobalScrollBars('teal')}
            <CssBaseline />

            {/* Navigation Bar */}
            <AppBar
                position="static"
                useScrollTrigger={true}
                sx={{
                    position: 'fixed',
                    background: 'transparent',
                    boxShadow: 'none',
                    color: 'white',
                }}
            >
                <Toolbar
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        fontSize: '2rem',
                    }}
                >
                    {/* Login now, Features, Pricing, Reviews, Contact */}
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            fontFamily: 'Work Sans', fontWeight: '400', padding: '2rem 0',
                        }}>
                        <Link href="#hero" underline="none" color="inherit"
                            sx={{
                                margin: '1rem',
                                color: '#03256C',
                                '&:hover': {
                                    fontWeight: 'bold',
                                    transition: 'all 0.2s ease-in-out',
                                }
                            }}>
                            Login now !
                        </Link>
                    </Typography>
                    {sections.map((section) => (
                        <Typography
                            key={section.title}
                            variant="h6"
                            component="div"
                            sx={{
                                fontFamily: 'Work Sans', fontWeight: '400', padding: '2rem 0',
                            }}>
                            <Link href={section.url} underline="none" color="inherit"
                                sx={{
                                    margin: '1rem',
                                    color: 'whitesmoke',
                                    '&:hover': {
                                        color: '#03256C',
                                        transition: 'all 0.2s ease-in-out',
                                    }
                                }}>
                                {section.title}
                            </Link>
                        </Typography>
                    ))}
                </Toolbar>
            </AppBar>

            {/* Section : Hero */}
            <Box
                id="hero"
                sx={{
                    width: '100%',
                    height: '100vh',
                    background: 'linear-gradient(116.82deg, #29b6f6 0%, #0288d1 100%)',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                }}
            >
                {/* Create two columns, one for Logomark and another for Description */}
                {/* LogoMark */}
                <Box
                    sx={{
                        width: '50%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'left',
                        padding: '0 0 0 5rem',
                    }}>
                    <img src="https://media.discordapp.net/attachments/562999795078266893/1027533965243985930/temp-logo.png" alt="Logo" width="60%" height="60%" />

                    <Typography
                        variant="h4"
                        component="div"
                        sx={{
                            fontFamily: 'Work Sans, sans-serif', fontWeight: '600', padding: '1rem 0', fontSize: '3rem',
                        }}
                    >
                        DevChat +
                        <hr align="left"
                            style={{
                                backgroundColor: '#0288D1',
                                height: 7,
                                width: '80%',
                                border: 'none',
                                margin: '1rem 0 0 0',
                            }}
                        />
                    </Typography>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            fontFamily: 'Work Sans, sans-serif', fontWeight: '400', padding: '0', fontSize: '1.2rem', color: '#EFF6EE'
                        }}
                    >
                        Optimize your workflow.
                    </Typography>

                </Box>
                {/* Description */}
                <Box
                    sx={{
                        width: '50%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'left',
                        padding: '0 2rem',
                    }}>
                    <Typography
                        variant="h2"
                        component="div"
                        sx={{
                            fontFamily: 'Trebuchet MS, sans-serif', fontWeight: '400',
                        }}
                    >
                        Chat with your team
                    </Typography>
                    <Typography
                        variant="h4"
                        component="div"
                        sx={{
                            fontFamily: 'Work Sans', fontWeight: '400',
                        }}
                    >
                        and get work done
                    </Typography>
                    <br />
                    <Typography
                        variant="h5"
                        component="div"
                        sx={{
                            fontFamily: 'Trebuchet MS', fontWeight: '400', color: '#03256C', fontSize: '1.3rem',
                        }}
                    >
                        DevChat+ is an awesome
                        productivity tool  that
                        combines all the awesome
                        features of video-calling
                        with useful tools such as
                        whiteboarding and a built
                        in IDE to help you get your
                        point across, even from home.
                    </Typography>
                    <GoogleOneTapLogin />
                </Box>
            </Box>

            {/* Section : Features */}
            <Box
                id="features"
                sx={{
                    width: '100%',
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#0288d1',
                    background: 'whitesmoke',
                }}
            >
                <Typography
                    variant="h2"
                    component="div"
                    sx={{
                        fontFamily: 'Work Sans', fontWeight: '400',
                    }}
                >
                    Features
                </Typography>
            </Box>

            {/* Section : Contact and Footer */}
            <Box
                id="contact"
                sx={{
                    width: '100%',
                    height: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '2rem 0',
                    background: '#0288d1',
                    color: 'whitesmoke',
                }}
            >
                <Typography
                    variant="h2"
                    component="div"
                    sx={{
                        fontFamily: 'Work Sans', fontWeight: '400',
                    }}
                >
                    Contact
                </Typography>
            </Box>

        </Box>
    );
}

export default LandingPage;
