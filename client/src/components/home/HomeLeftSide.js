import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';

import { collection, onSnapshot } from 'firebase/firestore';
import { notifyAction } from '../../actions/actions';

import { db } from '../../firebaseConfig';

import TabsNav from '../main_chat/TabsNav';
import UserProfileModal from '../main_chat/UserProfileModal';
import HomeMenu from './HomeMenu';

const drawerWidth = 470;

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
    const [supportsPWA, setSupportsPWA] = useState(false);
    const [promptInstall, setPromptInstall] = useState(null);

    useEffect(() => {
        const handler = (e) => {
            e.preventDefault();
            setSupportsPWA(true);
            setPromptInstall(e);
        };
        window.addEventListener('beforeinstallprompt', handler);
    }, []);

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
                    height: '75px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    pl: 1,
                    backgroundColor:
                        mode === 'light' ? 'primary.main' : 'info.dark',
                    borderRight: '1px solid',
                    borderColor: 'primary.dark',
                }}
            >
                {/* The profile icon and name */}
                <IconButton
                    sx={{ borderRadius: '0' }}
                    onClick={() => setModalOpen(true)}
                >
                    <Avatar
                        sx={{
                            width: 50,
                            height: 50,
                            mr: 2,
                        }}
                        alt={currentUser.username.charAt(0).toUpperCase()}
                        src={currentUser.photoURL}
                    />
                    <Typography sx={{ color: 'whitesmoke' }} variant='h5'>
                        {currentUser.username}
                    </Typography>
                </IconButton>

                {modalOpen && (
                    <UserProfileModal
                        modalOpen={modalOpen}
                        setModalOpen={setModalOpen}
                        mode={mode}
                    />
                )}

                {/* The menu icon */}
                <HomeMenu
                    notificationGranted={notificationGranted}
                    setNotificationGranted={setNotificationGranted}
                    themeChange={themeChange}
                    mode={mode}
                    supportsPWA={supportsPWA}
                    promptInstall={promptInstall}
                />
            </Box>

            {/* Not the header */}
            <Box
                sx={{
                    height: 'calc(100% - 75px)',
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
                <TabsNav {...{ mode, chat, setChat, senderid, setSenderid }} />
            </Box>
        </Drawer>
    );
}
