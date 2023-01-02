import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';

import CoderOnCall from './CoderOnCall';
import { useWebRTC } from '../useWebRTC';

export default function StartCall({ handleChange }) {
    const currentUser = useSelector((state) => state.auth);
    const { workspaceId } = useParams();

    const { clients, provideRef } = useWebRTC(workspaceId, currentUser);

    const [isMuted, setMuted] = useState(true);

    useEffect(() => {
        console.log('clients', clients);
        // handleMute(isMuted, currentUser.uid);
    }, [currentUser, isMuted, clients]);

    const handleMuteClick = (clientId) => {
        console.log('handleMuteClick', clientId);
        if (clientId !== currentUser.uid) {
            return;
        }
        setMuted((prev) => !prev);
        setTimeout(() => {
            console.log('isMuted state', isMuted);
        }, 2000);
    };

    return (
        <Box
            sx={{
                height: '83vh',
            }}
        >
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
                        ...(clients.length > 18 && {
                            border: '2px solid rgb(0 32 93)',
                            borderRadius: '5px',
                            p: 1,
                        }),
                    }}
                >
                    {clients &&
                        clients.map((client) => (
                            <CoderOnCall
                                key={client.uid}
                                uid={client.uid}
                                username={client.username}
                                handleMuteClick={handleMuteClick}
                                provideRef={provideRef}
                                muted={client.muted}
                            />
                        ))}
                </Box>
                <button
                    onClick={() => {
                        handleChange('', 0);
                    }}
                >
                    end
                </button>
            </Box>
        </Box>
    );
}
