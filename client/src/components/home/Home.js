import React, { useState } from 'react';

// MUI components
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import { useSelector } from 'react-redux';

// Custom components
import HomeRightSide from './HomeRightSide';
import HomeLeftSide from './HomeLeftSide';
import NoChatTemplate from './NoChatTemplate';

// Component
export default function Home({ themeChange, mode }) {

    const currentUser = useSelector((state) => state.auth);
    const [chat, setChat] = useState([]);

    // Layout
    return (
        // Parent Box
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            {/* Left side */}
            <HomeLeftSide themeChange={themeChange} mode={mode} currentUser={currentUser} chat={chat} setChat={setChat} />

            {/* Right side */}
            {chat.length === 0 ? (
                <NoChatTemplate mode={mode} />
            ) : (
                <HomeRightSide chat={chat} mode={mode} />
            )}

        </Box>
    );
}
