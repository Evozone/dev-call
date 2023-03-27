import React, { useState, useEffect } from 'react';

// MUI components
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { useDispatch } from 'react-redux';

// MUI icons
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import CloseIcon from '@mui/icons-material/Close'

// Components
import { InfoSection, FollowSection } from './ModalSections';
import GithubStats from './GithubStats';

// Firebase
import { db } from '../../../firebaseConfig';
import { doc, setDoc, updateDoc, getDoc } from 'firebase/firestore';

// Actions
import {
    notifyAction,
    startLoadingAction,
    stopLoadingAction,
} from '../../../actions/actions';

export default function OtherUserModal({
    modalOpen,
    setModalOpen,
    mode,
    otherUser
}) {
    const dispatch = useDispatch();

    const [user, setUser] = useState({
        name: '',
        email: '',
        bio: '',
        github: '',
        linkedin: '',
        twitter: '',
        avatar: '',
    });

    const handleClose = () => {
        setModalOpen(false);
    };

    useEffect(() => {
        const getUser = async () => {
            dispatch(startLoadingAction());
            try {
                const docRef = doc(db, 'users', otherUser.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setUser({
                        name: docSnap.data().name,
                        githubLink: docSnap.data().githubLink,
                        linkedinLink: docSnap.data().linkedinLink,
                        twitterLink: docSnap.data().twitterLink,
                        bio: docSnap.data().bio,
                        avatar: docSnap.data().photoURL,
                        email: docSnap.data().email,
                    });
                } else {
                    dispatch(
                        notifyAction({
                            type: 'error',
                            message: 'User does not exist',
                        })
                    );
                }
            } catch (error) {
                dispatch(
                    notifyAction({
                        type: 'error',
                        message: error.message,
                    })
                );
            }
            dispatch(stopLoadingAction());
        };

        getUser();
    }, [otherUser]);

    const userLinks = [
        { name: 'Github', link: user.githubLink, icon: <GitHubIcon /> },
        { name: 'LinkedIn', link: user.linkedinLink, icon: <LinkedInIcon /> },
        { name: 'Twitter', link: user.twitterLink, icon: <TwitterIcon /> },
    ];

    return (
        <Modal
            open={modalOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    minWidth: '60vw',
                    minHeight: '60vh',

                    backgroundColor:
                        mode === 'light' ? 'whitesmoke' : '#1a1a1a',
                    boxShadow: 24,
                    borderRadius: 3,
                    p: 4,

                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {/* Name and Close button */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                    }}
                >
                    <Typography
                        id="modal-modal-title"
                        variant="h4"
                        component="h2"
                        sx={{
                            color: mode === 'light' ? 'black' : 'whitesmoke',
                        }}
                    >
                        <b>{user.name}</b>
                    </Typography>
                    <IconButton onClick={() => setModalOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                {/* Content */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        width: '100%',
                        my: 2,
                    }}
                >
                    <Avatar
                        src={user.avatar}
                        alt={user.name}
                        sx={{
                            width: '10rem',
                            height: '10rem',
                            border: `2px solid black`,
                        }}
                    />
                    <Divider orientation="vertical" flexItem sx={{
                        backgroundColor: mode === 'light' ? '#000' : '#fff',
                        mx: 3,
                    }} />
                    <Stack
                        direction="column"
                        spacing={1}
                        sx={{
                            width: '100%',
                            mt: 2,
                        }}
                    >
                        <InfoSection label="Bio" content={user.bio} mode={mode} />
                        <InfoSection label="Email" content={user.email} mode={mode} />
                        <FollowSection links={userLinks} mode={mode} />
                    </Stack>
                </Box>

                {/* Github Stats */}
                <GithubStats mode={mode} userGithub={user.githubLink} />

            </Box>
        </Modal>
    )
}
