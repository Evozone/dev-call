import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Typography from '@mui/material/Typography';

import CodeSidePanel from './CodeSidePanel';
import Coder from './Coder';
import { TypewriterCycle } from '../TypewriterCycle';
import { Divider } from '@mui/material';

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
    //create an example array of length 50 named coders which will have the random names starting with different alphabetof the coders and a radnom id
    const coders = [
        { id: 1, name: 'A' },
        { id: 2, name: 'B' },
        { id: 3, name: 'C' },
        { id: 4, name: 'D' },
        { id: 5, name: 'E' },
        { id: 6, name: 'F' },
        { id: 7, name: 'G' },
        { id: 8, name: 'H' },
        { id: 9, name: 'I' },
        { id: 10, name: 'J' },
        { id: 11, name: 'K' },
        { id: 12, name: 'L' },
        { id: 13, name: 'M' },
        { id: 14, name: 'N' },
        { id: 15, name: 'O' },
        { id: 16, name: 'P' },
        { id: 17, name: 'Q' },
        { id: 18, name: 'R' },
        { id: 19, name: 'S' },
        { id: 20, name: 'T' },
        { id: 21, name: 'U' },
        { id: 22, name: 'V' },
        { id: 23, name: 'W' },
        { id: 24, name: 'X' },
        { id: 25, name: 'Y' },
        { id: 26, name: 'Z' },
        { id: 27, name: 'A' },
        { id: 28, name: 'B' },
        // { id: 29, name: 'C' },
        // { id: 30, name: 'D' },
        // { id: 31, name: 'E' },
        // { id: 32, name: 'F' },
        // { id: 33, name: 'G' },
        // { id: 34, name: 'H' },
        // { id: 35, name: 'I' },
        // { id: 36, name: 'J' },
        // { id: 37, name: 'K' },
        // { id: 38, name: 'L' },
        // { id: 39, name: 'M' },
        // { id: 40, name: 'N' },
        // { id: 41, name: 'O' },
        // { id: 42, name: 'P' },
        // { id: 43, name: 'Q' },
        // { id: 44, name: 'R' },
        // { id: 45, name: 'S' },
        // { id: 46, name: 'T' },
        // { id: 47, name: 'U' },
        // { id: 48, name: 'V' },
        // { id: 49, name: 'W' },
        // { id: 50, name: 'X' },
    ];

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
                        ml: 2,
                        mb: '15px',
                        fontSize: '2rem',
                    }}
                >
                    dev chat+
                </Typography>
                <Divider />
                {/* Render different components based on what's selected */}
                {selected === 'session' ? (
                    <Box
                        sx={{
                            height: '97vh',
                            overflowY: 'hidden',
                            // display: 'flex',
                            // flexDirection: 'column',
                            // justifyContent: 'center',
                            // alignItems: 'center',
                            color: 'white',
                            m: 2,
                            mt: '5px',
                        }}
                    >
                        <h2 style={{ marginTop: '3px' }}>
                            Dev&apos;s Connected
                        </h2>
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(4, 1fr)',
                                // gridTemplateColumns:
                                //     'repeat(auto-fill, minmax(60px, 1fr))',
                                gap: '16px 8px',
                                gridAutoFlow: 'dense',
                                maxHeight: '80%',
                                overflowY: 'auto',
                                //set the below properties is coders.length > 28
                                ...(coders.length > 28 && {
                                    border: '2px solid rgb(0 32 93)',
                                    borderRadius: '5px',
                                    p: 1,
                                }),
                            }}
                        >
                            {coders &&
                                coders.map((coder) => (
                                    <Coder
                                        key={coder.id}
                                        username={coder.name}
                                    />
                                ))}
                        </Box>
                    </Box>
                ) : (
                    <CodeSidePanel
                        {...{ lang, setLang, theme, setTheme, codeRef }}
                    />
                )}
                <Tooltip title='Close Sidebar' placement='right' arrow>
                    <IconButton
                        sx={{
                            position: 'absolute',
                            bottom: '10px',
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
