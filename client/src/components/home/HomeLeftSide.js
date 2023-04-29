// React imports
import React, { useState, useEffect } from 'react';

// Redux imports
import { useDispatch } from 'react-redux';
import { notifyAction } from '../../actions/actions';

// Material UI Components
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

// Firebase imports
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

// Custom components
import TabsNav from '../main_chat/TabsNav';
import UserProfileModal from '../main_chat/UserProfileModal';
import HomeMenu from './HomeMenu';

// Constants
const drawerWidth = 400;


export default function HomeLeftSide({
    themeChange,
    mode,
    currentUser,
    chat,
    setChat,
}) {
    const dispatch = useDispatch();

    const [notificationGranted, setNotificationGranted] = useState(
        Notification.permission === 'granted'
    );

    const [modalOpen, setModalOpen] = useState(false);
    const [senderid, setSenderid] = useState('');


    useEffect(() => {
        const unsub2 = onSnapshot(collection(db, 'chats'), (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === 'modified') {
                    const modifiedData = change.doc.data();
                    const length = modifiedData.messages.length;
                    const newMessage = modifiedData.messages[length - 1];
                    const sid = newMessage.senderid;
                    const senderUsername = newMessage?.senderUsername;
                    if (
                        sid !== currentUser.uid &&
                        chat[1]?.userInfo?.uid !== sid
                    ) {
                        if (notificationGranted) {
                            const audio = new Audio(
                                '/assets/sounds/notification.mp3'
                            );
                            const notification = new Notification('Dev Chat+', {
                                body:
                                    'New message from ' +
                                    (senderUsername ? senderUsername : sid),
                                icon: '/logo192.png',
                                tag: sid,
                            });
                            audio.play();
                            notification.onclick = () => {
                                window.focus();
                            };
                        } else {
                            dispatch(
                                notifyAction(
                                    true,
                                    'info',
                                    'New message from ' +
                                    (senderUsername ? senderUsername : sid)
                                )
                            );
                        }
                        setSenderid(sid);
                    }
                }
            });
        });

        return () => {
            unsub2();
        };
    }, [chat, notificationGranted]);

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    borderRight: 'none',
                    overflow: 'hidden',
                },
            }}
            variant='permanent'
            anchor='left'
        >
            {/* The header with the name of the person. */}
            <Box
                sx={{
                    height: '65px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    pl: 1,
                    backgroundColor: mode === 'light' ? 'primary.main' : 'info.dark',
                    borderRight: '1px solid',
                    borderColor: 'primary.dark',
                }}
            >
                {/* The profile icon and name */}
                <Tooltip title='Update your profile' arrow>
                    <Button
                        sx={{
                            borderRadius: '50px',
                            my: 1,
                            pr: 2,
                            backgroundColor: 'rgba(0, 0, 0, 0.2)',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                            },
                        }}
                        onClick={() => setModalOpen(true)}
                    >
                        <Avatar
                            sx={{
                                width: 40,
                                height: 40,
                            }}
                            alt={currentUser.username.charAt(0).toUpperCase()}
                            src={currentUser.photoURL}
                        />
                        &nbsp;
                        <Typography sx={{ color: 'whitesmoke' }}>
                            {currentUser.username}
                        </Typography>
                    </Button>
                </Tooltip>

                {modalOpen && (
                    <UserProfileModal
                        modalOpen={modalOpen}
                        setModalOpen={setModalOpen}
                        mode={mode}
                    />
                )}

                {/* Box with rounded corners and rgba 0.2 to 0.4 background */}
                <HomeMenu notificationGranted={notificationGranted} setNotificationGranted={setNotificationGranted} themeChange={themeChange} mode={mode} />
            </Box>

            {/* Not the header */}
            <Box
                sx={{
                    height: 'calc(100% - 65px)',
                    ...(mode === 'dark'
                        ? {
                            borderRight:
                                '1px solid rgba(255, 255, 255, 0.12)',
                        }
                        : {
                            borderRight: '1px solid rgba(0, 0, 0, 0.12)',
                        }),
                }}
            >
                <TabsNav
                    {...{ mode, chat, setChat, senderid, setSenderid }}
                />
            </Box>
        </Drawer>
    )
}
