import React, { useState } from 'react';
import {
    useHMSActions,
    useHMSStore,
    selectIsConnectedToRoom,
    selectIsLocalAudioEnabled,
    selectPeers,
} from '@100mslive/hms-video-react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Drawer from '@mui/material/Drawer';
import ToggleButton from '@mui/material/ToggleButton';
import IconButton from '@mui/material/IconButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import InfoIcon from '@mui/icons-material/Info';
import CodeIcon from '@mui/icons-material/Code';
import BrushIcon from '@mui/icons-material/Brush';
import ShareIcon from '@mui/icons-material/Share';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import HeadsetIcon from '@mui/icons-material/Headset';
import HeadsetOffIcon from '@mui/icons-material/HeadsetOff';
import CallEndIcon from '@mui/icons-material/CallEnd';

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

export default function SideStrip({ handleSelect, selected }) {
    const SIDE_STRIP_WIDTH = 60;
    const hmsActions = useHMSActions();
    const [deafen, setDeafen] = useState(false);

    const isConnected = useHMSStore(selectIsConnectedToRoom);
    const isLocalAudioEnabled = useHMSStore(selectIsLocalAudioEnabled);
    const peers = useHMSStore(selectPeers);

    const setPeersVolume = (volume) => {
        for (const peer of peers) {
            if (peer.audioTrack) {
                hmsActions.setVolume(volume, peer.audioTrack);
            }
        }
    };

    const toggleDeafen = () => {
        setDeafen(!deafen);
        deafen ? setPeersVolume(100) : setPeersVolume(0);
    };

    return (
        <Drawer
            PaperProps={{
                style: {
                    backgroundColor: '#2196f3',
                    display: 'flex',
                    alignItems: 'center',
                    border: 'none',
                },
            }}
            variant='permanent'
            sx={{
                width: SIDE_STRIP_WIDTH,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: SIDE_STRIP_WIDTH,
                    boxSizing: 'border-box',
                },
            }}
        >
            <a
                href='https://github.com/Evozone/dev-call'
                target='_blank'
                rel='noreferrer'
            >
                <img
                    style={{
                        height: '40px',
                        margin: '10px auto 10px auto',
                    }}
                    src='/assets/landing-logo.svg'
                    alt='logo'
                />
            </a>
            <StyledToggleButtonGroup
                orientation='vertical'
                value={selected}
                exclusive
                onChange={handleSelect}
                sx={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}
            >
                <ToggleButton
                    value='session'
                    sx={{
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <Tooltip title='Session Info' placement='right' arrow>
                        <InfoIcon sx={{ fontSize: '35px' }} />
                    </Tooltip>
                </ToggleButton>
                <ToggleButton
                    value='code'
                    sx={{ width: '100%', height: '100%' }}
                >
                    <Tooltip title='Code Editor' placement='right' arrow>
                        <CodeIcon sx={{ fontSize: '35px' }} />
                    </Tooltip>
                </ToggleButton>
                <ToggleButton
                    value='whiteboard'
                    sx={{ width: '100%', height: '100%' }}
                >
                    <Tooltip title='Whiteboard' placement='right' arrow>
                        <BrushIcon sx={{ fontSize: '35px' }} />
                    </Tooltip>
                </ToggleButton>
            </StyledToggleButtonGroup>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    height: '100%',
                }}
            >
                {isConnected && (
                    <React.Fragment>
                        {isLocalAudioEnabled ? (
                            <Tooltip title='Mute' placement='right' arrow>
                                <IconButton
                                    onClick={() =>
                                        hmsActions.setLocalAudioEnabled(
                                            !isLocalAudioEnabled
                                        )
                                    }
                                    sx={{ color: 'white' }}
                                >
                                    <MicIcon sx={{ fontSize: '35px' }} />
                                </IconButton>
                            </Tooltip>
                        ) : (
                            <Tooltip title='Mute' placement='right' arrow>
                                <IconButton
                                    onClick={() => {
                                        hmsActions.setLocalAudioEnabled(
                                            !isLocalAudioEnabled
                                        );
                                    }}
                                    sx={{ color: 'white' }}
                                >
                                    <MicOffIcon
                                        sx={{ fontSize: '35px', color: 'red' }}
                                    />
                                </IconButton>
                            </Tooltip>
                        )}
                        {!deafen ? (
                            <Tooltip title='Deafen' placement='right' arrow>
                                <IconButton
                                    onClick={toggleDeafen}
                                    sx={{ color: 'white' }}
                                >
                                    <HeadsetIcon sx={{ fontSize: '35px' }} />
                                </IconButton>
                            </Tooltip>
                        ) : (
                            <Tooltip title='Undeafen' placement='right' arrow>
                                <IconButton
                                    onClick={toggleDeafen}
                                    sx={{ color: 'white' }}
                                >
                                    <HeadsetOffIcon
                                        sx={{ fontSize: '35px', color: 'red' }}
                                    />
                                </IconButton>
                            </Tooltip>
                        )}
                        <Tooltip title='End Call' placement='right' arrow>
                            <IconButton
                                sx={{ color: 'red' }}
                                onClick={() => {
                                    hmsActions.leave();
                                }}
                            >
                                <CallEndIcon sx={{ fontSize: '35px' }} />
                            </IconButton>
                        </Tooltip>
                    </React.Fragment>
                )}

                <Tooltip title='Share Workspace Link' placement='right' arrow>
                    <IconButton sx={{ color: 'white' }}>
                        <ShareIcon sx={{ fontSize: '35px' }} />
                    </IconButton>
                </Tooltip>
                <Tooltip title='Leave Workspace' placement='right' arrow>
                    <IconButton
                        sx={{ color: 'lightsteelblue' }}
                        onClick={() => {
                            window.location.href = '/chat';
                        }}
                    >
                        <ExitToAppIcon sx={{ fontSize: '35px' }} />
                    </IconButton>
                </Tooltip>
            </Box>
        </Drawer>
    );
}
