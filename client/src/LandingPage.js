import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import createTheme from '@mui/material/styles/createTheme';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import GoogleOneTapLogin from './components/GoogleOneTapLogIn';

import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import { customGlobalScrollBars } from './components/CustomGlobalCSS';
import { TypewriterCycle } from './components/TypewriterCycle';
import FeatureCard from './components/FeatureCard';

import ScrollToColor from './components/ScrollToColor';

const LandingPage = () => {
    const theme = createTheme();

    // Create a list of all the sections on the page
    const sections = [
        { title: 'Features', url: '#features' },
        { title: 'Contact', url: '#contact' },
    ];

    // Create a list of all the panels for the features section
    const panelData = [
        {
            image: `/panel1.jpg`,
            title: `Chat with rich Images and GIFs`,
            description: `This chat feature allows you to add an extra level of excitement to your conversations by sharing images and GIFs directly within the chat window. You can also easily render images from links, bringing even more visual content to your chats. With this feature, you'll be able to easily add a splash of color and personality to your conversations and make them more engaging and memorable.`,
        },
        {
            image: `/panel2.jpg`,
            title: `Collaborative Workspaces`,
            description: `Our Workspaces feature is the perfect tool for teams who need to work together efficiently and effectively. It includes a built-in code-editor and IDE, a whiteboard, and a voice call function, all within the same workspace. No more juggling multiple tabs or apps - with Workspaces, everything you need for successful teamwork is just a few clicks away. Whether you're coding, brainstorming, or holding a meeting, our Workspaces have you covered.`,
        },
        {
            image: `/panel3.jpg`,
            title: `Meetings from anywhere`,
            description: `Our platform offers separate video conferencing capabilities for when you need to share your screen or webcam with others. Whether you're holding a presentation or just want to show a colleague something on your computer, our video conferencing feature has you covered. With screenshare and webcam sharing options available, you can easily stay connected with your team no matter where you are.`,
        },
    ];


    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    overflowX: 'hidden',
                }}
            >
                {customGlobalScrollBars('teal')}
                <CssBaseline />

                {/* Navigation Bar */}
                <ScrollToColor>
                    <AppBar
                        position="static"
                        sx={{
                            position: 'fixed',
                            background: 'transparent',
                            boxShadow: 'none',
                            color: 'white',
                            zIndex: 3,
                        }}
                    >
                        <Toolbar
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                fontSize: '2rem',
                            }}
                        >
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{
                                    fontFamily: 'Work Sans', fontWeight: '400', padding: '0.5rem',
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
                                        fontFamily: 'Work Sans', fontWeight: '400', padding: '0.5rem',
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
                </ScrollToColor>

                {/* Section : Hero */}
                <Box
                    id='hero'
                    sx={{
                        boxSizing: 'border-box',
                        width: '100%',
                        minHeight: '100vh',
                        padding: '4rem',
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
                            flex: '0 0 50%',
                            // If windowsize is less than 600px, change flex to 0 0 100%
                            '@media (max-width:600px)': {
                                flex: '0 0 100%',
                                margin: '2rem 0',
                            },
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'left',
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
                            flex: '0 0 50%',
                            // If windowsize is less than 600px, change flex to 0 0 100%
                            '@media (max-width:600px)': {
                                flex: '0 0 100%',
                            },
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'left',
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
                                '@media (max-width:600px)': {
                                    mr: 0,
                                },

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

                {/* Section : Features */}
                <Box
                    id="features"
                    sx={{
                        width: '100%',
                        height: 'auto',
                        padding: '2rem 0',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        color: '#03256c',
                        background: 'whitesmoke',
                    }}
                >
                    {panelData.map(({ image, title, description }, index) => (
                        <FeatureCard
                            image={image}
                            title={title}
                            description={description}
                            index={index}
                            key={index}
                        />
                    ))}
                </Box>

                {/* Section : Contact */}
                <Box
                    id="contact"
                    sx={{
                        width: '100%',
                        height: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '2rem 0',
                        background: 'linear-gradient(116.82deg, #0288d1 0%, #1976d2 100%)',
                        color: 'whitesmoke',
                    }}
                >
                    <Box
                        sx={{
                            width: '90%',
                            height: 'auto',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: '0 auto',
                            pb: '1rem',
                            '@media (max-width:600px)': {
                                flexDirection: 'column',
                            },
                        }}
                    >
                        {/* For Person 1 */}
                        <Box
                            sx={{
                                width: '50%',
                                height: 'auto',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                margin: '0 auto',
                                '@media (max-width:600px)': {
                                    width: '100%',
                                },
                            }}
                        >
                            {/* Box with 90% size of parent, rounded corners */}
                            <Box
                                sx={{
                                    width: '90%',
                                    height: '90%',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    background: '#001126ee',
                                    borderRadius: 3,
                                    padding: '1rem',
                                }}
                            >
                                <Typography
                                    variant='h6'
                                    component='div'
                                    sx={{
                                        fontFamily: 'Work Sans',
                                        fontWeight: '400',
                                        margin: '0 1rem',
                                    }}
                                >
                                    Vishal Shinde
                                </Typography>
                                <IconButton
                                    href="https://github.com/your-github-username"
                                    target="_blank"
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontSize: '3rem',
                                        margin: '0 0.5rem',
                                        transition: 'all 0.2s ease-in-out',
                                        '&:hover': {
                                            transform: 'scale(1.2)',
                                        },
                                    }}
                                >
                                    <GitHubIcon fontSize="large" />
                                </IconButton>
                                <IconButton
                                    href="https://linkedin.com/in/your-linkedin-username"
                                    target="_blank"
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontSize: '3rem',
                                        margin: '0 0.5rem',
                                        transition: 'all 0.2s ease-in-out',
                                        '&:hover': {
                                            transform: 'scale(1.2)',
                                        },
                                    }}
                                >
                                    <LinkedInIcon fontSize="large" />
                                </IconButton>

                            </Box>
                        </Box>
                        {/* For Person 2 */}
                        <Box
                            sx={{
                                width: '50%',
                                height: 'auto',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                margin: '0 auto',
                                '@media (max-width:600px)': {
                                    width: '100%',
                                },
                            }}
                        >
                            {/* Box with 90% size of parent, rounded corners */}
                            <Box
                                sx={{
                                    width: '90%',
                                    height: '90%',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    background: '#001126ee',
                                    borderRadius: 3,
                                    padding: '1rem',
                                }}
                            >
                                <Typography
                                    variant='h6'
                                    component='div'
                                    sx={{
                                        fontFamily: 'Work Sans',
                                        fontWeight: '400',
                                        margin: '0 1rem',
                                    }}
                                >
                                    Bhargav Modak
                                </Typography>
                                <IconButton
                                    href="https://github.com/your-github-username"
                                    target="_blank"
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontSize: '3rem',
                                        margin: '0 0.5rem',
                                        transition: 'all 0.2s ease-in-out',
                                        '&:hover': {
                                            transform: 'scale(1.2)',
                                        },
                                    }}
                                >
                                    <GitHubIcon fontSize="large" />
                                </IconButton>
                                <IconButton
                                    href="https://linkedin.com/in/your-linkedin-username"
                                    target="_blank"
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontSize: '3rem',
                                        margin: '0 0.5rem',
                                        transition: 'all 0.2s ease-in-out',
                                        '&:hover': {
                                            transform: 'scale(1.2)',
                                        },
                                    }}
                                >
                                    <LinkedInIcon fontSize="large" />
                                </IconButton>

                            </Box>
                        </Box>
                    </Box>


                    <Box
                        sx={{
                            width: '90%',
                            padding: '0 2rem',
                            height: 'auto',
                            margin: '0 auto',
                        }}
                    >
                        {/* Box with 90% size of parent, rounded corners */}
                        <Box
                            sx={{
                                width: '100%',
                                height: '90%',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                background: '#001126ee',
                                borderRadius: 3,
                                padding: '1rem',
                            }}
                        >
                            {/* Plug to repository */}
                            <Typography
                                variant='h5'
                                component='div'
                                sx={{
                                    fontFamily: 'Work Sans',
                                    fontWeight: '400',
                                    margin: '0 1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <GitHubIcon fontSize="large" />
                                &nbsp;
                                <Link
                                    href="https://github.com/Evozone/dev-call"
                                    target="_blank"
                                    sx={{
                                        color: 'white',
                                        textDecoration: 'none',
                                        '&:hover': {
                                            textDecoration: 'underline',
                                        },
                                    }}
                                >
                                    Check out the repository if you want to contribute
                                </Link>
                            </Typography>

                        </Box>
                    </Box>
                </Box>

            </Box>
        </ThemeProvider >
    );
};

export default LandingPage;
