import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Typography from '@mui/material/Typography';

import CodeSidePanel from './CodeSidePanel';
import { Divider } from '@mui/material';
import SessionSidePanel from './SessionSidePanel';

export default function WorkSpaceSidePanel({
    lang,
    setLang,
    theme,
    setTheme,
    selected,
    open,
    codeRef,
    setOpen,
}) {
    return (
        <Box
            sx={{
                width: open ? '400px' : '0px',
                maxHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Drawer
                variant='persistent'
                anchor='left'
                open={open}
                sx={{
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: '400px',
                        marginLeft: '60px',
                        border: 'none',
                        backgroundColor: '#03256C',
                        maxHeight: '100vh',
                    },
                }}
            >
                <Typography
                    variant='h4'
                    component='div'
                    sx={{
                        fontFamily: 'Comfortaa, sans-serif',
                        fontWeight: '700',
                        mt: '12px',
                        ml: 1,
                        mb: '15px',
                        fontSize: '2rem',
                    }}
                >
                    dev chat+
                </Typography>
                <Divider />
                {selected === 'session' ? (
                    <SessionSidePanel />
                ) : (
                    <CodeSidePanel
                        {...{ lang, setLang, theme, setTheme, codeRef }}
                    />
                )}
                <Tooltip title='Close Sidebar' placement='right' arrow>
                    <IconButton
                        sx={{
                            position: 'absolute',
                            top: '6px',
                            right: '10px',
                        }}
                        onClick={() => {
                            setOpen(false);
                        }}
                    >
                        <NavigateBeforeIcon sx={{ fontSize: '30px' }} />
                    </IconButton>
                </Tooltip>
            </Drawer>
        </Box>
    );
}
