import { Box, IconButton, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Creator = ({ name, githubProfile, linkedinProfile }) => {
    const socialMediaProfiles = [{ icon: <GitHubIcon fontSize="large" />, link: githubProfile }, { icon: <LinkedInIcon fontSize="large" />, link: linkedinProfile },];

    return (
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
            <Box
                sx={{
                    width: '100%',
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
                    variant="h6"
                    component="div"
                    sx={{
                        fontFamily: 'Work Sans',
                        fontWeight: '400',
                        margin: '0 1rem',
                    }}
                >
                    {name}
                </Typography>

                {socialMediaProfiles.map(({ icon, link }) => (
                    <IconButton
                        key={link}
                        href={link}
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
                        {icon}
                    </IconButton>
                ))}
            </Box>
        </Box>
    );
};

export default Creator;
