import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CopyIcon from '@mui/icons-material/FileCopy';

export const InfoSection = ({ label, content, mode }) => (
    <>
        {content && <>
            <Typography
                variant="h6"
                component="h2"
                sx={{
                    color: mode === 'light' ? 'black' : 'whitesmoke',
                }}
            >
                <b>{label}</b>
            </Typography>
            <Typography
                variant="body1"
                component="p"
                sx={{
                    color: mode === 'light' ? 'black' : 'whitesmoke',
                }}
            >
                {content}
                &nbsp;
                &nbsp;
                {/* If content is email,copy it to clipboard */}
                {label === 'Email' && (
                    <IconButton
                        onClick={() => {
                            navigator.clipboard.writeText(content);
                        }}
                        sx={{
                            color: mode === 'light' ? 'rgba(2, 136, 209, 1)' : 'rgba(2, 136, 209, 0.8)',
                        }}
                    >
                        <CopyIcon />
                    </IconButton>
                )}
            </Typography>
        </>
        }
    </>
);

export const FollowSection = ({ links, mode }) => (
    <>
        {/* Don't render typography if all links are null */}
        {links.some((link) => link.link) && (
            <Typography
                variant="h6"
                component="h2"
                sx={{
                    color: mode === 'light' ? 'black' : 'whitesmoke',
                }}
            >
                <b>Follow</b>
            </Typography>
        )}
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                width: '100%',
                mt: 2,
            }}
        >
            {links.map((link) => (
                <Box
                    key={link.name}
                >
                    {link.link && (
                        <IconButton
                            key={link.name}
                            href={link.link}
                            target="_blank"
                            rel="noreferrer"
                            sx={{
                                color: mode === 'light' ? 'black' : 'whitesmoke',
                                '&:hover': {
                                    transform: 'scale(1.1)',
                                    transition: 'all 0.2s ease-in-out',
                                },
                            }}
                        >
                            {link.icon}
                        </IconButton>
                    )}
                </Box>
            ))}
        </Box>
    </>
);