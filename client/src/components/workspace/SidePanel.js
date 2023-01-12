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

export default function SidePanel({
    lang,
    setLang,
    theme,
    setTheme,
    selected,
    open,
    codeRef,
    setOpen,
    coders,
    handleCheckboxChange,
}) {
    return (
        <Box
            sx={{
                width: open ? '400px' : '0px',
                height: '100vh',
                overflowY: 'none',
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
                        height: '100vh',
                        overflowY: 'none',
                        marginLeft: '60px',
                        border: 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: '0px 0px 8px 0px black',
                        backgroundColor: '#03256C',
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
                        ml: 2,
                        mb: '15px',
                        fontSize: '2rem',
                    }}
                >
                    dev chat + {selected == 'session' ? '' : 'code'}
                </Typography>
                {selected === 'session' ? (
                    <SessionSidePanel coders={coders} />
                ) : (
                    <React.Fragment>
                        <Divider />
                        <CodeSidePanel
                            {...{
                                lang,
                                setLang,
                                theme,
                                setTheme,
                                codeRef,
                                handleCheckboxChange,
                            }}
                        />
                    </React.Fragment>
                )}
                <Tooltip title='Close Sidebar' placement='right' arrow>
                    <IconButton
                        sx={{
                            position: 'absolute',
                            top: '7px',
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
        </Box >
    );
}
