import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
    useHMSActions,
    useHMSStore,
    selectIsConnectedToRoom,
    selectPeers,
} from '@100mslive/hms-video-react';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';

import CoderOnCall from './CoderOnCall';
import { Typography } from '@mui/material';

export default function StartCall() {
    const currentUser = useSelector((state) => state.auth);
    const hmsActions = useHMSActions();
    const { workspaceId } = useParams();

    const [roomId, setRoomId] = useState('');
    const isConnected = useHMSStore(selectIsConnectedToRoom);
    const peers = useHMSStore(selectPeers);

    useEffect(() => {
        const getManagementToken = async () => {
            var managementToken = '';
            await fetch('http://192.168.0.109:5000/mtoken', {
                method: 'GET',
            })
                .then((res) => res.json())
                .then((data) => {
                    managementToken = data.data.token;
                });
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${managementToken}`,
                },
                body: JSON.stringify({
                    name: `new-room-${workspaceId}`,
                    description: 'This is a sample description for the room',
                    template_id: '63b72b6a447a48e7edc226bf',
                    region: 'us',
                }),
            };
            await fetch('https://api.100ms.live/v2/rooms', requestOptions)
                .then((response) => response.json())
                .then((data) => setRoomId(data.id));
        };
        getManagementToken();
    }, []);

    const getToken = async () => {
        var role = '';
        workspaceId.includes(currentUser.uid)
            ? (role = 'moderator')
            : (role = 'participant');
        const response = await fetch(
            `${process.env.REACT_APP_100MS_TOKEN_ENDPOINT}api/token`,
            {
                method: 'POST',
                body: JSON.stringify({
                    user_id: currentUser.uid,
                    role,
                    room_id: roomId,
                }),
            }
        );
        const { token } = await response.json();
        return token;
    };

    const joinCall = () => {
        getToken()
            .then((token) => {
                hmsActions.join({
                    userName: currentUser.username || 'Anonymous',
                    authToken: token,
                    settings: {
                        isAudioMuted: true,
                    },
                    initEndpoint:
                        process.env.REACT_APP_100MS_TOKEN_ENDPOINT || undefined,
                });
            })
            .catch((error) => {
                console.log('Token API Error', error);
            });
    };

    return (
        <Box
            sx={{
                display: 'flex',
                height: '83vh',
            }}
        >
            {isConnected ? (
                <Box sx={{ m: 1, height: '80vh' }}>
                    <h2 style={{ marginTop: '3px' }}>Dev&apos;s On Call</h2>
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '16px 8px',
                            gridAutoFlow: 'dense',
                            maxHeight: '85%',
                            overflowY: 'auto',
                            ...(peers.length > 18 && {
                                border: '2px solid rgb(0 32 93)',
                                borderRadius: '5px',
                                p: 1,
                            }),
                        }}
                    >
                        {peers &&
                            peers.map((peer) => (
                                <CoderOnCall key={peer.id} peer={peer} />
                            ))}
                    </Box>
                </Box>
            ) : (
                <Box
                    sx={{
                        flexGrow: 1,
                        backgroundColor: 'rgb(0 32 93)',
                        m: 1,
                        borderRadius: '5px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {/* Circular button with PhoneInTalk icon */}
                    <IconButton
                        color="primary"
                        aria-label="join call"
                        onClick={joinCall}
                        sx={{
                            bgcolor: 'white',
                            width: '70px',
                            height: '70px',
                            borderRadius: '50%',
                            border: '2px solid rgb(0 32 93)',
                            '&:hover': {
                                bgcolor: 'white',
                                color: 'rgb(0 32 93)',
                                boxShadow: '0 0 10px 2px rgba(0,0,0,0.5)',
                            }
                        }}
                    >
                        <PhoneInTalkIcon sx={{ fontSize: '35px' }} />
                    </IconButton>
                    <Typography
                        variant="h6"
                        sx={{
                            color: 'white',
                            opacity: '0.8',
                            mt: 2,
                            fontFamily: 'Work Sans',
                        }}
                    >
                        Join Voice room
                    </Typography>
                </Box>
            )
            }
        </Box >
    );
}
