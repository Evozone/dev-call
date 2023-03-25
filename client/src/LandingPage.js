import React, { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import createTheme from '@mui/material/styles/createTheme';

import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';

import { customGlobalScrollBars } from './components/CustomGlobalCSS';
import { smoothScrolling } from './components/CustomGlobalCSS';
import TypewriterCycle from './components/TypewriterCycle';
import FeatureCard from './components/FeatureCard';
import GoogleOneTapLogin from './components/GoogleOneTapLogIn';

import ScrollToColor from './components/ScrollToColor';

const LandingPage = () => {
    const theme = createTheme();

    // A variable to track components to show/hide on scroll
    const [scrollComponent, setScrollComponent] = useState('none');

    useEffect(() => {
        // Add a scroll event listener to the window
        window.addEventListener('scroll', () => {
            // If the window is scrolled down more than 100px, show the scroll to top button
            if (window.scrollY > 50) {
                setScrollComponent('block');
            } else {
                setScrollComponent('none');
            }
        });
    }, []);

    // Create a list of all the sections on the page
    const sections = [
        { title: 'Features', url: '#features' },
        { title: 'Contact', url: '#contact' },
    ];

    // Create a list of all the panels for the features section
    const panelData = [
        {
            image: `/assets/landing-page-imgs/chat-feature.png`,
            title: `Chat with rich Images and GIFs`,
            description: `This chat feature allows you to add an extra level of excitement to your conversations by sharing images and GIFs directly within the chat window. You can also easily render images from links, bringing even more visual content to your chats. With this feature, you'll be able to easily add a splash of color and personality to your conversations and make them more engaging and memorable.`,
        },
        {
            image: `/assets/landing-page-imgs/workspace-feature.png`,
            title: `Collaborative Workspaces`,
            description: `Our Workspaces feature is the perfect tool for teams who need to work together efficiently and effectively. It includes a built-in code-editor and IDE, a whiteboard, and a voice call function, all within the same workspace. No more juggling multiple tabs or apps - with Workspaces, everything you need for successful teamwork is just a few clicks away. Whether you're coding, brainstorming, or holding a meeting, our Workspaces have you covered.`,
        },
        {
            image: `/assets/landing-page-imgs/meeting-feature.png`,
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
                {customGlobalScrollBars('royalblue')}
                {smoothScrolling()}
                <CssBaseline />

                {/* Back to top button */}
                <Tooltip
                    title="Back to top"
                    placement="left"
                    arrow
                >
                    <IconButton
                        sx={{
                            display: scrollComponent === 'block' ? 'flex' : 'none',
                            position: 'fixed',
                            bottom: '1rem',
                            right: '1rem',
                            zIndex: 3,
                            background: '#314469',
                            color: 'white',
                            '&:hover': {
                                background: '#03256C',
                                transition: 'all 0.2s ease-in-out',
                            }
                        }}
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        <ArrowCircleUpIcon fontSize="large" />
                    </IconButton>
                </Tooltip>
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
                                justifyContent: 'space-between',
                                fontSize: '2rem',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}
                            >
                                {/* Only show the logo when the user is not at the top of the page */}
                                <img
                                    style={{
                                        height: '40px',
                                        margin: '10px auto 10px auto',
                                        display: scrollComponent === 'block' ? 'block' : 'none',
                                    }}
                                    src='/assets/landing-logo.svg'
                                    alt='logo'
                                />
                                <Typography
                                    variant='h4'
                                    component='div'
                                    sx={{
                                        display: scrollComponent === 'block' ? 'block' : 'none',
                                        fontFamily: 'Comfortaa, sans-serif',
                                        fontWeight: '400',
                                        fontSize: '1.6rem',
                                        px: '1rem',
                                    }}
                                >
                                    dev chat +
                                </Typography>
                            </Box>
                            <Box
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
                            </Box>
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
                        background: 'linear-gradient(116.82deg, rgba(2, 136, 209, 0.75) 0%, rgba(25, 118, 210, 0.75) 100%), url(/assets/landing-page-imgs/earth-digital.jpg)',
                        backgroundRepeat: 'no-repeat',
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
                            '@media (max-width:800px)': {
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
                            '@media (max-width:800px)': {
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
                                '@media (max-width:800px)': {
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
                        color: 'whitesmoke',
                        background: '#011831',
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
                        padding: '2rem',
                        background: 'linear-gradient(116.82deg, #0288d1 0%, #1976d2 100%)',
                        color: 'whitesmoke',
                    }}
                >
                    {/* Feedback and Repository link */}
                    <Box
                        sx={{
                            width: '100%',
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            background: '#001126ee',
                            borderRadius: 3,
                            padding: '1rem',
                            margin: '1rem auto',
                            '@media (max-width:800px)': {
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                            },
                        }}
                    >
                        {/* Floating Faded 'Contact' as a word */}
                        <Typography
                            variant='h1'
                            component='div'
                            sx={{
                                fontFamily: 'Work Sans',
                                fontWeight: '700',
                                fontSize: '5rem',
                                color: 'rgba(127, 127, 127, 0.1)',
                                position: 'absolute',
                                top: '0',
                                left: '2rem',
                            }}
                        >
                            CONTACT
                        </Typography>
                        {/* Prompt */}
                        <Typography
                            variant='h6'
                            component='div'
                            sx={{
                                fontFamily: 'Work Sans',
                                fontWeight: '400',
                                margin: '1rem',
                            }}
                        >
                            Want to report a bug or just wanna have a chat?
                            <br />
                            Our inbox is always open, feel free to drop a text
                            <br />
                            on any of the platforms below.

                        </Typography>
                        {/* Feedback form button */}
                        <Button
                            variant='contained'
                            href='https://forms.gle/u1H8u2amoyyQrFp98'
                            target='_blank'
                            sx={{
                                backgroundColor: '#314469',
                                color: '#f5f5f5',
                                margin: '1rem',
                                '&:hover': {
                                    backgroundColor: '#49659C',
                                },
                                textTransform: 'none',
                            }}
                        >
                            <Typography
                                variant='h6'
                                component='div'
                                sx={{
                                    fontFamily: 'Work Sans',
                                    fontWeight: '400',
                                    fontSize: 'rem',
                                }}
                            >
                                Feedback Form
                            </Typography>
                        </Button>
                        {/* Github Repository button */}
                        <Button
                            variant='contained'
                            href='https://github.com/Evozone/dev-call'
                            target='_blank'
                            sx={{
                                backgroundColor: '#314469',
                                color: '#f5f5f5',
                                margin: '1rem',
                                '&:hover': {
                                    backgroundColor: '#49659C',
                                },
                                textTransform: 'none',
                            }}
                        >
                            <Typography
                                variant='h6'
                                component='div'
                                sx={{
                                    fontFamily: 'Work Sans',
                                    fontWeight: '400',
                                    fontSize: 'rem',
                                }}
                            >
                                Github Repository
                            </Typography>
                        </Button>
                    </Box>

                    {/* Details of creators */}
                    <Box
                        sx={{
                            width: '100%',
                            height: 'auto',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            margin: '0 auto',
                            '@media (max-width:800px)': {
                                flexDirection: 'column',
                            },
                        }}
                    >
                        {/* For Person 1 */}
                        <Box
                            sx={{
                                width: '33%',
                                display: 'flex',
                                flexFlow: 'row wrap',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                background: '#001126ee',
                                borderRadius: 3,
                                padding: '1rem',
                                '@media (max-width:800px)': {
                                    width: '100%',
                                },
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
                                href="https://github.com/vishal-codes"
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
                                href="https://www.linkedin.com/in/vishal-shinde-/"
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
                            <IconButton
                                href="https://twitter.com/vishaltwts"
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
                                <TwitterIcon fontSize="large" />
                            </IconButton>
                            <IconButton
                                href="mailto:itsvishal2417@gmail.com"
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
                                <EmailIcon fontSize="large" />
                            </IconButton>
                        </Box>
                        {/* For Person 2 */}
                        <Box
                            sx={{
                                width: '33%',
                                display: 'flex',
                                flexFlow: 'row wrap',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                background: '#001126ee',
                                borderRadius: 3,
                                padding: '1rem',
                                '@media (max-width:800px)': {
                                    marginTop: '1rem',
                                    width: '100%',
                                },
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
                                href="https://github.com/TheBrahmnicBoy"
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
                                href="https://www.linkedin.com/in/bhargavmodak/"
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
                            <IconButton
                                href="https://twitter.com/TheBrahmnicBoy"
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
                                <TwitterIcon fontSize="large" />
                            </IconButton>
                            <IconButton
                                href="mailto:bhargav0modak@gmail.com"
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
                                <EmailIcon fontSize="large" />
                            </IconButton>
                        </Box>
                        {/* For Person 3 */}
                        <Box
                            sx={{
                                width: '33%',
                                display: 'flex',
                                flexFlow: 'row wrap',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                background: '#001126ee',
                                borderRadius: 3,
                                padding: '1rem',
                                '@media (max-width:800px)': {
                                    marginTop: '1rem',
                                    width: '100%',
                                },
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
                                Manas Telavane
                            </Typography>
                            <IconButton
                                href="https://github.com/TheBrahmnicBoy"
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
                                href="https://www.linkedin.com/in/bhargavmodak/"
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
                            <IconButton
                                href="https://twitter.com/TheBrahmnicBoy"
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
                                <TwitterIcon fontSize="large" />
                            </IconButton>
                            <IconButton
                                href="mailto:bhargav0modak@gmail.com"
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
                                <EmailIcon fontSize="large" />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>

            </Box>
        </ThemeProvider >
    );
};

export default LandingPage;
