import React, { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import {
    doc,
    setDoc,
    updateDoc,
    arrayUnion,
    Timestamp,
    getDoc,
    onSnapshot,
} from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import MessageInput from '../main_chat/MessageInput';
import TextBody from '../main_chat/TextBody';
import { db, storage } from '../../firebaseConfig';
import {
    notifyAction,
    startLoadingAction,
    stopLoadingAction,
} from '../../actions/actions';

export default function WorkspaceChat({ params, messages, setMessages }) {
    const inputRef = useRef();
    const dispatch = useDispatch();

    const MODE = 'work';

    const currentUser = useSelector((state) => state.auth);

    useEffect(() => {
        const unSub = onSnapshot(
            doc(db, 'workspace', params.workspaceId),
            (doc) => {
                if (doc.data()) {
                    {
                        setMessages(doc.data().messages);
                    }
                }
            }
        );
        return () => {
            unSub();
        };
    }, [params.workspaceId]);

    const handleSendMessage = async (text) => {
        let lastText = text;
        inputRef.current.value = '';
        try {
            if (lastText.length > 0) {
                dispatch(startLoadingAction());
                const chatRef = doc(db, 'workspace', params.workspaceId);
                let docSnap = {};
                if (!messages) {
                    docSnap = await getDoc(chatRef);
                } else {
                    docSnap = { exists: () => true };
                }
                if (docSnap.exists()) {
                    await updateDoc(chatRef, {
                        messages: arrayUnion({
                            id: uuid(),
                            text: lastText,
                            senderid: currentUser.uid,
                            senderUsername: currentUser.username,
                            date: Timestamp.now(),
                        }),
                    });
                } else {
                    await setDoc(chatRef, {
                        messages: arrayUnion({
                            id: uuid(),
                            text: lastText,
                            senderid: currentUser.uid,
                            senderUsername: currentUser.username,
                            date: Timestamp.now(),
                        }),
                    });
                }
            } else {
                dispatch(notifyAction(true, 'error', 'Please enter a message'));
                return;
            }
        } catch (error) {
            dispatch(
                notifyAction(
                    true,
                    'error',
                    'Something went wrong, please try again'
                )
            );
            return;
        } finally {
            dispatch(stopLoadingAction());
        }
    };

    const uploadFile = (file, fileName) => {
        const storageRef = ref(storage, `${params.workspaceId}/${fileName}`);
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

    return (
        <Box
            sx={{
                height: '83vh',
            }}
        >
            <Box
                sx={{
                    height: 'calc(100vh - 20px)',
                    maxHeight: 'calc(100vh - 188px)',
                    overflowY: 'auto',
                    backgroundColor: '#101010',
                    backgroundImage: `url('/assets/chat-background-dark.svg')`,
                    backgroundSize: '115px',
                    display: 'flex',
                    flexDirection: 'column',
                    p: 1,
                }}
            >
                {messages &&
                    messages.map((message) => (
                        <TextBody
                            inputRef={inputRef}
                            message={message}
                            key={message.id}
                            sendername={true}
                        />
                    ))}
            </Box>
            <Box
                sx={{
                    position: 'absolute',
                    bottom: '0',
                    left: '0',
                    width: '100%',
                    color: 'black',
                }}
            >
                <MessageInput
                    handleSendMessage={handleSendMessage}
                    inputRef={inputRef}
                    mode={MODE}
                    uploadFile={uploadFile}
                />
            </Box>
        </Box>
    );
}
