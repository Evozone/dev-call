// A component that will house the code editor and the whiteboard.

import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import ShareIcon from '@mui/icons-material/Share';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import HeadsetIcon from '@mui/icons-material/Headset';
import HeadsetOffIcon from '@mui/icons-material/HeadsetOff';
import CallEndIcon from '@mui/icons-material/CallEnd';

import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import GroupsIcon from '@mui/icons-material/Groups';
import CodeIcon from '@mui/icons-material/Code';
import BrushIcon from '@mui/icons-material/Brush';

import WorkSpaceSidePanel from './WorkSpaceSidePanel';
import Whiteboard from './whiteboard/Whiteboard';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(() => ({

    '& .MuiToggleButtonGroup-grouped': {
        margin: 0,
        border: 0,
        '&:not(:first-of-type)': {
            borderRadius: 0,
        },
        '&:first-of-type': {
            borderRadius: 0,
        },
    },
    '& .MuiToggleButton-root': {
        borderRadius: 0,
        border: 0,
        '&.Mui-selected': {
            backgroundColor: '#03256C',
            color: 'white',
            '&:hover': {
                backgroundColor: '#03256C',
                color: 'white',
            },
        },
    },
}));

export default function WorkSpace() {

    // State for keeping track of which toggle button is selected
    const [selected, setSelected] = useState('session');

    // State for keeping track of whether the sidebar is open or not
    const [open, setOpen] = useState(true);

    const sideStripWidth = 60;

    // Function to handle the toggle button selection
    const handleSelect = (event, newSelected) => {
        if (newSelected !== null) {
            setSelected(newSelected);
            if (newSelected === 'whiteboard') {
                setOpen(false);
            } else {
                setOpen(true);
            }
        } else {
            // If previous button was whiteboard, then don't open the sidebar
            if (selected === 'whiteboard') {
                setOpen(false);
            } else {
                toggleSidebar();
            }
        }
    };

    // Function to handle the sidebar open/close
    const toggleSidebar = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#010101' }}>
            <CssBaseline />

            {/* Placed here because of z-index issues */}
            <WorkSpaceSidePanel selected={selected} open={open} />

            {/* A side strip which controls the sidebar */}
            <Drawer
                PaperProps={{
                    style: {
                        backgroundColor: '#2196f3',
                        display: 'flex',
                        alignItems: 'center',
                        border: 'none',
                    }
                }}
                variant="permanent"
                sx={{
                    width: sideStripWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: sideStripWidth,
                        boxSizing: 'border-box',
                    },
                }}
            >
                {/* Dev Call logo */}
                <a href="/">
                    <img
                        style={{ height: '40px', margin: '10px auto 10px auto' }}
                        src='/assets/landing-logo.svg'
                        alt='logo'
                    />
                </a>

                {/* Toggle buttons */}
                <StyledToggleButtonGroup
                    orientation="vertical"
                    value={selected}
                    exclusive
                    onChange={handleSelect}
                    sx={{
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column'
                    }}
                >
                    <ToggleButton value="session" sx={{ width: '100%', height: '100%' }}>
                        <Tooltip title="Session Info">
                            <GroupsIcon sx={{ fontSize: '35px' }} />
                        </Tooltip>
                    </ToggleButton>
                    <ToggleButton value="code" sx={{ width: '100%', height: '100%' }}>
                        <Tooltip title="Code Editor">
                            <CodeIcon sx={{ fontSize: '35px' }} />
                        </Tooltip>
                    </ToggleButton>
                    <ToggleButton value="whiteboard" sx={{ width: '100%', height: '100%' }}>
                        <Tooltip title="Whiteboard">
                            <BrushIcon sx={{ fontSize: '35px' }} />
                        </Tooltip>
                    </ToggleButton>

                </StyledToggleButtonGroup>

                {/* Normal buttons at the end */}
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%' }}>
                    <Tooltip title="Start a call">
                        <IconButton sx={{ color: 'white' }}>
                            <AddIcCallIcon sx={{ fontSize: '35px' }} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Share Workspace Link">
                        <IconButton sx={{ color: 'white' }}>
                            <ShareIcon sx={{ fontSize: '35px' }} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Leave Workspace">
                        <IconButton sx={{ color: 'lightsteelblue' }} onClick={() => {
                            window.location.href = '/';
                        }}>
                            <ExitToAppIcon sx={{ fontSize: '35px' }} />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Drawer>

            {/* Box with faded gray background and rounded corners */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: '#F5F5F522',
                    color: 'white',
                    margin: '5px',
                    borderRadius: '5px',
                }}
            >
                {/* Call different components based on what's needed. */}
                {selected === 'session' && <div>Session</div>}
                {selected === 'code' && <div>Code</div>}
                {selected === 'whiteboard' && <Whiteboard />}
            </Box>

            {/* Currently not Draggable component for microphone, deafen, and end call buttons */}
            <Box
                sx={{
                    backgroundColor: '#2196f3',
                    borderRadius: '10px',
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Tooltip title="Mute">
                    <IconButton sx={{ color: 'white' }}>
                        <MicIcon sx={{ fontSize: '25px' }} />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Deafen">
                    <IconButton sx={{ color: 'white' }}>
                        <HeadsetIcon sx={{ fontSize: '25px' }} />
                    </IconButton>
                </Tooltip>
                <Tooltip title="End Call">
                    <IconButton sx={{ color: 'maroon' }} onClick={() => { }}>
                        <CallEndIcon sx={{ fontSize: '25px' }} />
                    </IconButton>
                </Tooltip>
            </Box>
        </Box >
    );
}

