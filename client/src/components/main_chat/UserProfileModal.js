import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// MUI components
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import { useDispatch } from 'react-redux';

// MUI icons
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

import CloseIcon from '@mui/icons-material/Close';

// Firebase
import { db } from '../../firebaseConfig';
import { doc, setDoc, updateDoc, getDoc } from 'firebase/firestore';

// Actions
import {
    notifyAction,
    startLoadingAction,
    stopLoadingAction,
} from '../../actions/actions';

export default function UserProfileModal({
    modalOpen,
    setModalOpen,
    mode,
}) {
    const dispatch = useDispatch();

    const currentUser = useSelector((state) => state.auth);

    const [buttonStatus, setButtonStatus] = useState(true);

    // Object to get changes of user profile
    const [userProfile, setUserProfile] = useState({
        name: '',
        githubLink: '',
        linkedinLink: '',
        twitterLink: '',
        bio: '',
    });

    useEffect(() => {
        const getUserProfile = async () => {
            dispatch(startLoadingAction());
            const docRef = doc(db, 'users', currentUser.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setUserProfile({
                    name: docSnap.data().name,
                    githubLink: docSnap.data().githubLink,
                    linkedinLink: docSnap.data().linkedinLink,
                    twitterLink: docSnap.data().twitterLink,
                    bio: docSnap.data().bio,
                });
            }
            dispatch(stopLoadingAction());
        };
        getUserProfile();
    }, []);

    // array to store form inputs to map over
    const formInputs = [
        {
            name: 'githubLink',
            label: 'GitHub',
            value: userProfile.githubLink,
            icon: <GitHubIcon />,
        },
        {
            name: 'linkedinLink',
            label: 'LinkedIn',
            value: userProfile.linkedinLink,
            icon: <LinkedInIcon />,
        },
        {
            name: 'twitterLink',
            label: 'Twitter',
            value: userProfile.twitterLink,
            icon: <TwitterIcon />,
        },
    ];

    // Function to save changes to firebase and redux store
    const saveChanges = async () => {
        dispatch(startLoadingAction());
        try {
            await updateDoc(doc(db, 'users', currentUser.uid), {
                name: userProfile.name,
                githubLink: userProfile.githubLink,
                linkedinLink: userProfile.linkedinLink,
                twitterLink: userProfile.twitterLink,
                bio: userProfile.bio,
            });
            dispatch(
                notifyAction(
                    true,
                    'success',
                    'Your profile has been updated successfully.'
                )
            );
        } catch (error) {
            dispatch(
                notifyAction(
                    true,
                    'error',
                    'Something went wrong! please try again later.'
                )
            );
            console.log(error);
        }
        dispatch(stopLoadingAction());
        setModalOpen(false);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserProfile({ ...userProfile, [name]: value });
    };

    useEffect(() => {
        // Enable button if all fields are filled
        if (userProfile.name !== '' && userProfile.bio !== '') {
            setButtonStatus(false);
        } else {
            setButtonStatus(true);
        }
    }, [userProfile]);

    return (
        <Modal open={modalOpen}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',

                    minWidth: '80vw',
                    height: 'auto',

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
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                    }}
                >
                    <Typography variant='h4'>Your Profile</Typography>
                    <IconButton onClick={() => setModalOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                {/* Content */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        width: '100%',
                        py: 4,
                    }}
                >
                    {/* Permanent things */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar
                            alt={currentUser.name.charAt(0).toUpperCase()}
                            src={currentUser.photoURL}
                            sx={{
                                width: 100,
                                height: 100,
                                mb: 1,
                                backgroundColor:
                                    mode === 'light' ? 'lightgrey' : '#1a1a1a',
                                border:
                                    mode === 'light'
                                        ? `2px solid black`
                                        : `2px solid white`,
                            }}
                        >
                            {currentUser.name.charAt(0).toUpperCase()}
                        </Avatar>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                flexDirection: 'column',
                            }}
                        >
                            <Typography
                                variant='h6'
                                sx={{
                                    mt: 2,
                                    color: mode === 'light' ? '#000' : '#fff',
                                    font: '500 1.2rem Work Sans, sans-serif',
                                }}
                            >
                                {currentUser.username}
                            </Typography>
                        </Box>
                    </Box>

                    <Divider
                        orientation='vertical'
                        flexItem
                        sx={{
                            backgroundColor: mode === 'light' ? '#000' : '#fff',
                            mx: 4,
                        }}
                    />

                    {/* Editable things */}
                    <Stack
                        spacing={2}
                        sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            label='Name'
                            variant='outlined'
                            name='name'
                            value={userProfile.name}
                            onChange={handleInputChange}
                            sx={{
                                width: '100%',
                                backgroundColor:
                                    mode === 'light' ? '#fff' : '#1a1a1a',
                            }}
                        />
                        <TextField
                            label='Bio'
                            variant='outlined'
                            name='bio'
                            multiline
                            maxRows={4}
                            value={userProfile.bio}
                            onChange={handleInputChange}
                            sx={{
                                width: '100%',
                                backgroundColor:
                                    mode === 'light' ? '#fff' : '#1a1a1a',
                            }}
                        />
                        <Stack
                            spacing={2}
                            sx={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            {formInputs.map((input) => (
                                <TextField
                                    key={input.name}
                                    label={input.label}
                                    variant='outlined'
                                    name={input.name}
                                    value={userProfile[input.name]}
                                    onChange={handleInputChange}
                                    sx={{
                                        width: '100%',
                                        backgroundColor:
                                            mode === 'light'
                                                ? '#fff'
                                                : '#1a1a1a',
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position='start'>
                                                {input.icon}
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            ))}
                        </Stack>
                    </Stack>
                </Box>

                <Button
                    color='success'
                    sx={{
                        backgroundColor:
                            mode === 'light' ? 'primary.main' : 'primary.dark',
                    }}
                    variant='contained'
                    disabled={buttonStatus}
                    onClick={saveChanges}
                >
                    Save
                </Button>
            </Box>
        </Modal>
    );
}
