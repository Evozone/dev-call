// A side panel that will give information about the current session, the current user, and the current whiteboard.

import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

// takes in a boolean value to determine whether the sidebar is open or not, and what is the user's current selection

export default function WorkSpaceSidePanel({ open, selected }) {
    return (
        <Box sx={{
            transition: 'width 0.2s',
            width: open ? '300px' : '0px',
        }}>
            <Drawer
                variant="persistent"
                anchor="left"
                open={open}
                sx={{
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: '300px',
                        marginLeft: '60px',
                        border: 'none',
                        backgroundColor: '#03256C',
                    },
                }}
            >
                {/* Render different components based on what's selected */}
                {selected === 'session' ? (
                    <Box
                        sx={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: 'white',
                        }}
                    >
                        <h1>Session</h1>
                    </Box>
                ) : selected === 'code' ? (
                    <Box
                        sx={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: 'white',
                        }}
                    >
                        <h1>Code</h1>
                    </Box>
                ) : (
                    <Box
                        sx={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: 'white',
                        }}
                    >
                        <h1>Whiteboard</h1>
                    </Box>
                )}
            </Drawer>
        </Box >
    )
}
