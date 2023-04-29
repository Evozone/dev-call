import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { useDispatch, useSelector } from 'react-redux';
import {
    doc,
    updateDoc,
    arrayUnion,
    Timestamp,
    serverTimestamp,
    onSnapshot,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuid } from 'uuid';

import { db, storage } from '../../firebaseConfig';

// User Components
import TextBody from '../main_chat/TextBody';
import MessageInput from '../main_chat/MessageInput';
import OtherUserHeader from '../main_chat/OtherUserHeader';

import {
    notifyAction,
    startLoadingAction,
    stopLoadingAction,
} from '../../actions/actions';

export default function HomeRightSide({ mode, chat }) {
    const inputRef = useRef();
    const dispatch = useDispatch();

    const currentUser = useSelector((state) => state.auth);

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const unSub = onSnapshot(doc(db, 'chats', chat[0]), (doc) => {
            if (doc.data()) {
                {
                    if (chat[0].includes(chat[1].userInfo.uid)) {
                        setMessages(doc.data().messages);
                    }
                }
            }
        });
        return () => {
            unSub();
        };
    }, [chat]);

    const handleSendMessage = async (text, img) => {
        let lastText = text;
        inputRef.current.value = '';
        try {
            if (lastText.length > 0) {
                await updateDoc(doc(db, 'chats', chat[0]), {
                    messages: arrayUnion({
                        id: uuid(),
                        text: lastText,
                        senderid: currentUser.uid,
                        senderUsername: currentUser.username,
                        date: Timestamp.now(),
                    }),
                });
            } else {
                dispatch(notifyAction(true, 'error', 'Please enter a message'));
                return;
            }
            if (img) {
                lastText = '🖼️ Photo';
            }
            await updateDoc(doc(db, 'userChats', currentUser.uid), {
                [chat[0] + '.lastMessage']: {
                    text: lastText,
                },
                [chat[0] + '.date']: serverTimestamp(),
            });
            await updateDoc(doc(db, 'userChats', chat[1].userInfo.uid), {
                [chat[0] + '.lastMessage']: {
                    text: lastText,
                },
                [chat[0] + '.date']: serverTimestamp(),
            });
        } catch (error) {
            dispatch(
                notifyAction(
                    true,
                    'error',
                    'Something went wrong, please try again'
                )
            );
            return;
        }
    };

    const uploadFile = (file, fileName) => {
        const storageRef = ref(
            storage,
            `${currentUser.username + chat[1].userInfo.username}/${fileName}`
        );
        try {
            dispatch(startLoadingAction());
            uploadBytes(storageRef, file).then(async (snapshot) => {
                const url = await getDownloadURL(snapshot.ref);
                await handleSendMessage(url, true);
                dispatch(stopLoadingAction());
            });
        } catch (error) {
            dispatch(
                notifyAction(
                    true,
                    'error',
                    'Something went wrong, please try again'
                )
            );
        }
    };

    const getDate = (seconds) => {
        const offset = new Date().getTimezoneOffset() * 60;
        var t = new Date(1970, 0, 1);
        t.setSeconds(seconds - offset);
        return t.toString().substring(4, 15);
    };

    const INVITE_TEMPLATE = `Hey, I'm using Dev Chat+ for Video Calling
                            and much more. Join me on this room: 
                            ${process.env.REACT_APP_BASE_URL}/meet/${chat[0]}`;

    return (
        <Box
            component='main'
            sx={{
                flexGrow: 1,
                p: 0,
                width: '100%',
                height: '100vh',
                overflow: 'hidden',
                backgroundColor: mode === 'dark' ? '#1a1a1a' : '#f5f5f5',
            }}
        >
            <OtherUserHeader chat={chat} mode={mode} />
            <Box
                sx={{
                    pt: '20px',
                    px: '20px',
                    height: 'calc(100vh - 130px)',
                    overflowY: 'scroll',
                    overflowX: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundImage:
                        mode === 'dark'
                            ? `url('/assets/chat-background-dark.svg')`
                            : `url('/assets/chat-background.svg')`,
                    backgroundSize: '115px',
                }}
            >
                {messages &&
                    messages.map((message, index) => {
                        const msgDate = getDate(message.date.seconds);
                        const nxtMsgDate = getDate(
                            messages[index - 1]?.date.seconds
                        );
                        if (index == 0 || msgDate != nxtMsgDate) {
                            return (
                                <React.Fragment key={message.id}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            marginBottom: '5px',
                                        }}
                                    >
                                        <div
                                            style={{
                                                textAlign: 'center',
                                                color: 'white',
                                                fontSize: '11px',
                                                width: 'fit-content',
                                                padding: '2px 8px',
                                                background: '#898989',
                                                borderRadius: '10px',
                                            }}
                                        >
                                            {msgDate}
                                        </div>
                                    </div>
                                    <TextBody
                                        inputRef={inputRef}
                                        message={message}
                                    />
                                </React.Fragment>
                            );
                        }

                        return (
                            <TextBody
                                inputRef={inputRef}
                                message={message}
                                key={message.id}
                            />
                        );
                    })}
            </Box>
            <Divider />
            <MessageInput
                handleSendMessage={handleSendMessage}
                inputRef={inputRef}
                mode={mode}
                uploadFile={uploadFile}
            />
        </Box>
    );
}
